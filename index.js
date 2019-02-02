document.body.style.fontFamily = 'monospace'

let {
  GRID,
  TIMER,
  currentBeat,
  NEUTRAL_COLOR,
  ACTIVE_COLOR,
  PLAYHEAD_COLOR,
  BUTTON_SIZE,
  PLAYING_ACTIVE_COLOR,
  PARAMS,
  sounds
} = require('./globals.js')

const {
  getMs,
  play,
  mp3ToBuffer,
  toggleGridItem,
  toCapital
} = require('./util')

const {
  setFilterFrequency,
  setFilterResonance,
} = require('./effects')


let isMouseDown = false
document.body.addEventListener('mousedown', () => {
  isMouseDown = true
})
document.body.addEventListener('mouseup', () => {
  isMouseDown = false
})

const buildGrid = () => {
  const $grid = document.getElementById('grid')
  sounds.forEach(async sound => {
    const $track = document.createElement('div')
    const $label = document.createElement('div')
    $label.style = 'display: inline-block; min-width: 80px'
    $label.innerText = sound.split('-')[0]
    $grid.appendChild($track)
    $track.appendChild($label)
    const buffer = await mp3ToBuffer(`sounds/${sound}.wav`)
    GRID[sound] = []

    for (let beat = 0; beat < PARAMS.CYCLE_LENGTH.value; beat++) {
      const $button = document.createElement('div')
      $button.style = `display: inline-block; height: ${BUTTON_SIZE}px; width: ${BUTTON_SIZE}px; background-color: ${NEUTRAL_COLOR}; margin: 0px 2px; cursor: pointer;`
      if (beat % 4 === 0) $button.style.marginLeft = '10px'
      $track.appendChild($button)
      GRID[sound][beat] = { 
        active: false,
        buffer,
        button: $button
      }
      const onDown = () => {
        toggleGridItem(sound, beat)
        play(GRID[sound][beat].buffer)
      }
      const onDrag = () => {
        if (!isMouseDown) return
        toggleGridItem(sound, beat)
        play(GRID[sound][beat].buffer)
      }
      $button.addEventListener('mousedown', onDown)
      $button.addEventListener('mouseover', onDrag)
    }
  })
}

buildGrid()

const updateView = () => {
  requestAnimationFrame(() => {
    sounds.forEach(sound => {
      const CURRENT_GRID_ITEM = GRID[sound][currentBeat]
      if (!CURRENT_GRID_ITEM) return

      // Set active color on the current playhead
      if (CURRENT_GRID_ITEM.active) CURRENT_GRID_ITEM.button.style.backgroundColor = PLAYING_ACTIVE_COLOR
      else CURRENT_GRID_ITEM.button.style.backgroundColor = PLAYHEAD_COLOR

      // Set up cycling
      const LAST_GRID_ITEM = GRID[sound][(PARAMS.CYCLE_LENGTH.value + currentBeat - 1) % PARAMS.CYCLE_LENGTH.value]
      if (LAST_GRID_ITEM.active) LAST_GRID_ITEM.button.style.backgroundColor = ACTIVE_COLOR
      else LAST_GRID_ITEM.button.style.backgroundColor = NEUTRAL_COLOR
    })
  })
}

const randomize = () => {
  for (let beat = 0; beat < PARAMS.CYCLE_LENGTH.value; beat++){
    for (let track = 0; track < sounds.length; track++) {

      if (Math.random() * 100 > PARAMS.PERCENT_SILENCE.value) {
        const drum = Math.floor(Math.random() * sounds.length )
        toggleGridItem(sounds[drum], beat)
      }
    }
  }
}

const startPlayback = () => {
  // Cache the open hat so we can mute it later
  const openHatSound = Object.keys(GRID).find(sound => sound.includes('openhat'))
  const closedHatSound = Object.keys(GRID).find(sound => sound.includes('hihat'))
  
  isPlaying = true
  function loop(){
    currentBeat = (PARAMS.CYCLE_LENGTH.value + currentBeat + 1) % PARAMS.CYCLE_LENGTH.value
    Object.keys(GRID).forEach(sound => {
      const track = GRID[sound]
      const beat = track[currentBeat]
      if (beat.active) {
        setTimeout(() => {
          let src = play(beat.buffer)
          beat.src = src
          // Mute openhats. Todo: make cleaner
          if (sound === closedHatSound) {
            GRID[openHatSound]
            .forEach(item => {
              if (item.src) item.src.stop()
            })
          }
        }, Math.random() * PARAMS.HUMANIZE.value)
      }
    })

    updateView()
    let int = getMs(PARAMS.BPM.value) / PARAMS.BPM_MULT.value
    let SWING_DIFF = int * (PARAMS.SWING.value / 100)
    if (PARAMS.SWING.value) {
      if (currentBeat % 2 === 0) int = int + SWING_DIFF
      else int = int - SWING_DIFF
    }
    TIMER = setTimeout(loop, int)
  }
  loop()
}

const clear = () => {
  Object.keys(GRID).forEach(sound => {
    const track = GRID[sound]
    track.forEach((beat, index) => {
      if (beat.active) toggleGridItem(sound, index)
    })
  })
}

const pause = () => {
  isPlaying = false
  clearInterval(TIMER)
}

const $grid = document.getElementById('grid')
const updateGridSize = (value) => {
  const [...$rows] = $grid.children
  $rows.forEach($row => {
    [...$row.children].forEach(($button, index) => {
      if (index > value) {
        $button.style.opacity = '0.5'
        // todo: make sure background color is turned off
      }
      else {
        $button.style.opacity = '1'
      }
    })
  })
}


Object.keys(PARAMS).forEach(param => {
  const label = `<strong>${toCapital(param)}</strong>`
  const $params = document.getElementById('params')
  const $slider = document.createElement('input')
  $slider.type = "range"
  $slider.min = PARAMS[param].min
  $slider.max = PARAMS[param].max
  $slider.value = PARAMS[param].value
  const $label = document.createElement('div')
  $label.innerHTML = label + ': ' + PARAMS[param].value
  $params.appendChild($label)
  $params.appendChild($slider)
  $slider.addEventListener('input', event => {
    let value = Number(event.target.value)
    PARAMS[param].value = value
    $label.innerHTML = label + ': ' + PARAMS[param].value
    if (param === 'PERCENT_SILENCE') {
      clear()
      randomize()
    }
    if (param === 'FILTER_FREQUENCY') {
      setFilterFrequency(value)
    }
    if (param === 'FILTER_RESONANCE') {
      setFilterResonance(value)
    }
    if (param === 'CYCLE_LENGTH') {
      updateGridSize(value)
    }
  })
})


document.getElementById('play').addEventListener('click', (e) => {
  startPlayback()
  e.target.disabled = true
  document.getElementById('pause').disabled = false
})

document.getElementById('clear').addEventListener('click', () => {
  clear()
})

document.getElementById('randomize').addEventListener('click',() => {
  clear()
  randomize()
})

document.getElementById('pause').addEventListener('click',(e) => {
  pause()
  e.target.disabled = true
  document.getElementById('play').disabled = false
})
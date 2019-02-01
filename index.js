document.body.style.fontFamily = 'monospace'

let {
  GRID,
  TIMER,
  currentBeat,
  NEUTRAL_COLOR,
  ACTIVE_COLOR,
  PLAYHEAD_COLOR,
  PLAYING_ACTIVE_COLOR,
  PARAMS,
  sounds
} = require('./globals.js')

const {
  getMs,
  play,
  mp3ToBuffer,
  toggleGridItem
} = require('./util')


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
    const buffer = await mp3ToBuffer(`sounds/${sound}.wav`)
    const $track = document.createElement('div')
    const $label = document.createElement('div')
    $label.style = 'display: inline-block; min-width: 80px'
    $label.innerText = sound.split('-')[0]
    $grid.appendChild($track)
    $track.appendChild($label)
    GRID[sound] = []

    for (let beat = 0; beat < PARAMS.CYCLE_LENGTH.value; beat++) {
      const $button = document.createElement('div')
      $button.style = `display: inline-block; height: 20px; width: 20px; background-color: ${NEUTRAL_COLOR}; margin: 0px 2px;`
      if (beat % 4 === 0) $button.style.marginLeft = '10px'
      $track.appendChild($button)
      GRID[sound][beat] = { 
        active: false,
        buffer,
        button: $button
      }
      $button.addEventListener('mousedown', () => {
        toggleGridItem(sound, beat)
        play(GRID[sound][beat].buffer)
      })
      $button.addEventListener('mouseover', () => {
        if (!isMouseDown) return
        toggleGridItem(sound, beat)
        play(GRID[sound][beat].buffer)
      })
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
  function loop(){
    currentBeat = (PARAMS.CYCLE_LENGTH.value + currentBeat + 1) % PARAMS.CYCLE_LENGTH.value
    Object.keys(GRID).forEach(sound => {
      const track = GRID[sound]
      const beat = track[currentBeat]
      if (beat.active) {
        play(beat.buffer)
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
  clearInterval(TIMER)
}


Object.keys(PARAMS).forEach(param => {
  const $params = document.getElementById('params')
  const $slider = document.createElement('input')
  $slider.type = "range"
  $slider.min = PARAMS[param].min
  $slider.max = PARAMS[param].max
  $slider.value = PARAMS[param].value
  const $label = document.createElement('div')
  $label.innerText = param + ': ' + PARAMS[param].value
  $params.appendChild($label)
  $params.appendChild($slider)
  $slider.addEventListener('input', event => {
    let value = Number(event.target.value)
    PARAMS[param].value = value
    $label.innerText = param + ': ' + PARAMS[param].value
    if (param === 'PERCENT_SILENCE') {
      clear()
      randomize()
    }
  })
})


document.getElementById('play').addEventListener('click', () => {
  startPlayback()
})

document.getElementById('clear').addEventListener('click', () => {
  clear()
})

document.getElementById('randomize').addEventListener('click',() => {
  clear()
  randomize()
})

document.getElementById('pause').addEventListener('click',() => {
  pause()
})
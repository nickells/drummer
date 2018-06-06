document.body.style.fontFamily = 'monospace'

let {
  GRID,
  TIMER,
  currentBeat,
  NEUTRAL_COLOR,
  ACTIVE_COLOR,
  PLAYHEAD_COLOR,
  PLAYING_ACTIVE_COLOR,
  TRACKS,
  PARAMS,
  sounds
} = require('./globals.js')

const {
  getMs,
  toggleGridItem
} = require('./util')

const audio = sounds.map(filename => new Audio(`sounds/${filename}.wav`))

let isMouseDown = false
document.body.addEventListener('mousedown', () => {
  isMouseDown = true
})
document.body.addEventListener('mouseup', () => {
  isMouseDown = false
})

const buildGrid = () => {
  const $grid = document.getElementById('grid')
  sounds.forEach(sound => {
    const $track = document.createElement('div')
    const $label = document.createElement('div')
    $label.style = 'display: inline-block; min-width: 150px'
    $label.innerText = sound
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
        file: undefined,
        button: $button
      }
      $button.addEventListener('mousedown', () => {
        toggleGridItem(sound, beat)
        if (GRID[sound][beat].file) GRID[sound][beat].file.play()
      })
      $button.addEventListener('mouseover', () => {
        if (!isMouseDown) return
        toggleGridItem(sound, beat)
        if (GRID[sound][beat].file) GRID[sound][beat].file.play()
      })
    }
  })
}

buildGrid()

const updateView = () => {
  sounds.forEach(sound => {
    const CURRENT_GRID_ITEM = GRID[sound][currentBeat]
    if (!CURRENT_GRID_ITEM) return
    if (CURRENT_GRID_ITEM.active) CURRENT_GRID_ITEM.button.style.backgroundColor = PLAYING_ACTIVE_COLOR
    else CURRENT_GRID_ITEM.button.style.backgroundColor = PLAYHEAD_COLOR

    const LAST_GRID_ITEM = GRID[sound][(PARAMS.CYCLE_LENGTH.value + currentBeat - 1) % PARAMS.CYCLE_LENGTH.value]
    if (LAST_GRID_ITEM.active) LAST_GRID_ITEM.button.style.backgroundColor = ACTIVE_COLOR
    else LAST_GRID_ITEM.button.style.backgroundColor = NEUTRAL_COLOR
  })
}

const randomize = async () => {
  for (let beat = 0; beat < PARAMS.CYCLE_LENGTH.value; beat++){
    for (let track = 0; track < TRACKS; track++) {
      if (Math.random() * 100 > PARAMS.PERCENT_SILENCE.value) {
        const drum = Math.floor(Math.random() * sounds.length )
        toggleGridItem(sounds[drum], beat)
      }
    }
  }
}

const play = () => {
  function loop(){
    currentBeat = (PARAMS.CYCLE_LENGTH.value + currentBeat + 1) % PARAMS.CYCLE_LENGTH.value
    Object.values(GRID).forEach(track => {
      const beat = track[currentBeat]
      if (beat.active) beat.file.play()
    })

    updateView()
    let int = getMs(PARAMS.BPM.value) / PARAMS.BPM_MULT.value
    let SWING_RATIO = 1 + (PARAMS.SWING.value / 100)
    if (PARAMS.SWING.value) {
      if (currentBeat % 2 === 0) int = int * SWING_RATIO
      else int = int / SWING_RATIO
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

  updateView()
}

const pause = () => {
  clearInterval(TIMER)
}

const onChangeParameter = (event) => {

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
  if (param === 'CYCLE_LENGTH') $slider.disabled = 'true'
  $slider.addEventListener('change', event => {
    let value = Number(event.target.value)
    if (param === 'PERCENT_SILENCE') {
      clear()
      randomize()
      updateView()
    }
    if (param === 'CYCLE_LENGTH') {
      value = value - 1
      if (value < PARAMS.CYCLE_LENGTH.value) {
        Object.keys(GRID).forEach(sound => {
          const track = GRID[sound]
          track.forEach((beat, index) => {
            if (index < value) return
            else if (beat.active) toggleGridItem(sound, index)
          })
        })
      }
    }
    PARAMS[param].value = value
    $label.innerText = param + ': ' + PARAMS[param].value
  })
})


document.getElementById('play').addEventListener('click', () => {
  play()
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
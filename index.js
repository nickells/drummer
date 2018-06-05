const sounds = [
  'clap-808',
  'hihat-808',
  'cowbell-808',
  'kick-808',
  'openhat-808',
  'perc-808',
  'snare-808',
  'tom-808'
]

const audio = sounds.map(filename => new Audio(`sounds/${filename}.wav`))

const getMs = (bpm) => {
  const intervalSeconds = 60 / bpm
  return intervalSeconds * 1000
}

let TRACKS = sounds.length
// let PERCENT_SILENCE = 80
// let BPM = 120
// let MULT = 4
// let SWING = 20

const PARAMS = {
  CYCLE_LENGTH: {
    min: 4,
    max: 32,
    value: 16,
  },
  PERCENT_SILENCE: {
    min: 0,
    max: 100,
    value: 75,
  },
  BPM: {
    min: 20,
    max: 240,
    value: 120,
  },
  MULT: {
    min: 0,
    max: 8,
    value: 4,
  },
  SWING: {
    min: 0,
    max: 100,
    value: 20,
  },
}

const NEUTRAL_COLOR = 'grey'
const ACTIVE_COLOR = 'blue'
const PLAYHEAD_COLOR = 'red'
const PLAYING_ACTIVE_COLOR = 'black'


let TIMER
let CURRENT_BEAT = -1

const GRID = {}

const buildGrid = () => {
  sounds.forEach(sound => {
    const $track = document.createElement('div')
    const $label = document.createElement('div')
    $label.style = 'display: inline-block; min-width: 100px'
    $label.innerText = sound
    document.body.appendChild($track)
    $track.appendChild($label)
    GRID[sound] = []

    for (let beat = 0; beat < PARAMS.CYCLE_LENGTH.value; beat++) {
      const $button = document.createElement('div')
      $button.style = `display: inline-block; height: 20px; width: 20px; background-color: ${NEUTRAL_COLOR}; margin: 0px 2px;`
      $track.appendChild($button)
      GRID[sound][beat] = { 
        active: false,
        button: $button
      }
    }
  })
}

buildGrid()

const updateView = () => {
  sounds.forEach(sound => {
    const CURRENT_GRID_ITEM = GRID[sound][CURRENT_BEAT]
    if (!CURRENT_GRID_ITEM) return
    if (CURRENT_GRID_ITEM.active) CURRENT_GRID_ITEM.button.style.backgroundColor = PLAYING_ACTIVE_COLOR
    else CURRENT_GRID_ITEM.button.style.backgroundColor = PLAYHEAD_COLOR

    const LAST_GRID_ITEM = GRID[sound][(PARAMS.CYCLE_LENGTH.value + CURRENT_BEAT - 1) % PARAMS.CYCLE_LENGTH.value]
    if (LAST_GRID_ITEM.active) LAST_GRID_ITEM.button.style.backgroundColor = ACTIVE_COLOR
    else LAST_GRID_ITEM.button.style.backgroundColor = NEUTRAL_COLOR
  })
}

const randomize = async () => {
  const CYCLES = []

  for (let beat = 0; beat < PARAMS.CYCLE_LENGTH.value; beat++){
    CYCLES[beat] = []
    for (let track = 0; track < TRACKS; track++) {
      if (Math.random() * 100 > PARAMS.PERCENT_SILENCE.value) {
        const drum = Math.floor(Math.random() * sounds.length )
        const file = new Audio(`sounds/${sounds[drum]}.wav`)
        CYCLES[beat].push(file)

        GRID[sounds[drum]][beat].active = true
        GRID[sounds[drum]][beat].button.style.backgroundColor = 'blue'
      }
      else CYCLES[beat].push(undefined)
    }
  }
  
  function loop(){
    CURRENT_BEAT = (PARAMS.CYCLE_LENGTH.value + CURRENT_BEAT + 1) % PARAMS.CYCLE_LENGTH.value
    CYCLES[CURRENT_BEAT].forEach(sound => {
      if (sound) sound.play()
    })
    updateView()
    let int = getMs(PARAMS.BPM.value) / PARAMS.MULT.value
    let SWING_RATIO = 1 + (PARAMS.SWING.value / 100)
    if (PARAMS.SWING.value) {
      if (CURRENT_BEAT % 2 === 0) int = int * SWING_RATIO
      else int = int / SWING_RATIO
    }
    TIMER = setTimeout(loop, int)
  }
  loop()
}

const reset = () => {
  sounds.forEach(sound => {
    for (let beat = 0; beat < PARAMS.CYCLE_LENGTH.value; beat++) {
      
      if (GRID[sound][beat]) GRID[sound][beat].active = false
    }
  })
  for (let i = 0; i < PARAMS.CYCLE_LENGTH.value; i++) {
    CURRENT_BEAT = i
    updateView()
  }
  CURRENT_BEAT = -1
  updateView()
  clearInterval(TIMER)
}

const stop = () => {
  reset()
  clearInterval(TIMER)
}

Object.keys(PARAMS).forEach(param => {
  const $slider = document.createElement('input')
  $slider.type = "range"
  $slider.min = PARAMS[param].min
  $slider.max = PARAMS[param].max
  $slider.value = PARAMS[param].value
  const $label = document.createElement('p')
  $label.innerText = param + ': ' + PARAMS[param].value
  document.body.appendChild($label)
  document.body.appendChild($slider)
  if (param === 'CYCLE_LENGTH') $slider.disabled = 'true'
  $slider.addEventListener('change', event => {
    PARAMS[param].value = event.target.value
    $label.innerText = param + ': ' + PARAMS[param].value
    if (param === 'PERCENT_SILENCE') {
      stop()
      reset()
      randomize()
      updateView()
    }
  })
})

document.getElementById('randomize').addEventListener('click',() => {
  reset()
  randomize()
  updateView()
})

document.getElementById('stop').addEventListener('click',() => {
  stop()
})
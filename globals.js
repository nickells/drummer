const sounds_electronic = [
  'kick-808',
  'snare-808',
  'clap-808',
  'hihat-808',
  'openhat-808',
  'tom-808',
  'perc-808',
  // 'perc-hollow',
  'cowbell-808',
]

const sounds_acoustic = [
  'kick-acoustic02',
  'snare-acoustic02',
  'crash-acoustic',
  'hihat-acoustic02',
  'openhat-acoustic01',
  'tom-acoustic02',
  // 'perc-tambo',
  // "shaker-shuffle",
]

const sounds = window.location.search.includes('electronic') ? sounds_electronic : sounds_acoustic


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
  BPM_MULT: {
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
const PLAYHEAD_COLOR = 'darkgrey'
const PLAYING_ACTIVE_COLOR = 'darkblue'


let TIMER
let currentBeat = -1

const GRID = {}

module.exports = {
  GRID,
  TIMER,
  currentBeat,
  NEUTRAL_COLOR,
  ACTIVE_COLOR,
  PLAYHEAD_COLOR,
  PLAYING_ACTIVE_COLOR,
  PARAMS,
  sounds
}
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
    max: 16,
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
    value: 45,
  },
  FILTER_FREQUENCY: {
    min: 0,
    max: 20000,
    value: 20000,
  },
  FILTER_RESONANCE: {
    min: 0,
    max: 30,
    value: 10,
  },
}

const NEUTRAL_COLOR = 'grey'
const ACTIVE_COLOR = 'blue'
const BUTTON_SIZE = 40
const PLAYHEAD_COLOR = 'darkgrey'
const PLAYING_ACTIVE_COLOR = 'darkblue'


let TIMER
let currentBeat = -1

const GRID = {}

const context = new AudioContext();

const isPlaying = false;

module.exports = {
  GRID,
  isPlaying,
  TIMER,
  currentBeat,
  NEUTRAL_COLOR,
  ACTIVE_COLOR,
  BUTTON_SIZE,
  PLAYHEAD_COLOR,
  PLAYING_ACTIVE_COLOR,
  PARAMS,
  context,
  sounds
}
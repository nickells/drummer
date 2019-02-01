const {
  GRID,
  context,
  ACTIVE_COLOR,
  NEUTRAL_COLOR
} = require('./globals')

const {
  distortion
} = require('./effects')

const getMs = (bpm) => {
  const intervalSeconds = 60 / bpm
  return intervalSeconds * 1000
}

const toggleGridItem = (inst, beat) => {
  GRID[inst][beat].active = !GRID[inst][beat].active
  if (GRID[inst][beat].active) {
    GRID[inst][beat].button.style.backgroundColor = ACTIVE_COLOR
  }
  else {
    GRID[inst][beat].button.style.backgroundColor = NEUTRAL_COLOR
  }
}

const mp3ToBuffer = async (file) => {
  return window.fetch(file)
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
}

function play(audioBuffer) {
  const source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(distortion);
  source.start()
}

function toCapital(CONST_CASE) {
  return CONST_CASE.split('_').map(str => {
    let lower = str.toLowerCase()
    const [first, ...rest] = str;
    return first.toUpperCase() + lower.slice(1)
  }).join(' ')
}

module.exports = {
  getMs,
  toCapital,
  play,
  mp3ToBuffer,
  toggleGridItem
}
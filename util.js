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

const getBpm = (ms) => {
  const intervalSeconds = ms / 1000
  return 60 / intervalSeconds
}

const toggleGridItem = (inst, beat) => {
  GRID[inst][beat].active = !GRID[inst][beat].active
  if (GRID[inst][beat].active) {
    GRID[inst][beat].button.classList.add('active')
  }
  else {
    GRID[inst][beat].button.classList.remove('active')
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
  return source
}

function stop(source) {
  source.stop()
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
  getBpm,
  toCapital,
  play,
  mp3ToBuffer,
  toggleGridItem
}
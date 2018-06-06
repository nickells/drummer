const {
  GRID,
  ACTIVE_COLOR,
  NEUTRAL_COLOR
} = require('./globals')

const getMs = (bpm) => {
  const intervalSeconds = 60 / bpm
  return intervalSeconds * 1000
}
const toggleGridItem = (inst, beat) => {
  GRID[inst][beat].active = !GRID[inst][beat].active
  if (GRID[inst][beat].active) {
    GRID[inst][beat].file = new Audio(`sounds/${inst}.wav`)
    GRID[inst][beat].button.style.backgroundColor = ACTIVE_COLOR
  }
  else {
    GRID[inst][beat].file = undefined
    GRID[inst][beat].button.style.backgroundColor = NEUTRAL_COLOR
  }
}

module.exports = {
  getMs,
  toggleGridItem
}
const {
  PARAMS,
} = require('./globals')

const {
  getBpm,
  getMs
} = require('./util')

const $tempo = document.getElementById('tap')
const $slider = document.getElementById('param-BPM')
const $label = document.getElementById('param-label-BPM')

let LAST_TEMPOS_MS = new Array(4).fill(getMs(PARAMS.BPM.value))

const setGlobalBpm = (bpm) => {
  PARAMS.BPM.value = bpm
  $slider.value = bpm
  $label.innerHTML = `<strong>BPM: </strong>${bpm}`
}

const sum = (values) => values.reduce((all, cur) => all+cur, 0)

const average = (values) => sum(values) / values.length

let lastClickTime = undefined
$tempo.addEventListener('click', () => {
  // supposed to reset. doesnt work yet
  if (performance.now() - lastClickTime > 1200) {
    LAST_TEMPOS_MS = LAST_TEMPOS_MS.fill(getMs(PARAMS.BPM.value))
    console.log(LAST_TEMPOS_MS)
  }
  if (!lastClickTime) {
    lastClickTime = performance.now()
  }
  else {
    LAST_TEMPOS_MS.shift()
    LAST_TEMPOS_MS.push(performance.now() - lastClickTime)
    console.log(LAST_TEMPOS_MS)
    setGlobalBpm(Math.round(getBpm(average(LAST_TEMPOS_MS))))
    lastClickTime = performance.now()
  }
})
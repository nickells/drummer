const sounds = [
  'clap-808',
  'hihat-808',
  // 'cowbell-808',
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

const TRACKS = 6
const CYCLE_LENGTH = 16
const PERCENT_SILENCE = 75
const MULT = 4

const GRID = {}

const start = async () => {
  const CYCLES = []

  for (let beat = 0; beat < CYCLE_LENGTH; beat++){
    CYCLES[beat] = []
    for (let track = 0; track < TRACKS; track++) {
      if (Math.random() * 100 > PERCENT_SILENCE) {
        const drum = Math.floor(Math.random() * sounds.length )
        const file = new Audio(`sounds/${sounds[drum]}.wav`)
        CYCLES[beat].push(file)

        if (!GRID[sounds[drum]]) GRID[sounds[drum]] = []
        GRID[sounds[drum]][beat] = true
      }
      else CYCLES[beat].push(undefined)
    }
  }

  const $grid = document.createElement('pre')
  $grid.innerText = JSON.stringify(GRID, null, 0).split('],').join('],\n')
  document.body.appendChild($grid)
  
  let beat = 0
  setInterval(() => {
    beat = (CYCLE_LENGTH + beat + 1) % CYCLE_LENGTH
    CYCLES[beat].forEach(sound => {
      if (sound) sound.play()
    })
  }, getMs(120) / MULT)
}

document.getElementById('start').addEventListener('click',() => {
  start()
})
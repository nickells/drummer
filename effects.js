const { context, PARAMS } = require('./globals')
//set up the different audio nodes we will use for the app
const distortion = context.createWaveShaper();
const gainNode = context.createGain();
const biquadFilter = context.createBiquadFilter();
const convolver = context.createConvolver();

// connect the nodes together
distortion.connect(biquadFilter)
// distortion.connect(biquadFilter);
biquadFilter.connect(context.destination);

// Manipulate the Biquad filter
biquadFilter.type = "lowpass";

const setFilterFrequency = (value) => {
  biquadFilter.frequency.value = value;
}

const setFilterResonance = (value) => {
  biquadFilter.Q.value = value;
}

setFilterFrequency(PARAMS.FILTER_FREQUENCY.value)
setFilterResonance(PARAMS.FILTER_RESONANCE.value)

window.filter = biquadFilter

module.exports = {
  distortion,
  setFilterFrequency,
  setFilterResonance,
}
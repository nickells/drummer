const { context, PARAMS } = require('./globals')
//set up the different audio nodes we will use for the app
const distortion = context.createWaveShaper();
const gainNode = context.createGain();
const biquadFilter = context.createBiquadFilter();
const convolver = context.createConvolver();

// connect the nodes together
distortion.connect(biquadFilter)
// distortion.connect(biquadFilter);

// Manipulate the Biquad filter
biquadFilter.type = "lowpass";

const setFilterFrequency = (value) => {
  biquadFilter.frequency.value = value;
}

const setFilterResonance = (value) => {
  biquadFilter.Q.value = value;
}

const compressor = context.createDynamicsCompressor();
compressor.threshold.setValueAtTime(0, context.currentTime);
compressor.knee.setValueAtTime(40, context.currentTime);
compressor.ratio.setValueAtTime(12, context.currentTime);
compressor.attack.setValueAtTime(0, context.currentTime);
compressor.release.setValueAtTime(0.25, context.currentTime);

window.compressor = compressor

// connect the AudioBufferSourceNode to the destination
biquadFilter.connect(compressor);
compressor.connect(context.destination);

setFilterFrequency(PARAMS.FILTER_FREQUENCY.value)
setFilterResonance(PARAMS.FILTER_RESONANCE.value)

window.filter = biquadFilter

module.exports = {
  distortion,
  setFilterFrequency,
  setFilterResonance,
}
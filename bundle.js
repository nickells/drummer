/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./effects.js":
/*!********************!*\
  !*** ./effects.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { context, PARAMS } = __webpack_require__(/*! ./globals */ \"./globals.js\")\n//set up the different audio nodes we will use for the app\nconst distortion = context.createWaveShaper();\nconst gainNode = context.createGain();\nconst biquadFilter = context.createBiquadFilter();\nconst convolver = context.createConvolver();\n\n// connect the nodes together\ndistortion.connect(biquadFilter)\n// distortion.connect(biquadFilter);\n\n// Manipulate the Biquad filter\nbiquadFilter.type = \"lowpass\";\n\nconst setFilterFrequency = (value) => {\n  biquadFilter.frequency.value = value;\n}\n\nconst setFilterResonance = (value) => {\n  biquadFilter.Q.value = value;\n}\n\nconst compressor = context.createDynamicsCompressor();\ncompressor.threshold.setValueAtTime(0, context.currentTime);\ncompressor.knee.setValueAtTime(40, context.currentTime);\ncompressor.ratio.setValueAtTime(12, context.currentTime);\ncompressor.attack.setValueAtTime(0, context.currentTime);\ncompressor.release.setValueAtTime(0.25, context.currentTime);\n\nwindow.compressor = compressor\n\n// connect the AudioBufferSourceNode to the destination\nbiquadFilter.connect(compressor);\ncompressor.connect(context.destination);\n\nsetFilterFrequency(PARAMS.FILTER_FREQUENCY.value)\nsetFilterResonance(PARAMS.FILTER_RESONANCE.value)\n\nwindow.filter = biquadFilter\n\nmodule.exports = {\n  distortion,\n  setFilterFrequency,\n  setFilterResonance,\n}\n\n//# sourceURL=webpack:///./effects.js?");

/***/ }),

/***/ "./globals.js":
/*!********************!*\
  !*** ./globals.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const sounds_electronic = [\n  'kick-808',\n  'snare-808',\n  'clap-808',\n  'hihat-808',\n  'openhat-808',\n  'tom-808',\n  'perc-808',\n  // 'perc-hollow',\n  'cowbell-808',\n]\n\nconst sounds_acoustic = [\n  'kick-acoustic02',\n  'snare-acoustic02',\n  'crash-acoustic',\n  'hihat-acoustic02',\n  'openhat-acoustic01',\n  'tom-acoustic02',\n  // 'perc-tambo',\n  // \"shaker-shuffle\",\n]\n\nconst sounds = window.location.search.includes('electronic') ? sounds_electronic : sounds_acoustic\n\n\nconst PARAMS = {\n  CYCLE_LENGTH: {\n    min: 4,\n    max: 16,\n    value: 16,\n  },\n  PERCENT_SILENCE: {\n    min: 0,\n    max: 100,\n    value: 75,\n  },\n  BPM: {\n    min: 20,\n    max: 240,\n    value: 120,\n  },\n  BPM_MULT: {\n    min: 0,\n    max: 8,\n    value: 4,\n  },\n  SWING: {\n    min: 0,\n    max: 100,\n    value: 45,\n  },\n  HUMANIZE: {\n    min: 0,\n    max: 100,\n    value: 12,\n  },\n  FILTER_FREQUENCY: {\n    min: 0,\n    max: 20000,\n    value: 20000,\n  },\n  FILTER_RESONANCE: {\n    min: 0,\n    max: 30,\n    value: 10,\n  },\n}\n\nconst NEUTRAL_COLOR = 'grey'\nconst ACTIVE_COLOR = 'blue'\nconst BUTTON_SIZE = 40\nconst PLAYHEAD_COLOR = 'darkgrey'\nconst PLAYING_ACTIVE_COLOR = 'darkblue'\n\n\nlet TIMER\nlet currentBeat = -1\n\nconst GRID = {}\n\nconst context = new AudioContext();\n\nconst isPlaying = false;\n\nmodule.exports = {\n  GRID,\n  isPlaying,\n  TIMER,\n  currentBeat,\n  NEUTRAL_COLOR,\n  ACTIVE_COLOR,\n  BUTTON_SIZE,\n  PLAYHEAD_COLOR,\n  PLAYING_ACTIVE_COLOR,\n  PARAMS,\n  context,\n  sounds\n}\n\n//# sourceURL=webpack:///./globals.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nlet {\n  GRID,\n  TIMER,\n  currentBeat,\n  NEUTRAL_COLOR,\n  ACTIVE_COLOR,\n  PLAYHEAD_COLOR,\n  BUTTON_SIZE,\n  PLAYING_ACTIVE_COLOR,\n  PARAMS,\n  sounds\n} = __webpack_require__(/*! ./globals.js */ \"./globals.js\")\n\nconst {\n  getMs,\n  play,\n  mp3ToBuffer,\n  toggleGridItem,\n  toCapital\n} = __webpack_require__(/*! ./util */ \"./util.js\")\n\nconst {\n  setFilterFrequency,\n  setFilterResonance,\n} = __webpack_require__(/*! ./effects */ \"./effects.js\")\n\nlet isMouseDown = false\ndocument.body.addEventListener('mousedown', () => {\n  isMouseDown = true\n})\ndocument.body.addEventListener('mouseup', () => {\n  isMouseDown = false\n})\n\nconst buildGrid = () => {\n  const $grid = document.getElementById('grid')\n  sounds.reverse().forEach(async sound => {\n    const $track = document.createElement('div')\n    const $label = document.createElement('div')\n    $track.className = 'track'\n    $label.className = 'label'\n    $label.innerText = sound.split('-')[0]\n    $grid.appendChild($track)\n    $track.appendChild($label)\n    const buffer = await mp3ToBuffer(`sounds/${sound}.wav`)\n    GRID[sound] = []\n\n    for (let beat = 0; beat < PARAMS.CYCLE_LENGTH.value; beat++) {\n      const $button = document.createElement('div')\n      $button.className = 'button'\n      if (beat % 4 === 0) $button.classList.add('margin')\n      $track.appendChild($button)\n      GRID[sound][beat] = { \n        active: false,\n        buffer,\n        button: $button\n      }\n      const onDown = () => {\n        toggleGridItem(sound, beat)\n        if (GRID[sound][beat].active ) play(GRID[sound][beat].buffer)\n      }\n      const onDrag = () => {\n        if (!isMouseDown) return\n        toggleGridItem(sound, beat)\n        if (GRID[sound][beat].active ) play(GRID[sound][beat].buffer)\n      }\n      $button.addEventListener('mousedown', onDown)\n      $button.addEventListener('mouseover', onDrag)\n    }\n  })\n}\n\nbuildGrid()\n\nconst updateView = () => {\n  requestAnimationFrame(() => {\n    sounds.forEach(sound => {\n      const CURRENT_GRID_ITEM = GRID[sound][currentBeat]\n      if (!CURRENT_GRID_ITEM) return\n\n      // Set active color on the current playhead\n      if (CURRENT_GRID_ITEM.active) CURRENT_GRID_ITEM.button.classList.add('active')\n      CURRENT_GRID_ITEM.button.classList.add('playhead')\n\n      // Set up cycling\n      const LAST_GRID_ITEM = GRID[sound][(PARAMS.CYCLE_LENGTH.value + currentBeat - 1) % PARAMS.CYCLE_LENGTH.value]\n      LAST_GRID_ITEM.button.classList.remove('playhead')\n    })\n  })\n}\n\nconst randomize = () => {\n  for (let beat = 0; beat < PARAMS.CYCLE_LENGTH.value; beat++){\n    for (let track = 0; track < sounds.length; track++) {\n\n      if (Math.random() * 100 > PARAMS.PERCENT_SILENCE.value) {\n        const drum = Math.floor(Math.random() * sounds.length )\n        toggleGridItem(sounds[drum], beat)\n      }\n    }\n  }\n}\n\nconst startPlayback = () => {\n  // Cache the open hat so we can mute it later\n  const openHatSound = Object.keys(GRID).find(sound => sound.includes('openhat'))\n  const closedHatSound = Object.keys(GRID).find(sound => sound.includes('hihat'))\n  \n  isPlaying = true\n  function loop(){\n    currentBeat = (PARAMS.CYCLE_LENGTH.value + currentBeat + 1) % PARAMS.CYCLE_LENGTH.value\n    Object.keys(GRID).forEach(sound => {\n      const track = GRID[sound]\n      const beat = track[currentBeat]\n      if (beat.active) {\n        setTimeout(() => {\n          let src = play(beat.buffer)\n          beat.src = src\n          // Mute openhats. Todo: make cleaner\n          if (sound === closedHatSound) {\n            GRID[openHatSound]\n            .forEach(item => {\n              if (item.src) item.src.stop()\n            })\n          }\n        }, Math.random() * PARAMS.HUMANIZE.value)\n      }\n    })\n\n    updateView()\n    let int = getMs(PARAMS.BPM.value) / PARAMS.BPM_MULT.value\n    let SWING_DIFF = int * (PARAMS.SWING.value / 100)\n    if (PARAMS.SWING.value) {\n      if (currentBeat % 2 === 0) int = int + SWING_DIFF\n      else int = int - SWING_DIFF\n    }\n    TIMER = setTimeout(loop, int)\n  }\n  loop()\n}\n\nconst clear = () => {\n  Object.keys(GRID).forEach(sound => {\n    const track = GRID[sound]\n    track.forEach((beat, index) => {\n      if (beat.active) toggleGridItem(sound, index)\n    })\n  })\n}\n\nconst pause = () => {\n  isPlaying = false\n  clearInterval(TIMER)\n}\n\nconst $grid = document.getElementById('grid')\nconst updateGridSize = (value) => {\n  const [...$rows] = $grid.children\n  $rows.forEach($row => {\n    [...$row.children].forEach(($button, index) => {\n      if (index > value) {\n        $button.classList.add('disabled')\n      }\n      else {\n        $button.classList.remove('disabled')\n      }\n    })\n  })\n}\n\n\nObject.keys(PARAMS).forEach(param => {\n  const label = `<strong>${toCapital(param)}</strong>`\n  const $params = document.getElementById('params')\n  const $slider = document.createElement('input')\n  $slider.type = \"range\"\n  $slider.min = PARAMS[param].min\n  $slider.max = PARAMS[param].max\n  $slider.value = PARAMS[param].value\n  $slider.id = 'param-' + param\n  const $label = document.createElement('div')\n  $label.id = 'param-label-' + param\n  $label.innerHTML = label + ': ' + PARAMS[param].value\n  $params.appendChild($label)\n  $params.appendChild($slider)\n  $slider.addEventListener('input', event => {\n    let value = Number(event.target.value)\n    PARAMS[param].value = value\n    $label.innerHTML = label + ': ' + PARAMS[param].value\n    if (param === 'PERCENT_SILENCE') {\n      clear()\n      randomize()\n    }\n    if (param === 'FILTER_FREQUENCY') {\n      setFilterFrequency(value)\n    }\n    if (param === 'FILTER_RESONANCE') {\n      setFilterResonance(value)\n    }\n    if (param === 'CYCLE_LENGTH') {\n      updateGridSize(value)\n    }\n  })\n})\n\n\ndocument.getElementById('play').addEventListener('click', (e) => {\n  startPlayback()\n  e.target.disabled = true\n  document.getElementById('pause').disabled = false\n})\n\ndocument.getElementById('clear').addEventListener('click', () => {\n  clear()\n})\n\ndocument.getElementById('randomize').addEventListener('click',() => {\n  clear()\n  randomize()\n})\n\ndocument.getElementById('pause').addEventListener('click',(e) => {\n  pause()\n  e.target.disabled = true\n  document.getElementById('play').disabled = false\n})\n\n__webpack_require__(/*! ./tap-tempo */ \"./tap-tempo.js\")\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./tap-tempo.js":
/*!**********************!*\
  !*** ./tap-tempo.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  PARAMS,\n} = __webpack_require__(/*! ./globals */ \"./globals.js\")\n\nconst {\n  getBpm,\n  getMs\n} = __webpack_require__(/*! ./util */ \"./util.js\")\n\nconst $tempo = document.getElementById('tap')\nconst $slider = document.getElementById('param-BPM')\nconst $label = document.getElementById('param-label-BPM')\n\nlet LAST_TEMPOS_MS = new Array(4).fill(getMs(PARAMS.BPM.value))\n\nconst setGlobalBpm = (bpm) => {\n  PARAMS.BPM.value = bpm\n  $slider.value = bpm\n  $label.innerHTML = `<strong>BPM: </strong>${bpm}`\n}\n\nconst sum = (values) => values.reduce((all, cur) => all+cur, 0)\n\nconst average = (values) => sum(values) / values.length\n\nlet lastClickTime = undefined\n$tempo.addEventListener('click', () => {\n  // supposed to reset. doesnt work yet\n  if (performance.now() - lastClickTime > 1200) {\n    LAST_TEMPOS_MS = LAST_TEMPOS_MS.fill(getMs(PARAMS.BPM.value))\n    console.log(LAST_TEMPOS_MS)\n  }\n  if (!lastClickTime) {\n    lastClickTime = performance.now()\n  }\n  else {\n    LAST_TEMPOS_MS.shift()\n    LAST_TEMPOS_MS.push(performance.now() - lastClickTime)\n    console.log(LAST_TEMPOS_MS)\n    setGlobalBpm(Math.round(getBpm(average(LAST_TEMPOS_MS))))\n    lastClickTime = performance.now()\n  }\n})\n\n//# sourceURL=webpack:///./tap-tempo.js?");

/***/ }),

/***/ "./util.js":
/*!*****************!*\
  !*** ./util.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  GRID,\n  context,\n  ACTIVE_COLOR,\n  NEUTRAL_COLOR\n} = __webpack_require__(/*! ./globals */ \"./globals.js\")\n\nconst {\n  distortion\n} = __webpack_require__(/*! ./effects */ \"./effects.js\")\n\nconst getMs = (bpm) => {\n  const intervalSeconds = 60 / bpm\n  return intervalSeconds * 1000\n}\n\nconst getBpm = (ms) => {\n  const intervalSeconds = ms / 1000\n  return 60 / intervalSeconds\n}\n\nconst toggleGridItem = (inst, beat) => {\n  GRID[inst][beat].active = !GRID[inst][beat].active\n  if (GRID[inst][beat].active) {\n    GRID[inst][beat].button.classList.add('active')\n  }\n  else {\n    GRID[inst][beat].button.classList.remove('active')\n  }\n}\n\nconst mp3ToBuffer = async (file) => {\n  return window.fetch(file)\n  .then(response => response.arrayBuffer())\n  .then(arrayBuffer => context.decodeAudioData(arrayBuffer))\n}\n\nfunction play(audioBuffer) {\n  const source = context.createBufferSource();\n  source.buffer = audioBuffer;\n  source.connect(distortion);\n  source.start()\n  return source\n}\n\nfunction stop(source) {\n  source.stop()\n}\n\nfunction toCapital(CONST_CASE) {\n  return CONST_CASE.split('_').map(str => {\n    let lower = str.toLowerCase()\n    const [first, ...rest] = str;\n    return first.toUpperCase() + lower.slice(1)\n  }).join(' ')\n}\n\nmodule.exports = {\n  getMs,\n  getBpm,\n  toCapital,\n  play,\n  mp3ToBuffer,\n  toggleGridItem\n}\n\n//# sourceURL=webpack:///./util.js?");

/***/ })

/******/ });
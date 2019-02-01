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

eval("const { context, PARAMS } = __webpack_require__(/*! ./globals */ \"./globals.js\")\n//set up the different audio nodes we will use for the app\nconst distortion = context.createWaveShaper();\nconst gainNode = context.createGain();\nconst biquadFilter = context.createBiquadFilter();\nconst convolver = context.createConvolver();\n\n// connect the nodes together\ndistortion.connect(biquadFilter)\n// distortion.connect(biquadFilter);\nbiquadFilter.connect(context.destination);\n// convolver.connect(gainNode);\n// gainNode.connect(context.destination);\n\n// Manipulate the Biquad filter\nbiquadFilter.type = \"lowpass\";\n\nconst setFilterFrequency = (value) => {\n  biquadFilter.frequency.value = value;\n}\n\nconst setFilterResonance = (value) => {\n  biquadFilter.Q.value = value;\n}\n\n\nsetFilterFrequency(PARAMS.FILTER_FREQUENCY.value)\nsetFilterResonance(PARAMS.FILTER_RESONANCE.value)\n\n// console.log(biquadFilter)\nwindow.filter = biquadFilter\n// biquadFilter.gain.setValueAtTime(25, context.currentTime);\n\nmodule.exports = {\n  distortion,\n  setFilterFrequency,\n  setFilterResonance,\n}\n\n//# sourceURL=webpack:///./effects.js?");

/***/ }),

/***/ "./globals.js":
/*!********************!*\
  !*** ./globals.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const sounds_electronic = [\n  'kick-808',\n  'snare-808',\n  'clap-808',\n  'hihat-808',\n  'openhat-808',\n  'tom-808',\n  'perc-808',\n  // 'perc-hollow',\n  'cowbell-808',\n]\n\nconst sounds_acoustic = [\n  'kick-acoustic02',\n  'snare-acoustic02',\n  'crash-acoustic',\n  'hihat-acoustic02',\n  'openhat-acoustic01',\n  'tom-acoustic02',\n  // 'perc-tambo',\n  // \"shaker-shuffle\",\n]\n\nconst sounds = window.location.search.includes('electronic') ? sounds_electronic : sounds_acoustic\n\n\nconst PARAMS = {\n  CYCLE_LENGTH: {\n    min: 4,\n    max: 16,\n    value: 16,\n  },\n  PERCENT_SILENCE: {\n    min: 0,\n    max: 100,\n    value: 75,\n  },\n  BPM: {\n    min: 20,\n    max: 240,\n    value: 120,\n  },\n  BPM_MULT: {\n    min: 0,\n    max: 8,\n    value: 4,\n  },\n  SWING: {\n    min: 0,\n    max: 100,\n    value: 45,\n  },\n  FILTER_FREQUENCY: {\n    min: 0,\n    max: 20000,\n    value: 1000,\n  },\n  FILTER_RESONANCE: {\n    min: 0,\n    max: 30,\n    value: 10,\n  },\n}\n\nconst NEUTRAL_COLOR = 'grey'\nconst ACTIVE_COLOR = 'blue'\nconst PLAYHEAD_COLOR = 'darkgrey'\nconst PLAYING_ACTIVE_COLOR = 'darkblue'\n\n\nlet TIMER\nlet currentBeat = -1\n\nconst GRID = {}\n\nconst context = new AudioContext();\n\nmodule.exports = {\n  GRID,\n  TIMER,\n  currentBeat,\n  NEUTRAL_COLOR,\n  ACTIVE_COLOR,\n  PLAYHEAD_COLOR,\n  PLAYING_ACTIVE_COLOR,\n  PARAMS,\n  context,\n  sounds\n}\n\n//# sourceURL=webpack:///./globals.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("document.body.style.fontFamily = 'monospace'\n\nlet {\n  GRID,\n  TIMER,\n  currentBeat,\n  NEUTRAL_COLOR,\n  ACTIVE_COLOR,\n  PLAYHEAD_COLOR,\n  PLAYING_ACTIVE_COLOR,\n  PARAMS,\n  sounds\n} = __webpack_require__(/*! ./globals.js */ \"./globals.js\")\n\nconst {\n  getMs,\n  play,\n  mp3ToBuffer,\n  toggleGridItem\n} = __webpack_require__(/*! ./util */ \"./util.js\")\n\nconst {\n  setFilterFrequency,\n  setFilterResonance,\n} = __webpack_require__(/*! ./effects */ \"./effects.js\")\n\n\nlet isMouseDown = false\ndocument.body.addEventListener('mousedown', () => {\n  isMouseDown = true\n})\ndocument.body.addEventListener('mouseup', () => {\n  isMouseDown = false\n})\n\nconst buildGrid = () => {\n  const $grid = document.getElementById('grid')\n  sounds.forEach(async sound => {\n    const buffer = await mp3ToBuffer(`sounds/${sound}.wav`)\n    const $track = document.createElement('div')\n    const $label = document.createElement('div')\n    $label.style = 'display: inline-block; min-width: 80px'\n    $label.innerText = sound.split('-')[0]\n    $grid.appendChild($track)\n    $track.appendChild($label)\n    GRID[sound] = []\n\n    for (let beat = 0; beat < PARAMS.CYCLE_LENGTH.value; beat++) {\n      const $button = document.createElement('div')\n      $button.style = `display: inline-block; height: 20px; width: 20px; background-color: ${NEUTRAL_COLOR}; margin: 0px 2px;`\n      if (beat % 4 === 0) $button.style.marginLeft = '10px'\n      $track.appendChild($button)\n      GRID[sound][beat] = { \n        active: false,\n        buffer,\n        button: $button\n      }\n      $button.addEventListener('mousedown', () => {\n        toggleGridItem(sound, beat)\n        play(GRID[sound][beat].buffer)\n      })\n      $button.addEventListener('mouseover', () => {\n        if (!isMouseDown) return\n        toggleGridItem(sound, beat)\n        play(GRID[sound][beat].buffer)\n      })\n    }\n  })\n}\n\nbuildGrid()\n\nconst updateView = () => {\n  requestAnimationFrame(() => {\n    sounds.forEach(sound => {\n      const CURRENT_GRID_ITEM = GRID[sound][currentBeat]\n      if (!CURRENT_GRID_ITEM) return\n\n      // Set active color on the current playhead\n      if (CURRENT_GRID_ITEM.active) CURRENT_GRID_ITEM.button.style.backgroundColor = PLAYING_ACTIVE_COLOR\n      else CURRENT_GRID_ITEM.button.style.backgroundColor = PLAYHEAD_COLOR\n\n      // Set up cycling\n      const LAST_GRID_ITEM = GRID[sound][(PARAMS.CYCLE_LENGTH.value + currentBeat - 1) % PARAMS.CYCLE_LENGTH.value]\n      if (LAST_GRID_ITEM.active) LAST_GRID_ITEM.button.style.backgroundColor = ACTIVE_COLOR\n      else LAST_GRID_ITEM.button.style.backgroundColor = NEUTRAL_COLOR\n    })\n  })\n}\n\nconst randomize = () => {\n  for (let beat = 0; beat < PARAMS.CYCLE_LENGTH.value; beat++){\n    for (let track = 0; track < sounds.length; track++) {\n\n      if (Math.random() * 100 > PARAMS.PERCENT_SILENCE.value) {\n        const drum = Math.floor(Math.random() * sounds.length )\n        toggleGridItem(sounds[drum], beat)\n      }\n    }\n  }\n}\n\nconst startPlayback = () => {\n  function loop(){\n    currentBeat = (PARAMS.CYCLE_LENGTH.value + currentBeat + 1) % PARAMS.CYCLE_LENGTH.value\n    Object.keys(GRID).forEach(sound => {\n      const track = GRID[sound]\n      const beat = track[currentBeat]\n      if (beat.active) {\n        play(beat.buffer)\n      }\n    })\n\n    updateView()\n    let int = getMs(PARAMS.BPM.value) / PARAMS.BPM_MULT.value\n    let SWING_DIFF = int * (PARAMS.SWING.value / 100)\n    if (PARAMS.SWING.value) {\n      if (currentBeat % 2 === 0) int = int + SWING_DIFF\n      else int = int - SWING_DIFF\n    }\n    TIMER = setTimeout(loop, int)\n  }\n  loop()\n}\n\nconst clear = () => {\n  Object.keys(GRID).forEach(sound => {\n    const track = GRID[sound]\n    track.forEach((beat, index) => {\n      if (beat.active) toggleGridItem(sound, index)\n    })\n  })\n}\n\nconst pause = () => {\n  clearInterval(TIMER)\n}\n\n\nObject.keys(PARAMS).forEach(param => {\n  const $params = document.getElementById('params')\n  const $slider = document.createElement('input')\n  $slider.type = \"range\"\n  $slider.min = PARAMS[param].min\n  $slider.max = PARAMS[param].max\n  $slider.value = PARAMS[param].value\n  const $label = document.createElement('div')\n  $label.innerText = param + ': ' + PARAMS[param].value\n  $params.appendChild($label)\n  $params.appendChild($slider)\n  $slider.addEventListener('input', event => {\n    let value = Number(event.target.value)\n    PARAMS[param].value = value\n    $label.innerText = param + ': ' + PARAMS[param].value\n    if (param === 'PERCENT_SILENCE') {\n      clear()\n      randomize()\n    }\n    if (param === 'FILTER_FREQUENCY') {\n      setFilterFrequency(value)\n    }\n    if (param === 'FILTER_RESONANCE') {\n      setFilterResonance(value)\n    }\n  })\n})\n\n\ndocument.getElementById('play').addEventListener('click', () => {\n  startPlayback()\n})\n\ndocument.getElementById('clear').addEventListener('click', () => {\n  clear()\n})\n\ndocument.getElementById('randomize').addEventListener('click',() => {\n  clear()\n  randomize()\n})\n\ndocument.getElementById('pause').addEventListener('click',() => {\n  pause()\n})\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./util.js":
/*!*****************!*\
  !*** ./util.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  GRID,\n  context,\n  ACTIVE_COLOR,\n  NEUTRAL_COLOR\n} = __webpack_require__(/*! ./globals */ \"./globals.js\")\n\nconst {\n  distortion\n} = __webpack_require__(/*! ./effects */ \"./effects.js\")\n\nconst getMs = (bpm) => {\n  const intervalSeconds = 60 / bpm\n  return intervalSeconds * 1000\n}\n\nconst toggleGridItem = (inst, beat) => {\n  GRID[inst][beat].active = !GRID[inst][beat].active\n  if (GRID[inst][beat].active) {\n    GRID[inst][beat].button.style.backgroundColor = ACTIVE_COLOR\n  }\n  else {\n    GRID[inst][beat].button.style.backgroundColor = NEUTRAL_COLOR\n  }\n}\n\nconst mp3ToBuffer = async (file) => {\n  return window.fetch(file)\n  .then(response => response.arrayBuffer())\n  .then(arrayBuffer => context.decodeAudioData(arrayBuffer))\n}\n\nfunction play(audioBuffer) {\n  const source = context.createBufferSource();\n  source.buffer = audioBuffer;\n  source.connect(distortion);\n  source.start()\n}\n\nmodule.exports = {\n  getMs,\n  play,\n  mp3ToBuffer,\n  toggleGridItem\n}\n\n//# sourceURL=webpack:///./util.js?");

/***/ })

/******/ });
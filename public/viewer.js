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
/******/ 	return __webpack_require__(__webpack_require__.s = "./FrontProjects/Viewer/src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./FrontProjects/Viewer/src/ViewerMain.html":
/*!**************************************************!*\
  !*** ./FrontProjects/Viewer/src/ViewerMain.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"card\\\">\\n    <div class=\\\"card-header\\\">\\n        播放端\\n    </div>\\n    <div>\\n        <video style=\\\"display: block;width: 640px;height: 360px\\\" autoplay muted ref=\\\"remote_preview\\\" controls></video>\\n    </div>\\n</div>\\n\";\n\n//# sourceURL=webpack:///./FrontProjects/Viewer/src/ViewerMain.html?");

/***/ }),

/***/ "./FrontProjects/Viewer/src/ViewerMain.js":
/*!************************************************!*\
  !*** ./FrontProjects/Viewer/src/ViewerMain.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ViewerMain_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewerMain.html */ \"./FrontProjects/Viewer/src/ViewerMain.html\");\n/* harmony import */ var _ViewerMain_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ViewerMain_html__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst ViewerMain = Vue.component(\"student-main\", {\n    template: _ViewerMain_html__WEBPACK_IMPORTED_MODULE_0___default.a,\n    data() {\n        return {\n            classroomName: \"\"\n        };\n    },\n    mounted() {\n        this._socket = io();\n        this._socket.emit(\"viewerJoinedIn\");\n        this._remoteStream = new MediaStream();\n        this.$refs.remote_preview.srcObject = this._remoteStream;\n\n        this.addSocketListeners();\n    },\n\n    methods: {\n        addSocketListeners() {\n            this._socket.on(\"broadcasterOffer\", async data => {\n                console.log(data);\n                this._teacherId = data.from;\n                this._answerPc = new RTCPeerConnection();\n                this._answerPc.onicecandidate = e => {\n                    if (e.candidate) {\n                        this._socket.emit(\"ice\", {from: this._socket.id, to: this._teacherId, ice: e.candidate});\n                    }\n                };\n\n                this._answerPc.ontrack = e => {\n                    console.log(e);\n                    this._remoteStream.addTrack(e.track);\n                };\n\n                await this._answerPc.setRemoteDescription(new RTCSessionDescription(data.offer));\n\n                let answer = await this._answerPc.createAnswer();\n                await this._answerPc.setLocalDescription(new RTCSessionDescription(answer));\n                this._socket.emit(\"viewerAnswer\", {from: this._socket.id, to: this._teacherId, answer: answer});\n            });\n            this._socket.on(\"ice\", data => {\n                this._answerPc.addIceCandidate(new RTCIceCandidate(data.ice));\n            });\n        },\n    }\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewerMain);\n\n\n//# sourceURL=webpack:///./FrontProjects/Viewer/src/ViewerMain.js?");

/***/ }),

/***/ "./FrontProjects/Viewer/src/main.js":
/*!******************************************!*\
  !*** ./FrontProjects/Viewer/src/main.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ViewerMain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewerMain */ \"./FrontProjects/Viewer/src/ViewerMain.js\");\n\n\nlet app = new _ViewerMain__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nlet root = document.createElement(\"div\");\ndocument.body.appendChild(root);\napp.$mount(root);\n\n\n//# sourceURL=webpack:///./FrontProjects/Viewer/src/main.js?");

/***/ })

/******/ });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./FrontProjects/Broadcaster/src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./FrontProjects/Broadcaster/src/controllers/MainApp.js":
/*!**************************************************************!*\
  !*** ./FrontProjects/Broadcaster/src/controllers/MainApp.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _views_MainApp_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/MainApp.html */ \"./FrontProjects/Broadcaster/src/views/MainApp.html\");\n/* harmony import */ var _views_MainApp_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_views_MainApp_html__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _net_ViewerConnection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../net/ViewerConnection */ \"./FrontProjects/Broadcaster/src/net/ViewerConnection.js\");\n\n\n\nconst MainApp = Vue.component(\"main-app\", {\n    template: _views_MainApp_html__WEBPACK_IMPORTED_MODULE_0___default.a,\n    data() {\n        return {classroomName: \"\"}\n    },\n\n    async mounted() {\n        this._localStream = this.$refs.player.captureStream();\n        this._socket = io();\n        this._viewerConnections = new Map();\n\n        this.addSocketListeners();\n    },\n\n    methods: {\n        addSocketListeners() {\n            this._socket.on(\"viewerJoinedIn\", data => {\n                console.debug(\"New viewer join in\");\n                this._viewerConnections.set(data.viewerSid, new _net_ViewerConnection__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this._socket, data.viewerSid, this._localStream));\n            });\n            this._socket.on(\"viewerAnswer\", data => {\n                let vc = this._viewerConnections.get(data.from);\n                if (vc) {\n                    vc.viewerAnswerHandler(data);\n                }\n            });\n            this._socket.on(\"ice\", data => {\n                let vc = this._viewerConnections.get(data.from);\n                if (vc) {\n                    vc.iceHandler(data);\n                }\n            });\n        }\n    }\n});\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MainApp);\n\n\n//# sourceURL=webpack:///./FrontProjects/Broadcaster/src/controllers/MainApp.js?");

/***/ }),

/***/ "./FrontProjects/Broadcaster/src/main.js":
/*!***********************************************!*\
  !*** ./FrontProjects/Broadcaster/src/main.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_MainApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/MainApp */ \"./FrontProjects/Broadcaster/src/controllers/MainApp.js\");\n\n\nlet rootElement = document.createElement(\"div\");\ndocument.body.appendChild(rootElement);\n\nnew _controllers_MainApp__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().$mount(rootElement);\n\n//# sourceURL=webpack:///./FrontProjects/Broadcaster/src/main.js?");

/***/ }),

/***/ "./FrontProjects/Broadcaster/src/net/ViewerConnection.js":
/*!***************************************************************!*\
  !*** ./FrontProjects/Broadcaster/src/net/ViewerConnection.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass ViewerConnection {\n\n\n    constructor(socket, viewerSid, stream) {\n        this._socket = socket;\n        this._viewerSid = viewerSid;\n        this._stream = stream;\n\n        this.asyncInit();\n    }\n\n    async asyncInit() {\n        this._offerPc = new RTCPeerConnection();\n\n        this._offerPc.onicecandidate = e => {\n            if (e.candidate) {\n                this._socket.emit(\"ice\", {from: this._socket.id, to: this._viewerSid, ice: e.candidate});\n            }\n        };\n\n        this._stream.getTracks().forEach(t => {\n            this._offerPc.addTrack(t);\n        });\n\n        let offer = await this._offerPc.createOffer();\n        this._socket.emit(\"broadcasterOffer\", {from: this._socket.id, to: this._viewerSid, offer: offer});\n        await this._offerPc.setLocalDescription(new RTCSessionDescription(offer));\n    }\n\n    async viewerAnswerHandler(data) {\n        await this._offerPc.setRemoteDescription(new RTCSessionDescription(data.answer));\n        console.log(data);\n    }\n\n    iceHandler(data) {\n        this._offerPc.addIceCandidate(new RTCIceCandidate(data.ice));\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewerConnection);\n\n\n//# sourceURL=webpack:///./FrontProjects/Broadcaster/src/net/ViewerConnection.js?");

/***/ }),

/***/ "./FrontProjects/Broadcaster/src/views/MainApp.html":
/*!**********************************************************!*\
  !*** ./FrontProjects/Broadcaster/src/views/MainApp.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div>\\n    <div class=\\\"card\\\">\\n        <div class=\\\"card-header font-weight-bold\\\">\\n            广播端\\n        </div>\\n        <div style=\\\"display: flex;flex-direction: row;\\\">\\n            <video style=\\\"width: 640px;height: 360px;display: block\\\" src=\\\"video.mp4\\\" autoplay muted controls\\n                   ref=\\\"player\\\"></video>\\n        </div>\\n    </div>\\n</div>\\n\";\n\n//# sourceURL=webpack:///./FrontProjects/Broadcaster/src/views/MainApp.html?");

/***/ })

/******/ });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass DOMNodeCollection {\n  constructor(nodes) {\n    this.nodes = nodes;\n  }\n\n  each(cb) {\n    this.nodes.forEach(cb);\n  }\n\n  html(html) {\n    if (typeof html === 'string') {\n      this.each(node => node.innerHTML = html);\n    } else if (this.nodes.length > 0) {\n      return this.nodes[0].innerHTML;\n    }\n  }\n\n  empty() {\n    this.html('');\n  }\n\n  append(children) {\n    if (this.nodes.length === 0) return;\n\n    if (typeof children === 'object' && !(children instanceof DOMNodeCollection)) {\n      children = $w(children);\n    }\n\n    if (typeof children === 'string') {\n      this.each(node => node.innerHTML += children);\n    } else if (children instanceof DOMNodeCollection) {  \n      this.each(node => {\n        children.each(child => node.appendChild(child.cloneNode(true)));\n      });\n    }\n  }\n\n  attr(key, val) {\n    if (typeof val === 'string') {\n      this.each(node => node.setAttribute(key, val));\n    } else {\n      return this.nodes[0].getAttribute(key);\n    }\n  }\n\n  addClass(newClass) {\n    this.each(node => node.classList.add(newClass));\n  }\n\n  removeClass(oldClass) {\n    this.each(node => node.classList.remove(oldClass));\n  }\n\n  toggleClass(changeClass) {\n    this.each(node => node.classList.toggle(changeClass));\n  }\n\n  children() {\n    const allChildren = [];\n    this.each(node => {\n      allChildren.push(node.children);\n    });\n    return allChildren.filter(child => child.length > 0);\n  }\n\n  parent() {\n    const allParents = [];\n    this.each(node => {\n      allParents.push(node.parentElement);\n    });\n    const elements = Array.from(new Set(allParents));\n    return new DOMNodeCollection(elements);\n  }\n\n  find(string) {\n    const elements = Array.from(this.nodes[0].querySelectorAll(string));\n    return new DOMNodeCollection(elements);\n  }\n\n  remove() {\n    this.each(node => node.parentNode.removeChild(node));\n  }\n\n  on(newEvent, cb) {\n    this.each(node => {\n      node.addEventListener(newEvent, cb);\n    });\n  }\n\n  off(oldEvent, cb) {\n    this.each(node => {\n      node.removeEventListener(oldEvent, cb);\n    });\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DOMNodeCollection);\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\n\nconst fns = [];\n\nwindow.$w = (selector) => {\n  if (selector instanceof Function) {\n    if (document.readyState === 'complete') {\n      selector();\n    } else {\n      fns.push(selector);\n    }\n  } else if (selector instanceof HTMLElement) {\n    return new _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([selector]);\n  } else {\n    const collection = document.querySelectorAll(selector);\n    return new _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](Array.from(collection));\n  }\n};\n\n$w.extend = (main, ...objs) => {\n  objs.forEach(obj => {\n    for (const attr in obj) {\n      main[attr] = obj[attr];\n    }\n  });\n  return main;\n};\n\n$w.ajax = (options) => {\n  const xhttp = new XMLHttpRequest();\n  let defaults = {\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n    type: 'GET',\n    url: \"\",\n    success: () => {},\n    error: () => {},\n    data: {},\n  };\n\n  options = $w.extend(defaults, options);\n\n  xhttp.open(options.type, options.url);\n  xhttp.onload = (e) => {\n    if (xhttp.status === 200) {\n      options.success(xhttp.response);\n    } else {\n      options.error(xhttp.response);\n    }\n  };\n  xhttp.send();\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  fns.forEach(fn => fn());\n});\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });
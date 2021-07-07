(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['axios-ext'] = {}));
}(this, (function (exports) { 'use strict';

	const name = "123";

	exports.name = name;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=axios-ext.umd.js.map

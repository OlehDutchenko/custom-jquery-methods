'use strict';

/**
 * _Extend jQuery methods_
 * @module
 * @see $.fn.nodeName
 */

// ----------------------------------------
// Public
// ----------------------------------------

(function (window, $) {
	/**
	 * Returns `nodeName` property of DOM element  in lowercase.
	 * Useful when you can get unknown elements.
	 *
	 * @example <caption>Received unknown elements in function</caption>
	 * function myFunction ($el) {
	 *     switch ($el.nodeName()) {
	 *         case 'img':
	 *             // ...
	 *             break;
	 *         case 'div':
	 *             // ...
	 *             break;
	 *         case 'input':
	 *             // ...
	 *             break;
	 *         default:
	 *             // ...
	 *     }
	 * }
	 *
	 * @returns {string}
	 * @memberOf $.fn
	 * @sourceCode
	 */
	$.fn.nodeName = function () {
		return this[0].nodeName.toLowerCase();
	};
})(window, window.jQuery);

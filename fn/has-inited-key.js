'use strict';

/**
 * _Extend jQuery methods_
 * @module
 * @see $.fn.hasInitedKey
 * @see $.fn.removeInitedKey
 */

// ----------------------------------------
// Public
// ----------------------------------------

(function (window, $) {
	/**
	 * Check for the existence of an initialization key in `.data()`
	 *
	 * @example <caption>Check in cycle `.each()`</caption>
	 * let initKey = 'my-key';
	 * $('.my-elements').each((i, el) => {
	 *     let $element = $(el);
	 *     if ($element.hasInitedKey(initKey)) {
	 *         return true;
	 *     }
	 *     // process current element
	 * });
	 *
	 * @example <caption>Check for single element</caption>
	 * let initKey = 'my-key';
	 * let $myEl = $('.my-element');
	 * if (!$myEl.hasInitedKey(initKey)) {
	 *     // process current element
	 * }
	 *
	 * @param {string} key - key name
	 * @param {boolean} [setKey=true] - set the key, if not exist
	 * @returns {boolean}
	 * @memberOf $.fn
	 * @sourceCode
	 */
	$.fn.hasInitedKey = function (key, setKey = true) {
		let hasKey = !!this.data(key);
		if (hasKey !== true && setKey) {
			this.data(key, true);
		}

		return hasKey;
	};

	/**
	 * Removing an initialization key in `.data()`
	 *
	 * @example
	 * let initKey = 'my-key';
	 * let $myEl = $('.my-elements');
	 * $myEl.removeInitedKey(initKey);
	 *
	 * @param {string} key - key name
	 * @returns {jQuery.<Element>} this
	 * @memberOf $.fn
	 * @sourceCode
	 */
	$.fn.removeInitedKey = function (key) {
		return this.each((index, el) => {
			$(el).data(key, null);
		});
	};
})(window, window.jQuery);

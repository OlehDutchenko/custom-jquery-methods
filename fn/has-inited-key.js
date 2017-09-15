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
	 * Check for the existence of an initialization key
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
	 * @example <caption>Check single</caption>
	 * let initKey = 'my-key';
	 * let $myEl = $('.my-elements');
	 * if (!$element.hasInitedKey(initKey)) {
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
		let $this = $(this);
		let hasKey = !!$this.data(key);

		if (hasKey !== true && setKey) {
			$this.data(key, true);
		}

		return hasKey;
	};

	/**
	 * Removing an initialization key
	 *
	 * @example
	 * let initKey = 'my-key';
	 * let $myEl = $('.my-elements');
	 * $myEl.removeInitedKey(initKey);
	 *
	 * @param {string} key - key name
	 * @memberOf $.fn
	 * @sourceCode
	 */
	$.fn.removeInitedKey = function (key) {
		$(this).data(key, null);
	};
})(window, window.jQuery);

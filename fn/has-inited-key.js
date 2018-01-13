(function (window, $) {
	'use strict';
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
	 * @global
	 * @name hasInitedKey
	 * @this JQuery
	 * @param {string} key - key name
	 * @param {boolean} [setKey=true] - set the key, if not exist
	 * @returns {boolean}
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
	 * @global
	 * @name removeInitedKey
	 * @this JQuery
	 * @param {string} key - key name
	 * @returns {JQuery}
	 * @sourceCode
	 */
	$.fn.removeInitedKey = function (key) {
		return this.each((index, el) => {
			$(el).data(key, null);
		});
	};
})(window, window.jQuery);

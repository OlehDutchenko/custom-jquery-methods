'use strict';

/**
 * _Extend jQuery methods_
 * @module
 * @see $.fn.addClassSiblingsRemove
 */

// ----------------------------------------
// Public
// ----------------------------------------

(function (window, $) {
	/**
	 * Adding a class to the current element and deleting from adjacent elements
	 *
	 * @example <caption>On the same level</caption>
	 * $('.item').addClassSiblingsRemove('is-active');
	 *
	 * @example <caption>At the level of the parent elements</caption>
	 * $('.item').addClassSiblingsRemove('is-active', ['parent', 'siblings', 'children']);
	 *
	 * @param {string} cssClass
	 * @param {Array.<string>} [customPath]
	 * @memberOf $.fn
	 * @sourceCode
	 */
	$.fn.addClassSiblingsRemove = function (cssClass, customPath) {
		return this.each((index, el) => {
			let $element = $(el);
			let $siblings;

			if (Array.isArray(customPath) && customPath.length) {
				$siblings = $element;
				customPath.forEach(goTo => {
					$siblings = $siblings[goTo]();
				});
			} else {
				$siblings = $element.siblings();
			}

			$element.addClass(cssClass);
			$siblings.removeClass(cssClass);
		});
	};
})(window, window.jQuery);

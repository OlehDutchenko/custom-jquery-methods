/**
 * jQuery library
 * @namespace $
 * @alias jQuery
 */

/**
 * jQuery prototype
 * @namespace fn
 * @memberOf $
 */

/**
 * _Extend jQuery methods_
 * @module
 * @see $.fn.addClassSiblingsRemove
 */

// ----------------------------------------
// Public
// ----------------------------------------

(function (window, $) {
	'use strict';
	/**
	 * Adding a class to the current element and deleting from adjacent elements
	 *
	 * @example <caption>On the same level</caption>
	 * $('.item').addClassSiblingsRemove('is-active');
	 *
	 * // it will reproduce
	 * $('.item').addClass('is-active').siblings().removeClass('is-active');
	 *
	 * @example <caption>At the level of the parent elements with <code>customPath</code> parameter</caption>
	 * $('.item').addClassSiblingsRemove('is-active', ['parent', 'siblings', 'children']);
	 *
	 * // it will reproduce
	 * $('.item').addClass('is-active').parent().siblings().children().removeClass('is-active');
	 *
	 *  @example <caption>Also, <code>customPath</code> allows you to use a dynamically calculated path depending on the conditions you need</caption>
	 * let customPath = ['parent', 'siblings', 'children'];
	 * if (condition1) {
	 *     customPath.unshift('parent');
	 * } else if (condition2) {
	 *     customPath = ['next'];
	 * } else if (condition3) {
	 *     customPath = ['prev'];
	 * }
	 * $('.item').addClassSiblingsRemove('is-active', customPath);
	 *
	 * // it will reproduce
	 * if (condition1) {
	 *     $('.item').addClass('is-active').parent().parent().siblings().children().removeClass('is-active');
	 * } else if (condition2) {
	 *     $('.item').addClass('is-active').next().removeClass('is-active');
	 * } else if (condition3) {
	 *     $('.item').addClass('is-active').prev().removeClass('is-active');
	 * } else {
	 *     $('.item').addClass('is-active').parent().siblings().children().removeClass('is-active');
	 * }
	 *
	 * @param {string} cssClass - The class to be added
	 * @param {Array.<string>} [customPath] - Custom path to adjacent elements
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

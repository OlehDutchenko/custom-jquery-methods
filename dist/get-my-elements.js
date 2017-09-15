'use strict';

/**
 * _Extend jQuery methods_
 * @module
 * @see $.fn.getMyElements
 */

// ----------------------------------------
// Public
// ----------------------------------------

(function (window, $) {
	/**
  * Search on the page or retrieve from the date of the desired item.
  *
  * First, look at the date object on a certain property.
  * If it is empty - look for the element on the specified selector in the given direction.
  * When found, write it in the date object to
  * at subsequent calls - we get from the date, faster and without searching.
  *
  * ___!!! If called element more then one,___
  * ___then the method is performed only for the first___
  *
  * @example <caption>Find / retrieve nested items</caption>
  * let $els = $('.wrapper').getMyElements('$myEls', '.els-selector', 'find');
  *
  * @example <caption>Finding / getting the parent element</caption>
  * let $wrapper = $('.els').getMyElements('$myWrapper', '.wrapper-selector', 'closest');
  *
  * @example <caption>Search / retrieve similar items except for the current one</caption>
  * let $sameEls = $('.els').getMyElements('$mySameEls', '.els', 'document', true);
  *
  * @param {string} dataKey - the property key from the data object of the element
  * @param {Selector} selector - search selector
  * @param {string} [direction="document"] - direction where to look for - `[closest, parent, children, find, prev, next, siblings]`
  * @param {boolean} [notSelf] - ignore the current element, when searching for elements, for example in `document` using the same selector as the current element
  * @return {jQuery.<Element>|undefined}
  * @memberOf $.fn
  * @sourceCode
  */
	$.fn.getMyElements = function (dataKey, selector) {
		var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'document';
		var notSelf = arguments[3];

		var $element = this.eq(0);
		var keyIsSelector = typeof dataKey === 'string';
		var $target = keyIsSelector ? $element.data(dataKey) : undefined;

		if ($target === undefined) {
			if (direction === 'document') {
				$target = $(selector);
				if ($target.length && notSelf) {
					$target = $target.not($element);
				}
			} else {
				$target = $element[direction](selector);
			}
			$element.data(dataKey, $target);
		}

		if (!$target.length) {
			$element.data(dataKey, undefined);
		}

		return $target;
	};
})(window, window.jQuery);
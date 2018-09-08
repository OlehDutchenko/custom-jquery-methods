(function () {
	'use strict';
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
	 * @example <caption>Find / retrieve nested items only in context block</caption>
	 * let $context = $('.demo');
	 * let $els = $('.wrapper').getMyElements('$myEls', '.els-selector', $context);
	 *
	 * @example <caption>Finding / getting the parent element</caption>
	 * let $wrapper = $('.els').getMyElements('$myWrapper', '.wrapper-selector', 'closest');
	 *
	 * @example <caption>Search / retrieve similar items except for the current one</caption>
	 * let $sameEls = $('.els').getMyElements('$mySameEls', '.els', 'document', true);
	 *
	 * @param {string} dataKey - the property key from the data object of the element
	 * @param {JQuery.Selector} selector - search selector
	 * @param {string|JQuery} [direction="document"] - direction where to look for - `[closest, parent, children, find, prev, next, siblings]`, or can be jQuery element for find selector inside
	 * @param {boolean} [notSelf] - ignore the current element, when searching for elements, for example in `document` using the same selector as the current element
	 *
	 * @name getMyElements
	 * @param {string} dataKey
	 * @param {string} selector
	 * @param {string|jQuery} [direction='document']
	 * @param {boolean} [direction='document']
	 * @return {jQuery}
	 * @sourceCode
	 */
	jQuery.fn.getMyElements = function (dataKey, selector, direction = 'document', notSelf) {
		/** @type {jQuery} */
		const $element = this.eq(0);
		const keyIsSelector = (typeof dataKey === 'string');
		let $target = keyIsSelector ? $element.data(dataKey) : null;

		if (!$target) {
			if (direction === 'document' || (direction && direction.jquery)) {
				if (direction.jquery) {
					$target = direction.find(selector);
				} else {
					$target = jQuery(selector);
				}
				if ($target.length && notSelf) {
					$target = $target.not($element);
				}
			} else {
				$target = $element[direction](selector);
			}
			$element.data(dataKey, $target);
		}

		if (!$target.length) {
			$element.data(dataKey, null);
		}

		return $target;
	};
})();

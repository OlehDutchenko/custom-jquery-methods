(function () {
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
  * @name addClassSiblingsRemove
  * @this jQuery
  * @param {string} cssClass - The class to be added
  * @param {string[]} [customPath] - Custom path to adjacent elements
  * @sourceCode
  */

	jQuery.fn.addClassSiblingsRemove = function (cssClass, customPath) {
		return this.each(function (index, el) {
			/** @type {jQuery} */
			var $element = jQuery(el);
			var $siblings = void 0;

			if (Array.isArray(customPath) && customPath.length) {
				$siblings = $element;
				customPath.forEach(function (goTo) {
					$siblings = $siblings[goTo]();
				});
			} else {
				$siblings = $element.siblings();
			}

			$element.addClass(cssClass);
			$siblings.removeClass(cssClass);
		});
	};
})();
(function () {
	'use strict';
	/**
  * Add className if previously was removed.
  * Remove className if previously was added
  *
  * @example
  * function showSection ($section, $frontier) {
  *     const $window = $(window);
  *     let previouslyAdded = $section.hasClass('show'); // <--
  *     $window.on('scroll', () => {
  *         const top = $window.scrollTop();
  *         const height = $frontier.offset().top + $frontier.outerHeight();
  *         previouslyAdded = $section.changeMyClass(top > height, previouslyAdded, 'show');  // <--
  *     });
  * }
  *
  * @name changeMyClass
  * @this jQuery
  * @param {boolean} needToAdd
  * @param {boolean} previouslyAdded
  * @param {string|string[]|function} className
  * @returns {boolean} className was added or not
  * @sourceCode
  */

	jQuery.fn.changeMyClass = function (needToAdd, previouslyAdded, className) {
		var changeClass = needToAdd ? previouslyAdded ? false : 'addClass' : previouslyAdded ? 'removeClass' : false;
		if (changeClass) {
			previouslyAdded = changeClass === 'addClass';
			this[changeClass](className);
		}
		return previouslyAdded;
	};
})();
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

	jQuery.fn.getMyElements = function (dataKey, selector) {
		var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'document';
		var notSelf = arguments[3];

		/** @type {jQuery} */
		var $element = this.eq(0);
		var keyIsSelector = typeof dataKey === 'string';
		var $target = keyIsSelector ? $element.data(dataKey) : null;

		if (!$target) {
			if (direction === 'document' || direction && direction.jquery) {
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
(function () {
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
  * @name hasInitedKey
  * @this jQuery
  * @param {string} key - key name
  * @param {boolean} [setKey=true] - set the key, if not exist
  * @returns {boolean}
  * @sourceCode
  */

	jQuery.fn.hasInitedKey = function (key) {
		var setKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

		var hasKey = !!this.data(key);
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
  * @name removeInitedKey
  * @this jQuery
  * @param {string} key - key name
  * @returns {jQuery}
  * @sourceCode
  */
	jQuery.fn.removeInitedKey = function (key) {
		return this.each(function (index, el) {
			jQuery(el).data(key, null);
		});
	};
})();
(function () {
	'use strict';
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
  * @name nodeName
  * @this jQuery
  * @returns {string}
  * @sourceCode
  */

	jQuery.fn.nodeName = function () {
		return this[0].nodeName.toLowerCase();
	};
})();
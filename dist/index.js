(function () {
	'use strict';

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

	jQuery.fn.changeMyClass = function (needToAdd, previouslyAdded, className, onChange) {
		var changeClass = needToAdd ? previouslyAdded ? false : 'addClass' : previouslyAdded ? 'removeClass' : false;
		if (changeClass) {
			previouslyAdded = changeClass === 'addClass';
			this[changeClass](className);
			if (typeof onChange === 'function') {
				onChange(previouslyAdded);
			}
		}
		return previouslyAdded;
	};
})();
(function () {
	'use strict';

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

	jQuery.fn.hasInitedKey = function (key) {
		var setKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

		var hasKey = !!this.data(key);
		if (hasKey !== true && setKey) {
			this.data(key, true);
		}

		return hasKey;
	};

	jQuery.fn.removeInitedKey = function (key) {
		return this.each(function (index, el) {
			jQuery(el).data(key, null);
		});
	};
})();
(function () {
	'use strict';

	jQuery.fn.nodeName = function () {
		return this[0].nodeName.toLowerCase();
	};
})();
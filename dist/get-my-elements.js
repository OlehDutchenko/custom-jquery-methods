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
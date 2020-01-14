(function () {
	'use strict';

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

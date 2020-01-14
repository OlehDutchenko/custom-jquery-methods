(function () {
	'use strict';

	jQuery.fn.addClassSiblingsRemove = function (cssClass, customPath) {
		return this.each((index, el) => {
			/** @type {jQuery} */
			const $element = jQuery(el);
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
})();

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
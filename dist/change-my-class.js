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
  * @param {function} [onChange]
  * @returns {boolean} className was added or not
  * @sourceCode
  */

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
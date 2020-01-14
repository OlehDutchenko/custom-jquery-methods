(function () {
	'use strict';

	jQuery.fn.changeMyClass = function (needToAdd, previouslyAdded, className, onChange) {
		const changeClass = needToAdd
			? (previouslyAdded ? false : 'addClass')
			: (previouslyAdded ? 'removeClass' : false);
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

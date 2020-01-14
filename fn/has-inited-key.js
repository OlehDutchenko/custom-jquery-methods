(function () {
	'use strict';

	jQuery.fn.hasInitedKey = function (key, setKey = true) {
		const hasKey = !!this.data(key);
		if (hasKey !== true && setKey) {
			this.data(key, true);
		}

		return hasKey;
	};

	jQuery.fn.removeInitedKey = function (key) {
		return this.each((index, el) => {
			jQuery(el).data(key, null);
		});
	};
})();

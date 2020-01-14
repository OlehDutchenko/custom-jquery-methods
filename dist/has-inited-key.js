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
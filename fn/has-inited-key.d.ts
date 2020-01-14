interface JQuery<TElement = HTMLElement> {
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
	 */
	hasInitedKey(key: string, setKey = true): boolean;

	/**
	 * Removing an initialization key in `.data()`
	 *
	 * @example
	 * let initKey = 'my-key';
	 * let $myEl = $('.my-elements');
	 * $myEl.removeInitedKey(initKey);
	 */
	removeInitedKey(key: string): this;
}

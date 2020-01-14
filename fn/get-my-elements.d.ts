interface JQuery<TElement = HTMLElement> {
	/**
	 * Search on the page or retrieve from the date of the desired item.
	 *
	 * First, look at the date object on a certain property.
	 * If it is empty - look for the element on the specified selector in the given direction.
	 * When found, write it in the date object to
	 * at subsequent calls - we get from the date, faster and without searching.
	 *
	 * ___!!! If called element more then one,___
	 * ___then the method is performed only for the first___
	 *
	 * @example <caption>Find / retrieve nested items</caption>
	 * let $els = $('.wrapper').getMyElements('$myEls', '.els-selector', 'find');
	 *
	 * @example <caption>Find / retrieve nested items only in context block</caption>
	 * let $context = $('.demo');
	 * let $els = $('.wrapper').getMyElements('$myEls', '.els-selector', $context);
	 *
	 * @example <caption>Finding / getting the parent element</caption>
	 * let $wrapper = $('.els').getMyElements('$myWrapper', '.wrapper-selector', 'closest');
	 *
	 * @example <caption>Search / retrieve similar items except for the current one</caption>
	 * let $sameEls = $('.els').getMyElements('$mySameEls', '.els', 'document', true);
	 */
	getMyElements(
		dataKey: string,
		selector: string,
		direction?: string = 'document',
		notSelf?: boolean = false
	): JQuery<TElement>;
}

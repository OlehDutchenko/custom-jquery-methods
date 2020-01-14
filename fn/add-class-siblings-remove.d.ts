interface JQuery<TElement = HTMLElement> {
	/**
	 * Adding a class to the current element and deleting from adjacent elements
	 *
	 * @example <caption>On the same level</caption>
	 * $('.item').addClassSiblingsRemove('is-active');
	 *
	 * // it will reproduce
	 * $('.item').addClass('is-active').siblings().removeClass('is-active');
	 *
	 * @example <caption>At the level of the parent elements with <code>customPath</code> parameter</caption>
	 * $('.item').addClassSiblingsRemove('is-active', ['parent', 'siblings', 'children']);
	 *
	 * // it will reproduce
	 * $('.item').addClass('is-active').parent().siblings().children().removeClass('is-active');
	 *
	 *  @example <caption>Also, <code>customPath</code> allows you to use a dynamically calculated path depending on the conditions you need</caption>
	 * let customPath = ['parent', 'siblings', 'children'];
	 * if (condition1) {
	 *     customPath.unshift('parent');
	 * } else if (condition2) {
	 *     customPath = ['next'];
	 * } else if (condition3) {
	 *     customPath = ['prev'];
	 * }
	 * $('.item').addClassSiblingsRemove('is-active', customPath);
	 *
	 * // it will reproduce
	 * if (condition1) {
	 *     $('.item').addClass('is-active').parent().parent().siblings().children().removeClass('is-active');
	 * } else if (condition2) {
	 *     $('.item').addClass('is-active').next().removeClass('is-active');
	 * } else if (condition3) {
	 *     $('.item').addClass('is-active').prev().removeClass('is-active');
	 * } else {
	 *     $('.item').addClass('is-active').parent().siblings().children().removeClass('is-active');
	 * }
	 */
	addClassSiblingsRemove(cssClass: string, customPath?: string[]): this;
}

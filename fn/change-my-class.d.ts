interface JQuery<TElement = HTMLElement> {
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
	 */
	changeMyClass(
		needToAdd: boolean,
		previouslyAdded: boolean,
		className:
			| string
			| string[]
			| ((this: TElement, index: number, currentClassName: string) => string),
		onChange?: (previouslyAdded: boolean) => void
	): boolean;
}

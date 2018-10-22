# custom-jquery-methods

![node](https://img.shields.io/badge/node-6.3.1-yellow.svg)
![es2015](https://img.shields.io/badge/ECMAScript-2015_(ES6)-blue.svg)
[![license](https://img.shields.io/badge/License-MIT-orange.svg)](https://github.com/dutchenkoOleg/custom-jquery-methods/blob/master/LICENSE)
[![npm](https://img.shields.io/badge/npm-install-orange.svg)](https://www.npmjs.com/package/custom-jquery-methods)
[![Build Status](https://travis-ci.org/dutchenkoOleg/custom-jquery-methods.svg?branch=master)](https://travis-ci.org/dutchenkoOleg/custom-jquery-methods)

 
:us: English
|
:ru: [Русский язык](https://github.com/dutchenkoOleg/custom-jquery-methods/blob/master/README-RU.md)

> _Custom jQuery methods ($.fn)_

[![js happiness style](https://cdn.rawgit.com/JedWatson/happiness/master/badge.svg)](https://github.com/JedWatson/happiness)

Basically, methods are intended for use with the `webpack` bundler system, there is also the ability to connect methods via direct links in browser or download them (see description of each method)

## Installations

```shell
npm i --save custom-jquery-methods
# or using yarn cli
yarn add custom-jquery-methods
```

## Methods

methods list

- [`$.fn.nodeName()`](#fnnodename-)
- [`$.fn.addClassSiblingsRemove()`](#fnaddclasssiblingsremove-cssclass--custompath)
- [`$.fn.changeMyClass()`](#fnchangemyclass)
- [`$.fn.getMyElements()`](#fngetmyelements-datakey-selector--direction-notself)
- [`$.fn.hasInitedKey()`](#fnhasinitedkey-key--setkey)
- [`$.fn.removeInitedKey()`](#fnremoveinitedkey-key)

You can include all methods by one file

#### nodejs:

```js
// es6
import 'custom-jquery-methods';
// or minimised version
import 'custom-jquery-methods/fn/index.min';

// es5
require('custom-jquery-methods');
// or minimised version
require('custom-jquery-methods/dist/index.min');
```

#### browser / download:

- [https://unpkg.com/custom-jquery-methods@latest/dist/index.js](https://unpkg.com/custom-jquery-methods@latest/dist/index.js)
- [https://unpkg.com/custom-jquery-methods@latest/dist/index.min.js](https://unpkg.com/custom-jquery-methods@latest/dist/index.min.js)

---

### $.fn.nodeName ()

[↑ methods list](#methods)

Returns `nodeName` property of DOM element  in lowercase.  
Useful when you can get unknown elements.

###### Examples:

```js
function myFunction ($el) {
    switch ($el.nodeName()) {
        case 'img':
            // ...
            break;
        case 'div':
            // ...
            break;
        case 'input':
            // ...
            break;
        default:
            // ...
    }
}
```

#### nodejs:

```js
// es6
import 'custom-jquery-methods/fn/node-name';
// or minimised version
import 'custom-jquery-methods/fn/node-name.min';

// es5
require('custom-jquery-methods/dist/node-name');
// or minimised version
require('custom-jquery-methods/dist/node-name.min');
```

#### browser / download:

- [https://unpkg.com/custom-jquery-methods@latest/dist/node-name.js](https://unpkg.com/custom-jquery-methods@latest/dist/node-name.js)
- [https://unpkg.com/custom-jquery-methods@latest/dist/node-name.min.js](https://unpkg.com/custom-jquery-methods@latest/dist/node-name.min.js)

---

### $.fn.addClassSiblingsRemove (cssClass _[, customPath]_)

[↑ methods list](#methods)

Adding a class to the current element and deleting from adjacent elements

###### Parameters:

Name | Type | Attributes | Description
--- | --- | --- | ---
`cssClass` | `string` | | The class to be added
`customPath` | `string[]` | `<optional>` | Custom path to adjacent elements

###### Examples:

_example 1._ On the same level

```js
$('.item').addClassSiblingsRemove('is-active');

// it will reproduce
$('.item').addClass('is-active').siblings().removeClass('is-active');
```

_example 2._ At the level of the parent elements with `customPath` parameter

```js
$('.item').addClassSiblingsRemove('is-active', ['parent', 'siblings', 'children']);

// it will reproduce
$('.item').addClass('is-active').parent().siblings().children().removeClass('is-active');
```

_example 3._ Also, `customPath` allows you to use a dynamically calculated path depending on the conditions you need

```js
let customPath = ['parent', 'siblings', 'children'];
if (condition1) {
    customPath.unshift('parent');
} else if (condition2) {
    customPath = ['next'];
} else if (condition3) {
    customPath = ['prev'];
}
$('.item').addClassSiblingsRemove('is-active', customPath);

// it will reproduce
if (condition1) {
    $('.item').addClass('is-active').parent().parent().siblings().children().removeClass('is-active');
} else if (condition2) {
    $('.item').addClass('is-active').next().removeClass('is-active');
} else if (condition3) {
    $('.item').addClass('is-active').prev().removeClass('is-active');
} else {
    $('.item').addClass('is-active').parent().siblings().children().removeClass('is-active');
}
```

#### nodejs:

```js
// es6
import 'custom-jquery-methods/fn/add-class-siblings-remove';
// or minimised version
import 'custom-jquery-methods/fn/add-class-siblings-remove.min';

// es5
require('custom-jquery-methods/dist/add-class-siblings-remove');
// or minimised version
require('custom-jquery-methods/dist/add-class-siblings-remove.min');
```

#### browser / download:

- [https://unpkg.com/custom-jquery-methods@latest/dist/add-class-siblings-remove.js](https://unpkg.com/custom-jquery-methods@latest/dist/add-class-siblings-remove.js)
- [https://unpkg.com/custom-jquery-methods@latest/dist/add-class-siblings-remove.min.js](https://unpkg.com/custom-jquery-methods@latest/dist/add-class-siblings-remove.min.js)

---

### $.fn.changeMyClass (condition, previouslyAdded, className)

[↑ methods list](#methods)

Add `className` if previously was removed,  
remove `className` if previously was added.


Returns `boolean` - className was added or not!

###### Parameters:

Name | Type | Attributes | Description
--- | --- | --- | ---
`needToAdd` | `boolean` | | add className ?
`previouslyAdded` | `boolean` | | was className previously added or not 
`className` | `string / string[] / function` | | see [api.jquery.com/addClass](http://api.jquery.com/addClass/) and [api.jquery.com/removeClass](http://api.jquery.com/removeClass/)

###### Usage example:

```js
/**
 * @param {jQuery} $section
 * @param {jQuery} $frontier
 */
function showSection ($section, $frontier) {
    const $window = $(window);
    let previouslyAdded = $section.hasClass('show'); // <--
    $window.on('scroll', () => {
        const top = $window.scrollTop();
        const height = $frontier.offset().top + $frontier.outerHeight();
        previouslyAdded = $section.changeMyClass(top > height, previouslyAdded, 'show');  // <--
    });
}
```

#### nodejs:

```js
// es6
import 'custom-jquery-methods/fn/change-my-class';
// or minimised version
import 'custom-jquery-methods/fn/change-my-class.min';

// es5
require('custom-jquery-methods/dist/change-my-class');
// or minimised version
require('custom-jquery-methods/dist/change-my-class.min');
```

#### browser / download:

- [https://unpkg.com/custom-jquery-methods@latest/dist/change-my-class.js](https://unpkg.com/custom-jquery-methods@latest/dist/change-my-class.js)
- [https://unpkg.com/custom-jquery-methods@latest/dist/change-my-class.min.js](https://unpkg.com/custom-jquery-methods@latest/dist/change-my-class.min.js)





---

### $.fn.getMyElements (dataKey, selector _[, direction][, notSelf]_)

[↑ methods list](#methods)

Search on the page or retrieve from the data of the desired item.

First, look at the data object on a certain property.  
If it is empty - look for the element on the specified selector in the given direction.
When found, write it in the data object to
at subsequent calls - we get from the data, faster and without searching.

___!!! If called element more then one,___  
___then the method is performed only for the first___

###### Parameters:

Name | Type | Attributes | Default | Description
--- | --- | --- | --- | ---
`dataKey` | `string` | | | the property key from the data object of the element
`selector` | `JQuery.Selector` | | | search selector
`direction` | `string/JQuery` | `<optional>` | `"document"` | direction where to look for - `[closest, parent, children, find, prev, next, siblings]`, or can be jQuery element for find selector inside
`notSelf` | `boolean` | `<optional>` |  | ignore the current element, when searching for elements, for example in `document` using the same selector as the current element

###### Returns:

`jQuery.<Element> | undefined`

###### Examples:

_example 1._ Find / retrieve nested items

```js
let $els = $('.wrapper').getMyElements('$myEls', '.els-selector', 'find');
```

_example 2._ Find / retrieve nested items only in context block

```js
let $context = $('.demo');
let $els = $('.wrapper').getMyElements('$myEls', '.els-selector', $context);
```
	 
_example 3._ Finding / getting the parent element

```js
let $wrapper = $('.els').getMyElements('$myWrapper', '.wrapper-selector', 'closest');
```

_example 4._ Search / retrieve similar items except for the current one

```js
let $sameEls = $('.els').getMyElements('$mySameEls', '.els', 'document', true);
```

#### nodejs:

```js
// es6
import 'custom-jquery-methods/fn/get-my-elements';
// or minimised version
import 'custom-jquery-methods/fn/get-my-elements.min';

// es5
require('custom-jquery-methods/dist/get-my-elements');
// or minimised version
require('custom-jquery-methods/dist/get-my-elements.min');
```

#### browser / download:

- [https://unpkg.com/custom-jquery-methods@latest/dist/get-my-elements.js](https://unpkg.com/custom-jquery-methods@latest/dist/get-my-elements.js)
- [https://unpkg.com/custom-jquery-methods@latest/dist/get-my-elements.min.js](https://unpkg.com/custom-jquery-methods@latest/dist/get-my-elements.min.js)





---

### $.fn.hasInitedKey (key _[, setKey]_)

[↑ methods list](#methods)

Check for the existence of an initialization key in `.data()`.

###### Parameters:

Name | Type | Attributes | Default | Description
--- | --- | --- | --- | ---
`key` | `string` | | | key name
`setKey` | `boolean` | `<optional>` | `true` | set the key, if not exist

###### Returns:

`boolean`

###### Examples:

_example 1._ Check in cycle `.each()`

```js
let initKey = 'my-key';
$('.my-elements').each((i, el) => {
    let $element = $(el);
    if ($element.hasInitedKey(initKey)) {
        return true;
    }
    // process current element
});
```

_example 2._ Check for single element

```js
let initKey = 'my-key';
let $myEl = $('.my-elements');
if (!$myEl.hasInitedKey(initKey)) {
    // process current element
}
```

#### nodejs:

```js
// es6
import 'custom-jquery-methods/fn/has-inited-key';
// or minimised version
import 'custom-jquery-methods/fn/has-inited-key.min';

// es5
require('custom-jquery-methods/dist/has-inited-key');
// or minimised version
require('custom-jquery-methods/dist/has-inited-key.min');
```

#### browser / download:

- [https://unpkg.com/custom-jquery-methods@latest/dist/has-inited-key.js](https://unpkg.com/custom-jquery-methods@latest/dist/has-inited-key.js)
- [https://unpkg.com/custom-jquery-methods@latest/dist/has-inited-key.min.js](https://unpkg.com/custom-jquery-methods@latest/dist/has-inited-key.min.js)





---

### $.fn.removeInitedKey (key)

[↑ methods list](#methods)

Removing an initialization key in `.data()`.
The method is the inverse action for [$.fn.hasInitedKey](#fnhasinitedkey-key--setkey)

###### Parameters:

Name | Type | Attributes | Default | Description
--- | --- | --- | --- | ---
`key` | `string` | | | имя ключа

###### Returns:

`jQuery.<Element>` - this

###### Examples:

```js
let initKey = 'my-key';
let $myEl = $('.my-elements');
$myEl.removeInitedKey(initKey);
```

#### nodejs /  browser / download:

The method is described in the same file as [$.fn.hasInitedKey](#fnhasinitedkey-key--setkey), accordingly, you get both methods.

---

## Project Info

* [Change log](https://github.com/dutchenkoOleg/custom-jquery-methods/blob/master/CHANGELOG.md)
* [Contributing Guidelines](https://github.com/dutchenkoOleg/custom-jquery-methods/blob/master/CONTRIBUTING.md)
* [Contributor Covenant Code of Conduct](https://github.com/dutchenkoOleg/custom-jquery-methods/blob/master/CODE_OF_CONDUCT.md)
* [License MIT](https://github.com/dutchenkoOleg/custom-jquery-methods/blob/master/LICENSE)

# custom-jquery-methods

![npm](https://img.shields.io/badge/node-6.3.1-yellow.svg)
![es2015](https://img.shields.io/badge/ECMAScript-2015_(ES6)-blue.svg)
![license](https://img.shields.io/badge/License-MIT-orange.svg)
[![Build Status](https://travis-ci.org/dutchenkoOleg/custom-jquery-methods.svg?branch=master)](https://travis-ci.org/dutchenkoOleg/custom-jquery-methods)

 
:us: English
|
:ru: [Русский язык](https://github.com/dutchenkoOleg/custom-jquery-methods/blob/master/README-RU.md)

> _Custom jQuery methods ($.fn)_

[![js happiness style](https://cdn.rawgit.com/JedWatson/happiness/master/badge.svg)](https://github.com/JedWatson/happiness)

Basically, they are intended for use with the `webpack` bundler system, there is also the ability to connect methods via direct links in browser or download them (see description of each method)

## Installations

```shell
npm i --save custom-jquery-methods
# or using yarn cli
yarn add custom-jquery-methods
```

## Methods

methods list

- [$.fn.addClassSiblingsRemove](#fnaddclasssiblingsremove-cssclass--custompath)
- [$.fn.getMyElements](#fngetmyelements-datakey-selector--direction-notself)
- [$.fn.hasInitedKey](#fnhasinitedkey-key--setkey)
- [$.fn.removeInitedKey](#fnremoveinitedkey-key)

---

### $.fn.addClassSiblingsRemove (cssClass _[, customPath]_)

[↑ methods list](#methods)

Adding a class to the current element and deleting from adjacent elements

###### Parameters:

Name | Type | Attributes | Description
--- | --- | --- | ---
`cssClass` | `string` | | The class to be added
`customPath` | `Array.<string>` | `<optional>` | Custom path to adjacent elements

###### Examples:

_example 1._ On the same level

```js
$('.item').addClassSiblingsRemove('is-active');
```

_example 2._ At the level of the parent elements

```js
$('.item').addClassSiblingsRemove('is-active', ['parent', 'siblings', 'children']);
```

#### nodejs:

```js
// es6
import 'custom-jquery-methods/fn/add-class-siblings-remove';

// es5
require('custom-jquery-methods/dist/add-class-siblings-remove');
// or minimised version
require('custom-jquery-methods/dist/add-class-siblings-remove.min');
```

#### browser / download:

- [https://unpkg.com/custom-jquery-methods@latest/fn/add-class-siblings-remove.js](https://unpkg.com/custom-jquery-methods@latest/fn/add-class-siblings-remove.js)
- [https://unpkg.com/custom-jquery-methods@latest/dist/add-class-siblings-remove.js](https://unpkg.com/custom-jquery-methods@latest/dist/add-class-siblings-remove.js)
- [https://unpkg.com/custom-jquery-methods@latest/dist/add-class-siblings-remove.min.js](https://unpkg.com/custom-jquery-methods@latest/dist/add-class-siblings-remove.min.js)





---

### $.fn.getMyElements (dataKey, selector _[, direction][, notSelf]_)

[↑ methods list](#methods)

Search on the page or retrieve from the date of the desired item.

First, look at the date object on a certain property.  
If it is empty - look for the element on the specified selector in the given direction.
When found, write it in the date object to
at subsequent calls - we get from the date, faster and without searching.

___!!! If called element more then one,___  
___then the method is performed only for the first___

###### Parameters:

Name | Type | Attributes | Default | Description
--- | --- | --- | --- | ---
`dataKey` | `string` | | | the property key from the data object of the element
`selector` | `jQuery.<Selector>` | | | search selector
`direction` | `string` | `<optional>` | `"document"` | direction where to look for - `[closest, parent, children, find, prev, next, siblings]`
`notSelf` | `boolean` | `<optional>` |  | ignore the current element, when searching for elements, for example in `document` using the same selector as the current element

###### Returns:

`jQuery.<Element> | undefined`

###### Examples:

_example 1._ Find / retrieve nested items

```js
let $els = $('.wrapper').getMyElements('$myEls', '.els-selector', 'find');
```

_example 2._ Finding / getting the parent element

```js
let $wrapper = $('.els').getMyElements('$myWrapper', '.wrapper-selector', 'closest');
```

_example 3._ Search / retrieve similar items except for the current one

```js
let $sameEls = $('.els').getMyElements('$mySameEls', '.els', 'document', true);
```

#### nodejs:

```js
// es6
import 'custom-jquery-methods/fn/get-my-elements';

// es5
require('custom-jquery-methods/dist/get-my-elements');
// or minimised version
require('custom-jquery-methods/dist/get-my-elements.min');
```

#### browser / download:

- [https://unpkg.com/custom-jquery-methods@latest/fn/get-my-elements.js](https://unpkg.com/custom-jquery-methods@latest/fn/get-my-elements.js)
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

// es5
require('custom-jquery-methods/dist/has-inited-key');
// or minimised version
require('custom-jquery-methods/dist/has-inited-key.min');
```

#### browser / download:

- [https://unpkg.com/custom-jquery-methods@latest/fn/has-inited-key.js](https://unpkg.com/custom-jquery-methods@latest/fn/has-inited-key.js)
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
# custom-jquery-methods

![npm](https://img.shields.io/badge/node-6.3.1-yellow.svg)
![es2015](https://img.shields.io/badge/ECMAScript-2015_(ES6)-blue.svg)
![license](https://img.shields.io/badge/License-MIT-orange.svg)
[![Build Status](https://travis-ci.org/dutchenkoOleg/custom-jquery-methods.svg?branch=master)](https://travis-ci.org/dutchenkoOleg/custom-jquery-methods)


:us: [English](./README.md)
|
:ru: Русский язык

> _Пользовательские jQuery методы_

[![js happiness style](https://cdn.rawgit.com/JedWatson/happiness/master/badge.svg)](https://github.com/JedWatson/happiness)

В основном, методы предназначены для использования с системой сборки `webpack`, также есть возможность подключать методы по прямым ссылкам в браузере или скачать их (смотрите описание каждого из методов)

## Установка

```shell
npm i --save custom-jquery-methods
# or using yarn cli
yarn add custom-jquery-methods
```

## Методы

Список методов

- [$.fn.nodeName](#fnnodename-)
- [$.fn.addClassSiblingsRemove](#fnaddclasssiblingsremove-cssclass--custompath)
- [$.fn.getMyElements](#fngetmyelements-datakey-selector--direction-notself)
- [$.fn.hasInitedKey](#fnhasinitedkey-key--setkey)
- [$.fn.removeInitedKey](#fnremoveinitedkey-key)

---

### $.fn.nodeName ()

[↑ Список методов](#Методы)

Возвращает свойство `nodeName` DOM элемента в нижнем регистре.  
Полезно, когда вы можете получить неизвестные элементы.

###### Примеры:

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
import 'custom-jquery-methods/dist/node-name';

// es5
require('custom-jquery-methods/dist/node-name');
// or minimised version
require('custom-jquery-methods/dist/node-name.min');
```

#### browser / download:

- [https://unpkg.com/custom-jquery-methods@latest/fn/node-name.js](https://unpkg.com/custom-jquery-methods@latest/fn/node-name.js)
- [https://unpkg.com/custom-jquery-methods@latest/dist/node-name.js](https://unpkg.com/custom-jquery-methods@latest/dist/node-name.js)
- [https://unpkg.com/custom-jquery-methods@latest/dist/node-name.min.js](https://unpkg.com/custom-jquery-methods@latest/dist/node-name.min.js)

---

### $.fn.addClassSiblingsRemove (cssClass _[, customPath]_)

[↑ Список методов](#Методы)

Добавление класса текущему элементу и удаление у смежных элементов

###### Параметры:

Name | Type | Attributes | Description
--- | --- | --- | ---
`cssClass` | `string` | | Класс который будет добавлен
`customPath` | `Array.<string>` | `<optional>` | Пользовательский путь к смежным элементам

###### Примеры:

_example 1._ На одном уровне

```js
$('.item').addClassSiblingsRemove('is-active');

// воспроизводить тоже что и 
$('.item').addClass('is-active').siblings().removeClass('is-active');
```

_example 2._ На уровне родительских элементов c параметров `customPath`

```js
$('.item').addClassSiblingsRemove('is-active', ['parent', 'siblings', 'children']);

// воспроизводить тоже что и 
$('.item').addClass('is-active').parent().siblings().children().removeClass('is-active');
```

_example 3._ Также, `customPath` Позволяет использовать вычесленные значения в зависимости от ситуации и условий, которые могут быть нужны

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

// воспроизводить тоже что и 
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
import 'custom-jquery-methods/dist/add-class-siblings-remove';

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

[↑ Список методов](#Методы)

Поиск на странице или получение с даты нужного элемента.

Сперва, смотрим в дата объект на определенное свойство.  
Если здесь пусто - ищем элемент по указанному селектору в заданом направлении.  
При нахождении, записываем его в дата объект, чтобы при последующих обращениях - получием с даты, быстрее и без поисков.

___!!! Если в обращении элементов большего одного,___  
___то метод выполняется только для первого___

###### Параметры:

Name | Type | Attributes | Default | Description
--- | --- | --- | --- | ---
`dataKey` | `string` | | | ключ свойства из data объекта элемента
`selector` | `jQuery.<Selector>` | | | селектор поиска
`direction` | `string` | `<optional>` | `"document"` | направление где искать - `[closest, parent, children, find, prev, next, siblings]`
`notSelf` | `boolean` | `<optional>` |  | позволяет не учитывать себя (текущий `this`) при поиске элементов, к примеру в `document` по такому же селектору, как у текущего элемента

###### Возвращает:

`jQuery.<Element> | undefined`

###### Примеры:

_example 1._ Поиск / получение вложенных элементов

```js
let $els = $('.wrapper').getMyElements('$myEls', '.els-selector', 'find');
```

_example 2._ Поиск / получение родительского элемента

```js
let $wrapper = $('.els').getMyElements('$myWrapper', '.wrapper-selector', 'closest');
```

_example 3._ Поиск / получение похожих элементов за исключением текущего

```js
let $sameEls = $('.els').getMyElements('$mySameEls', '.els', 'document', true);
```

#### nodejs:

```js
// es6
import 'custom-jquery-methods/dist/get-my-elements';

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

[↑ Список методов](#Методы)

Проверка на существование ключа инициализации в `.data()`.

###### Параметры:

Name | Type | Attributes | Default | Description
--- | --- | --- | --- | ---
`key` | `string` | | | имя ключа
`setKey` | `boolean` | `<optional>` | `true` | установить ключ, если не было

###### Возвращает:

`boolean`

###### Примеры:

_example 1._ Проверка в цикле `.each()`

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

_example 2._ Проверка для одного элемента

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
import 'custom-jquery-methods/dist/has-inited-key';

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

[↑ Список методов](#Методы)

Удаление ключа инициализации в `.data()`.
Метод является обратным действием для [$.fn.hasInitedKey](#fnhasinitedkey-key--setkey)

###### Параметры:

Name | Type | Attributes | Default | Description
--- | --- | --- | --- | ---
`key` | `string` | | | имя ключа

###### Возвращает:

`jQuery.<Element>` - this

###### Примеры:

```js
let initKey = 'my-key';
let $myEl = $('.my-elements');
$myEl.removeInitedKey(initKey);
```

#### nodejs /  browser / download:

Метод описан в том же файле что и [$.fn.hasInitedKey](#fnhasinitedkey-key--setkey), соответственно, при подключении Вы получаете оба метода.




---

## Информация о проекте

* [История изменений](./CHANGELOG-RU.md)
* [Руководство по содействию проекту](./CONTRIBUTING-RU.md)
* [Кодекс поведения](./CODE_OF_CONDUCT-RU.md)
* [Лицензия MIT](./LICENSE)

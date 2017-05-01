# 🦉 Bubo

![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg?style=flat-square)
[![Npm Version](https://img.shields.io/npm/v/bubo.svg?style=flat-square)](https://www.npmjs.com/package/bubo)
[![Build Status](https://img.shields.io/travis/epicagency/bubo/master.svg?style=flat-square)](https://travis-ci.org/epicagency/bubo)
[![Coverage Status](https://img.shields.io/coveralls/epicagency/bubo/master.svg?style=flat-square)](https://coveralls.io/github/epicagency/bubo?branch=master)

Form validation made simple (wip)

## Installation

```sh
npm i -S bubo
```

## Usage

```js
import Bubo from 'bubo';

const form = document.querySelector('.my-form');
const buboForm = new Bubo(form);

buboForm.validate();
```

## How it works

Bubo form validation is (mainly) based on HTML5 form markup:

- supported attributes are: `required`, `min`, `max`, `minlength`, `maxlength`, `pattern`
- supported types are: `date`, `email`, `number`, `tel`, `url`

## Errors handling

---

## Documentation

### constructor

#### `new Bubo(HTMLFormElement)`

Returns a Bubo instance

### methods

#### `.validate()`

Validate the form.
You can access `status`, `text` and `errors` properties…

#### `.reset()`

Useful when the form content change.
Re-initialize Bubo's validation rules.

#### `.destroy()`

Self-explained method…

### properties

#### `.errors`

Type: `Object`

> `inputNameAttribute: [arrayOfErrors]`

#### `.status`

Type: `String`

> success or error

#### `.text`

Type: `String`

> "status text" aka global message for success/error

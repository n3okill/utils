# Utils

Typescript Utilities library

---

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/3651240eb02346f3ba660c225498ce20)](https://www.codacy.com/gh/n3okill/utils/dashboard?utm_source=github.com&utm_medium=referral&utm_content=n3okill/utils&utm_campaign=Badge_Grade) ![Test Status](https://github.com/n3okill/utils/actions/workflows/test.yml/badge.svg)

---

## Description

Utils is intended to make development of NodeJs apps faster & easier by defining various methods to work with arrays, string, objects, among others.

The functions in this library are expected to be static for the forseable future, only having improvements but never changing input parameters, return values or types.

## Usage

Install the package

```js
npm install @n3okill/utils
```

There's multiple ways to use the library:

```js
import * as Util from "@n3okill/utils";
```

or

```js
import { Type, ArrayUtil } from "@n3okill/utils";
```

## Runing tests

-   `npm run lint`: runs the linter
-   `npm run unit`: run unit tests
-   `npm test`: run both lint and unit tests

## Contribute

If you find a problem with the package you can

-   [Submit a Bug](https://github.com/n3okill/utils/issues)

or even make a

-   [Pull request](https://github.com/n3okill/utils/pulls)

### Proposing a new helper

If you wan't to propose a new helper, following this steps would be much apreciated:

-   Develop the new helper, with clean and readable code
-   Develop tests for the new helper
-   Include in the comments a description of what the helper does, the input arguments and what it returns

## Documentation

This package is divided into modules, and there's no access to individual functions.

-   [ArrayUtil](docs/modules/ArrayUtil.md) - Array Utilities
-   [BufferUtil](docs/modules/BufferUtil.md) - Buffer Utilities
-   [Configuration](docs/modules/Configuration.md) - Objects and strings related utilities
-   [Mixers](docs/modules/Mixers.md) - Object cloning and filling Utilities
-   [NumberUtil](docs/modules/NumberUtil.md) - Number Utilities
-   [ObjectUtil](docs/modules/ObjectUtil.md) - Object Utilities, like clone among other's
-   [Other](docs/modules/Other.md) - Other cloning types utilities
-   [Security](docs/modules/Security.md) - Basic security related Utilities
-   [StringUtil](docs/modules/StringUtil.md) - String Utilities
-   [Type](docs/modules/Type.md) - Many type utilities

## Examples

Just check the tests folder

## Why this module

There are many other utilities packages out there that can do some or most of the things that this package can, and the problem is mainly that, there are many packages and some of them with many dependencies, this package was built to don't have any dependencies, excluding dev dependencies, and it's expectable to don't have any dependencies in the future, unless it's a very simple dependency with none dependencies (excluding dev).

This is a very opinionated package but there's no reason to exclude any improvements or adding new helpers.

## License

MIT License

Copyright (c) 2016 - 2021 Joao Parreira [joaofrparreira@gmail.com](mailto:joaofrparreira@gmail.com)

[myhelpers](../README.md) / Type

# Namespace: Type

## Table of contents

### Enumerations

- [EnumTypes](../enums/Type.EnumTypes.md)

### Type aliases

- [TObject](Type.md#tobject)
- [TObjectKey](Type.md#tobjectkey)
- [TypedArray](Type.md#typedarray)
- [TypedArrayConstructor](Type.md#typedarrayconstructor)

### Functions

- [getContentType](Type.md#getcontenttype)
- [getEnumType](Type.md#getenumtype)
- [is](Type.md#is)
- [isAlphaSequence](Type.md#isalphasequence)
- [isArray](Type.md#isarray)
- [isArrayType](Type.md#isarraytype)
- [isAsyncFunction](Type.md#isasyncfunction)
- [isAsyncIterable](Type.md#isasynciterable)
- [isBlob](Type.md#isblob)
- [isBoolean](Type.md#isboolean)
- [isBuffer](Type.md#isbuffer)
- [isDate](Type.md#isdate)
- [isEmailFormat](Type.md#isemailformat)
- [isEmpty](Type.md#isempty)
- [isError](Type.md#iserror)
- [isFloat32Array](Type.md#isfloat32array)
- [isFloat64Array](Type.md#isfloat64array)
- [isFunction](Type.md#isfunction)
- [isFunctionType](Type.md#isfunctiontype)
- [isInt16Array](Type.md#isint16array)
- [isInt32Array](Type.md#isint32array)
- [isInt8Array](Type.md#isint8array)
- [isInteger](Type.md#isinteger)
- [isIterable](Type.md#isiterable)
- [isKind](Type.md#iskind)
- [isKindEqual](Type.md#iskindequal)
- [isMap](Type.md#ismap)
- [isNull](Type.md#isnull)
- [isNullOrUndefined](Type.md#isnullorundefined)
- [isNumber](Type.md#isnumber)
- [isNumeric](Type.md#isnumeric)
- [isNumericSequence](Type.md#isnumericsequence)
- [isObject](Type.md#isobject)
- [isPlainObject](Type.md#isplainobject)
- [isPrimitive](Type.md#isprimitive)
- [isPromise](Type.md#ispromise)
- [isRegExp](Type.md#isregexp)
- [isSequence](Type.md#issequence)
- [isSet](Type.md#isset)
- [isString](Type.md#isstring)
- [isSymbol](Type.md#issymbol)
- [isTypedArray](Type.md#istypedarray)
- [isUint16Array](Type.md#isuint16array)
- [isUint32Array](Type.md#isuint32array)
- [isUint8Array](Type.md#isuint8array)
- [isUint8ClampedArray](Type.md#isuint8clampedarray)
- [isUndefined](Type.md#isundefined)
- [isUrlRelative](Type.md#isurlrelative)
- [kindOf](Type.md#kindof)

## Type aliases

### TObject

Ƭ **TObject**: `Record`<[`TObjectKey`](Type.md#tobjectkey), `unknown`\>

___

### TObjectKey

Ƭ **TObjectKey**: `string` \| `symbol` \| `number`

___

### TypedArray

Ƭ **TypedArray**: `Int8Array` \| `Uint8Array` \| `Uint8ClampedArray` \| `Int16Array` \| `Uint16Array` \| `Int32Array` \| `Uint32Array` \| `Float32Array` \| `Float64Array`

TypedArray Types

___

### TypedArrayConstructor

Ƭ **TypedArrayConstructor**: `Int8ArrayConstructor` \| `Uint8ArrayConstructor` \| `Uint8ClampedArrayConstructor` \| `Int16ArrayConstructor` \| `Uint16ArrayConstructor` \| `Int32ArrayConstructor` \| `Uint32ArrayConstructor` \| `Float32ArrayConstructor` \| `Float64ArrayConstructor`

## Functions

### getContentType

▸ **getContentType**(`ext`): `string`

Return content type from extension

#### Parameters

| Name | Type |
| :------ | :------ |
| `ext` | `string` |

#### Returns

`string`

___

### getEnumType

▸ **getEnumType**(`arg`): [`EnumTypes`](../enums/Type.EnumTypes.md)

Return the Enum value of the type of the argument

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

[`EnumTypes`](../enums/Type.EnumTypes.md)

___

### is

▸ **is**(`arg1`, `arg2`): `boolean`

Check if to arguments are equal "==="

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg1` | `unknown` |
| `arg2` | `unknown` |

#### Returns

`boolean`

___

### isAlphaSequence

▸ **isAlphaSequence**(`arg`, `regex?`): `boolean`

Check if argument is a alpha sequence of type a..z or as defined by regex argument

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |
| `regex?` | `RegExp` |

#### Returns

`boolean`

___

### isArray

▸ **isArray**(`arg`): `boolean`

Check if argument is an array

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isArrayType

▸ **isArrayType**(`arg`): `boolean`

Check if argument is Array or TypedArray

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isAsyncFunction

▸ **isAsyncFunction**(`arg`): `boolean`

Check if argument is AsyncFunction

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isAsyncIterable

▸ **isAsyncIterable**(`arg`): `boolean`

Check if argument is AsyncIterable

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isBlob

▸ **isBlob**(`arg`): `boolean`

Check if argument is a blob

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isBoolean

▸ **isBoolean**(`arg`): `boolean`

Check if argument is Boolean

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isBuffer

▸ **isBuffer**(`arg`): `boolean`

Check if argument is Buffer

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isDate

▸ **isDate**(`arg`): `boolean`

Check if argument is Date

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isEmailFormat

▸ **isEmailFormat**(`arg`, `matches?`): `boolean` \| ``null`` \| `string`[]

Simple check if argument is in e-mail format

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `arg` | `string` | `undefined` |
| `matches` | `boolean` | `false` |

#### Returns

`boolean` \| ``null`` \| `string`[]

___

### isEmpty

▸ **isEmpty**(`arg`): `boolean`

Check if argument is empty

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isError

▸ **isError**(`arg`): `boolean`

Check if argument is Error

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isFloat32Array

▸ **isFloat32Array**(`arg`): `boolean`

Check if argument is Float32Array

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isFloat64Array

▸ **isFloat64Array**(`arg`): `boolean`

Check if argument is Float64Array

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isFunction

▸ **isFunction**(`arg`): `boolean`

Check if argument is function

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isFunctionType

▸ **isFunctionType**(`arg`): `boolean`

Check if argument is Function or AsyncFunction

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isInt16Array

▸ **isInt16Array**(`arg`): `boolean`

Check if argument is Int16Array

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isInt32Array

▸ **isInt32Array**(`arg`): `boolean`

Check if argument is Int32Array

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isInt8Array

▸ **isInt8Array**(`arg`): `boolean`

Check if argument is Int8Array

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isInteger

▸ **isInteger**(`arg`): `boolean`

Check if argument is Integer

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isIterable

▸ **isIterable**(`arg`): `boolean`

Check if argument is Iterable

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isKind

▸ **isKind**(`arg`, `kind`): `boolean`

Check if argument is of the kind

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `unknown` |  |
| `kind` | `string` | Kind to match the type |

#### Returns

`boolean`

___

### isKindEqual

▸ **isKindEqual**(`arg1`, `arg2`): `boolean`

Check if two arguments are of same type

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg1` | `unknown` |
| `arg2` | `unknown` |

#### Returns

`boolean`

___

### isMap

▸ **isMap**(`arg`): `boolean`

Check if argument is Map

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isNull

▸ **isNull**(`arg`): `boolean`

Check if argument is null

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isNullOrUndefined

▸ **isNullOrUndefined**(`arg`): `boolean`

Check if argument is null or undefined

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isNumber

▸ **isNumber**(`arg`): `boolean`

Check if argument is Number

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isNumeric

▸ **isNumeric**(`arg`): `boolean`

Check if argument is numeric type, check if is number or a string that can be converted into number

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isNumericSequence

▸ **isNumericSequence**(`arg`, `regex?`): `boolean`

Check if argument is a numeric sequence of type 1..5 or as defined by regex argument

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |
| `regex?` | `RegExp` |

#### Returns

`boolean`

___

### isObject

▸ **isObject**(`arg`): `boolean`

Check if argument is Object

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isPlainObject

▸ **isPlainObject**(`arg`): `boolean`

Check if argument is a plain object

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isPrimitive

▸ **isPrimitive**(`arg`): `boolean`

Check if argument is of primitive type

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isPromise

▸ **isPromise**(`arg`): `boolean`

Check if argument is a Promise

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isRegExp

▸ **isRegExp**(`arg`): `boolean`

Check if argument is RegExp

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isSequence

▸ **isSequence**(`arg`, `regex`): `boolean`

Check if argument is a sequence based on given regexp

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |
| `regex` | `RegExp` |

#### Returns

`boolean`

___

### isSet

▸ **isSet**(`arg`): `boolean`

Check if argument is Set

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isString

▸ **isString**(`arg`): `boolean`

Check if argument is String

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isSymbol

▸ **isSymbol**(`arg`): `boolean`

Check if argument is Symbol

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isTypedArray

▸ **isTypedArray**(`arg`): `boolean`

Check if argument is TypedArray

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isUint16Array

▸ **isUint16Array**(`arg`): `boolean`

Check if argument is Uint16Array

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isUint32Array

▸ **isUint32Array**(`arg`): `boolean`

Check if argument is Uint32Array

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isUint8Array

▸ **isUint8Array**(`arg`): `boolean`

Check if argument is Uint8Array

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isUint8ClampedArray

▸ **isUint8ClampedArray**(`arg`): `boolean`

Check if argument is Uint8ClampedArray

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`boolean`

___

### isUndefined

▸ **isUndefined**(`arg?`): `boolean`

Check if argument is Undefined

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg?` | `unknown` |

#### Returns

`boolean`

___

### isUrlRelative

▸ **isUrlRelative**(`url`): `boolean`

Returns a value indicating whether a URL is relative.
A relative URL does not have host info part.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | the URL to be checked |

#### Returns

`boolean`

whether the URL is relative

___

### kindOf

▸ **kindOf**(`arg`): `string`

Return a string with the type of the object

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`string`

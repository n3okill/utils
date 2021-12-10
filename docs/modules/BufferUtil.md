[myhelpers](../README.md) / BufferUtil

# Namespace: BufferUtil

## Table of contents

### Interfaces

- [BalancedDataBuffer](../interfaces/BufferUtil.BalancedDataBuffer.md)
- [IExpandOpts](../interfaces/BufferUtil.IExpandOpts.md)

### Functions

- [balanced](BufferUtil.md#balanced)
- [balancedCounter](BufferUtil.md#balancedcounter)
- [balancedData](BufferUtil.md#balanceddata)
- [bufferPathToObject](BufferUtil.md#bufferpathtoobject)
- [detectEncoding](BufferUtil.md#detectencoding)
- [expand](BufferUtil.md#expand)
- [formatMessage](BufferUtil.md#formatmessage)
- [isBalanced](BufferUtil.md#isbalanced)
- [isEmpty](BufferUtil.md#isempty)
- [isEmptyOrWithSpace](BufferUtil.md#isemptyorwithspace)
- [multiReplace](BufferUtil.md#multireplace)
- [multiReplaceNamed](BufferUtil.md#multireplacenamed)
- [objectToPathBuffer](BufferUtil.md#objecttopathbuffer)
- [pad](BufferUtil.md#pad)
- [padEnd](BufferUtil.md#padend)
- [padStart](BufferUtil.md#padstart)
- [repeat](BufferUtil.md#repeat)
- [split](BufferUtil.md#split)
- [titleCase](BufferUtil.md#titlecase)
- [toString](BufferUtil.md#tostring)
- [trim](BufferUtil.md#trim)
- [trimLeft](BufferUtil.md#trimleft)
- [trimRight](BufferUtil.md#trimright)
- [xorTokens](BufferUtil.md#xortokens)

## Functions

### balanced

▸ **balanced**(`input`, `open?`, `close?`): `boolean` \| `number`[][]

Return `false` if buffer is unbalanced, or
an Array<BalancedDataBuffer> mapping the chunks of 'open' and 'close' locations, if input buffer is unbalanced will return empty

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `input` | `Buffer` | `undefined` |
| `open` | `string` | `"{"` |
| `close` | `string` | `"}"` |

#### Returns

`boolean` \| `number`[][]

___

### balancedCounter

▸ **balancedCounter**(`input`, `open?`, `close?`): `boolean`

Check if the number of occurrences of the 'open' string are the same of ths 'close' string in the input string

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `input` | `Buffer` | `undefined` |
| `open` | `string` | `"{"` |
| `close` | `string` | `"}"` |

#### Returns

`boolean`

___

### balancedData

▸ **balancedData**(`input`, `open?`, `close?`): [`BalancedDataBuffer`](../interfaces/BufferUtil.BalancedDataBuffer.md)[]

Return a Array<BalancedDataBuffer> mapping the chunks of 'open' and 'close' locations, if input buffer is unbalanced will return empty

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | `Buffer` | `undefined` | Buffer |
| `open` | `string` | `"{"` | string |
| `close` | `string` | `"}"` | string |

#### Returns

[`BalancedDataBuffer`](../interfaces/BufferUtil.BalancedDataBuffer.md)[]

___

### bufferPathToObject

▸ **bufferPathToObject**(`str`, `separator?`): `Object`

Transforms an array of Buffers into an object

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `Buffer`[] | `undefined` | Array of Buffer's to be transformed |
| `separator` | `string` | `Separator` | Separator used in Buffer, default to node "path" sep |

#### Returns

`Object`

___

### detectEncoding

▸ **detectEncoding**(`arg`): `BufferEncoding`

Detects buffer enconding
This is basic helper that will only detect buffer encoding between `utf8` and `utf16le`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Buffer` | the buffer to detect encoding |

#### Returns

`BufferEncoding`

detected encoding

___

### expand

▸ **expand**(`input`, `options?`): `Buffer`[]

Return an expanded Buffer based on input Buffer and options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `Buffer` | Buffer |
| `options` | [`IExpandOpts`](../interfaces/BufferUtil.IExpandOpts.md) |  |

#### Returns

`Buffer`[]

Examples:

expand("{1..3}") => ["1","2","3"]
expand("{a..c}") => ["a","b","c"]
expand("a{b..d}g{1..3}z") => ["abg1z", "abg2z", "abg3z", "acg1z", "acg2z", "acg3z", "adg1z", "adg2z", "adg3z"]
expand("{a,b{1..3},c}") => ["a", "b1", "b2", "b3", "c"]
expand("{{A..Z},{a..z}}") => ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
expand("a{d,c,b}e") => ["ade", "ace", "abe"]
expand("a{1..2}b{2..3}c") => ["a1b2c", "a1b3c", "a2b2c", "a2b3c"]
expand("{3..-2}") => ["3", "2", "1", "0", "-1", "-2"]

For more examples check the tests

___

### formatMessage

▸ **formatMessage**(`str`, `params`): `Buffer`

Replace items in Buffer based on given object
Ex: formatMessage(Buffer.from("Hello {World}!"),{"World":"Joe"}) => Hello Joe!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `Buffer` | Buffer to be replaced |
| `params` | `Object` | Object with items to replace |

#### Returns

`Buffer`

Buffer with items replaced

___

### isBalanced

▸ **isBalanced**(`input`, `open?`, `close?`): `boolean`

Check for a balanced use of 'open' and 'close' strings

Examples:

 input: "{hello} world"
 open: "{"
 close: "}"
 result: true

 input: "hello} world"
 open: "{"
 close: "}"
 result: false

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `input` | `Buffer` | `undefined` |
| `open` | `string` | `"{"` |
| `close` | `string` | `"}"` |

#### Returns

`boolean`

___

### isEmpty

▸ **isEmpty**(`arg`): `boolean`

Check if Buffer is empty

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Buffer` |

#### Returns

`boolean`

___

### isEmptyOrWithSpace

▸ **isEmptyOrWithSpace**(`arg`): `boolean`

Check if buffer is empty triming withspaces

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Buffer` |

#### Returns

`boolean`

___

### multiReplace

▸ **multiReplace**(`str`, `search`, `replace`): `Buffer`

Replace multiple occurrences in a Buffer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `Buffer` |  |
| `search` | (`string` \| `RegExp`)[] | `Array<string\|RegExp>` |
| `replace` | `string` \| [`Replacefunction`](StringUtil.md#replacefunction) \| (`string` \| [`Replacefunction`](StringUtil.md#replacefunction))[] | `Array<string \| ReplaceFunction> \| string \| ReplaceFunction` |

#### Returns

`Buffer`

___

### multiReplaceNamed

▸ **multiReplaceNamed**(`str`, `params`): `Buffer`

Replace items in buffer based on given object
Ex: multiReplaceNamed(Buffer.from("Hello %World%!"),{"%World%":"Joe"}) => Hello Joe!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `Buffer` | Buffer to be replaced |
| `params` | `Object` | Object with items to replace |

#### Returns

`Buffer`

Buffer with items replaced

___

### objectToPathBuffer

▸ **objectToPathBuffer**(`obj`, `separator?`): `Buffer`[]

Transforms an object into an array of Buffer's

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `obj` | `Object` | `undefined` | Object to be transformed into array of Buffer's |
| `separator` | `string` | `Separator` | Separator to be used in Buffer, default to node "path" sep |

#### Returns

`Buffer`[]

___

### pad

▸ **pad**(`str`, `length`, `padString?`, `start?`): `Buffer`

Pads the current Buffer with string (repeated, if needed) so that the resulting Buffer reaches the given length
The padding is applied form the start (left) if "start" is true or the end (right) if is false

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `Buffer` | `undefined` | Buffer to be padded |
| `length` | `number` | `undefined` | Final size of the Buffer |
| `padString` | `string` | `" "` | String to be added to the Buffer |
| `start` | `boolean` | `true` | Pad from the start of the Buffer or from the end |

#### Returns

`Buffer`

Padded Buffer

___

### padEnd

▸ **padEnd**(`str`, `length`, `padString?`): `Buffer`

Pads the current Buffer with a string (repeated, if needed) so that the resulting buffer reaches the given length
The padding is applied form the end (right) of the Buffer

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `Buffer` | `undefined` | Buffer to be padded |
| `length` | `number` | `undefined` | Final size of the Buffer |
| `padString` | `string` | `" "` | String to be added to the Buffer |

#### Returns

`Buffer`

Padded Buffer

___

### padStart

▸ **padStart**(`str`, `length`, `padString?`): `Buffer`

Pads the current Buffer with a string (repeated, if needed) so that the resulting Buffer reaches the given length
The padding is applied form the start (left) of the Buffer

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `Buffer` | `undefined` | Buffer to be padded |
| `length` | `number` | `undefined` | Final size of the Buffer |
| `padString` | `string` | `" "` | String to be added to the Buffer |

#### Returns

`Buffer`

Padded Buffer

___

### repeat

▸ **repeat**(`str`, `n`): `Buffer`

Repeat a given string or buffer a number of times

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` \| `Buffer` | String or buffer that will be repeated |
| `n` | `number` | Number of times to repeat the given string |

#### Returns

`Buffer`

The given string or buffer repeated n times

___

### split

▸ **split**(`str`, `separator`): `Buffer`[]

Split a buffer into an array of buffer's based on given separator

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `Buffer` |
| `separator` | `string` |

#### Returns

`Buffer`[]

___

### titleCase

▸ **titleCase**(`name`, `ucwords?`): `Buffer`

Converts a CamelCase name into space-separated words.
For example, 'PostTag' will be converted to 'Post Tag'.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `Buffer` | `undefined` | the Buffer to be converted |
| `ucwords` | `boolean` | `true` | whether to capitalize the first letter in each word |

#### Returns

`Buffer`

Buffer with the resulting words

___

### toString

▸ **toString**(`arg`, `encoding?`): `string`

Transforms argument into string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Buffer` | the buffer to transform |
| `encoding?` | `BufferEncoding` | the encoding to be used |

#### Returns

`string`

___

### trim

▸ **trim**(`str`, `chars?`): `Buffer`

Remove given characters from left and right side of the string

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `Buffer` | `undefined` | Buffer to remove characters from |
| `chars` | (`string` \| `Buffer`)[] | `[]` | The characters to remove, if not defined removes empty spaces |

#### Returns

`Buffer`

Trimmed Buffer

___

### trimLeft

▸ **trimLeft**(`s`, `chars?`): `Buffer`

Remove given characters from the left side of the buffer

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `s` | `Buffer` | `undefined` | Buffer to remove the characters from |
| `chars` | (`string` \| `Buffer`)[] | `[]` | The characters to remove if not defined removes empty spaces. |

#### Returns

`Buffer`

Trimmed Buffer

___

### trimRight

▸ **trimRight**(`s`, `chars?`): `Buffer`

Remove given characters from right side of the buffer

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `s` | `Buffer` | `undefined` | Buffer to remove the characters from |
| `chars` | (`string` \| `Buffer`)[] | `[]` | Characters to remove, if not defined removes empty spaces |

#### Returns

`Buffer`

Trimmed Buffer

___

### xorTokens

▸ **xorTokens**(`token1`, `token2`): `Buffer`

Returns the XOR result of two Buffer's.
If the two Buffer's are of different lengths, the shorter one will be padded to the length of the longer one.

#### Parameters

| Name | Type |
| :------ | :------ |
| `token1` | `Buffer` |
| `token2` | `Buffer` |

#### Returns

`Buffer`

the XOR result

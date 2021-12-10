[myhelpers](../README.md) / StringUtil

# Namespace: StringUtil

## Table of contents

### Interfaces

- [BalancedData](../interfaces/StringUtil.BalancedData.md)
- [IExpandOpts](../interfaces/StringUtil.IExpandOpts.md)

### Type aliases

- [Replacefunction](StringUtil.md#replacefunction)

### Functions

- [balanced](StringUtil.md#balanced)
- [balancedCounter](StringUtil.md#balancedcounter)
- [balancedData](StringUtil.md#balanceddata)
- [escapeHtml](StringUtil.md#escapehtml)
- [escapeRegExp](StringUtil.md#escaperegexp)
- [expand](StringUtil.md#expand)
- [formatMessage](StringUtil.md#formatmessage)
- [isBalanced](StringUtil.md#isbalanced)
- [isEmpty](StringUtil.md#isempty)
- [isEmptyOrWithSpace](StringUtil.md#isemptyorwithspace)
- [multiReplace](StringUtil.md#multireplace)
- [multiReplaceNamed](StringUtil.md#multireplacenamed)
- [objectToPathStrings](StringUtil.md#objecttopathstrings)
- [pad](StringUtil.md#pad)
- [padEnd](StringUtil.md#padend)
- [padStart](StringUtil.md#padstart)
- [repeat](StringUtil.md#repeat)
- [stringsPathToObject](StringUtil.md#stringspathtoobject)
- [titleCase](StringUtil.md#titlecase)
- [toString](StringUtil.md#tostring)
- [trim](StringUtil.md#trim)
- [trimLeft](StringUtil.md#trimleft)
- [trimRight](StringUtil.md#trimright)
- [xorTokens](StringUtil.md#xortokens)

## Type aliases

### Replacefunction

Ƭ **Replacefunction**: (`substring`: `string`, ...`args`: `unknown`[]) => `string`

#### Type declaration

▸ (`substring`, ...`args`): `string`

Replace existing items in string with new ones

##### Parameters

| Name | Type |
| :------ | :------ |
| `substring` | `string` |
| `...args` | `unknown`[] |

##### Returns

`string`

String with replaced items

## Functions

### balanced

▸ **balanced**(`input`, `open?`, `close?`): `boolean` \| `number`[][]

Returns 'false' if input string is unbalanced and an array of an array of numbers defining the begging and end of 'open' and 'close' strings

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `input` | `string` | `undefined` |
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
| `input` | `string` | `undefined` |
| `open` | `string` | `"{"` |
| `close` | `string` | `"}"` |

#### Returns

`boolean`

___

### balancedData

▸ **balancedData**(`input`, `open?`, `close?`): [`BalancedData`](../interfaces/StringUtil.BalancedData.md)[]

Return 'false' if input string is unbalanced, otherwise returns an array mapping the chunks of 'open' and 'close' locations

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `input` | `string` | `undefined` |
| `open` | `string` | `"{"` |
| `close` | `string` | `"}"` |

#### Returns

[`BalancedData`](../interfaces/StringUtil.BalancedData.md)[]

___

### escapeHtml

▸ **escapeHtml**(`arg`): `string`

Escape html string

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `undefined` \| ``null`` \| `string` |

#### Returns

`string`

___

### escapeRegExp

▸ **escapeRegExp**(`s`): `string`

Escape RegExp

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`string`

___

### expand

▸ **expand**(`input`, `options?`): `string`[]

Return an expanded string based on input string and options

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |
| `options` | [`IExpandOpts`](../interfaces/StringUtil.IExpandOpts.md) |

#### Returns

`string`[]

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

▸ **formatMessage**(`str`, `params`): `string`

Replace items in string based on given object
Ex: formatMessage("Hello {World}!",{"World":"Joe"}) => Hello Joe!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | String to be replaced |
| `params` | `Object` | Object with items to replace |

#### Returns

`string`

String with items replaced

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
| `input` | `string` | `undefined` |
| `open` | `string` | `"{"` |
| `close` | `string` | `"}"` |

#### Returns

`boolean`

___

### isEmpty

▸ **isEmpty**(`arg`): `boolean`

Check if string is empty

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `string` |

#### Returns

`boolean`

___

### isEmptyOrWithSpace

▸ **isEmptyOrWithSpace**(`arg`): `boolean`

Check if string is empty triming withspaces

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `string` |

#### Returns

`boolean`

___

### multiReplace

▸ **multiReplace**(`str`, `search`, `replace`): `string`

Replace multiple occurrences in a string

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `undefined` \| ``null`` \| `string` |
| `search` | (`string` \| `RegExp`)[] |
| `replace` | `string` \| [`Replacefunction`](StringUtil.md#replacefunction) \| (`string` \| [`Replacefunction`](StringUtil.md#replacefunction))[] |

#### Returns

`string`

___

### multiReplaceNamed

▸ **multiReplaceNamed**(`str`, `params`): `string`

Replace items in string based on given object
Ex: multiReplaceNamed("Hello %World%!",{"%World%":"Joe"}) => Hello Joe!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | String to be replaced |
| `params` | `Object` | Object with items to replace |

#### Returns

`string`

String with items replaced

___

### objectToPathStrings

▸ **objectToPathStrings**(`obj`, `separator?`): `string`[]

Transforms an object into an array of strings

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `obj` | `Object` | `undefined` | Object to be transformed into array of strings |
| `separator` | `string` | `NodePath.sep` | Separator to be used in string, default to node "path" sep |

#### Returns

`string`[]

___

### pad

▸ **pad**(`str`, `length`, `padString?`, `start?`): `string`

Pads the current string with another string (repeated, if needed) so that the resulting string reaches the given length
The padding is applied form the start (left) if "start" is true or the end (right) if is false

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `string` | `undefined` |  |
| `length` | `number` | `undefined` | Final size of the string |
| `padString` | `string` | `" "` | String to be added to the string |
| `start` | `boolean` | `true` | Pad from the start of the string or from the end |

#### Returns

`string`

Padded string

___

### padEnd

▸ **padEnd**(`str`, `length`, `padString?`): `string`

Pads the current string with another string (repeated, if needed) so that the resulting string reaches the given length
The padding is applied form the end (right) of the string

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `string` | `undefined` | string to be padded |
| `length` | `number` | `undefined` | Final size of the string |
| `padString` | `string` | `" "` | String to be added to the string |

#### Returns

`string`

Padded string

___

### padStart

▸ **padStart**(`str`, `length`, `padString?`): `string`

Pads the current string with another string (repeated, if needed) so that the resulting string reaches the given length
The padding is applied form the start (left) of the string

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `string` | `undefined` | string to be padded |
| `length` | `number` | `undefined` | Final size of the string |
| `padString` | `string` | `" "` | String to be added to the string |

#### Returns

`string`

Padded string

___

### repeat

▸ **repeat**(`str`, `n`): `string`

Repeat a given string a number of times

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | String that will be repeated |
| `n` | `number` | Number of times to repeat the given string |

#### Returns

`string`

The given string repeated n times

___

### stringsPathToObject

▸ **stringsPathToObject**(`str`, `separator?`): `Object`

Transforms an array of strings into an object

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `string`[] | `undefined` | Array of strings to be transformed |
| `separator` | `string` | `NodePath.sep` | Separator used in string, default to node "path" sep |

#### Returns

`Object`

___

### titleCase

▸ **titleCase**(`name`, `ucwords?`): `string`

Converts a CamelCase name into space-separated words.
For example, 'PostTag' will be converted to 'Post Tag'.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | the string to be converted |
| `ucwords` | `boolean` | `true` | whether to capitalize the first letter in each word |

#### Returns

`string`

the resulting words

___

### toString

▸ **toString**(`arg`): `string`

Transforms argument into string

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

`string`

___

### trim

▸ **trim**(`str`, `chars?`): `string`

Remove given characters from left and right side of the string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `undefined` \| ``null`` \| `string` | String to remove characters from |
| `chars?` | `string`[] | The characters to remove, if not defined removes empty spaces |

#### Returns

`string`

Trimmed string

___

### trimLeft

▸ **trimLeft**(`s`, `chars?`): `string`

Remove given characters from the left side of the string

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `s` | `undefined` \| ``null`` \| `string` | `undefined` | String to remove the characters from |
| `chars` | `string`[] | `[]` | The characters to remove if not defined removes empty spaces. |

#### Returns

`string`

Trimmed string

___

### trimRight

▸ **trimRight**(`s`, `chars?`): `string`

Remove given characters from right side of the string

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `s` | `undefined` \| ``null`` \| `string` | `undefined` | String to remove the characters from |
| `chars` | `string`[] | `[]` | Characters to remove, if not defined removes empty spaces |

#### Returns

`string`

Trimmed string

___

### xorTokens

▸ **xorTokens**(`token1`, `token2`): `string`

Returns the XOR result of two strings.
If the two strings are of different lengths, the shorter one will be padded to the length of the longer one.

#### Parameters

| Name | Type |
| :------ | :------ |
| `token1` | `string` |
| `token2` | `string` |

#### Returns

`string`

the XOR result

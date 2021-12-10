[myhelpers](../README.md) / ArrayUtil

# Namespace: ArrayUtil

## Table of contents

### Functions

- [chunk](ArrayUtil.md#chunk)
- [cloneArray](ArrayUtil.md#clonearray)
- [combine](ArrayUtil.md#combine)
- [combineUnique](ArrayUtil.md#combineunique)
- [combineUniqueFilter](ArrayUtil.md#combineuniquefilter)
- [contains](ArrayUtil.md#contains)
- [deepCloneArray](ArrayUtil.md#deepclonearray)
- [delIndex](ArrayUtil.md#delindex)
- [delItem](ArrayUtil.md#delitem)
- [diff](ArrayUtil.md#diff)
- [flatten](ArrayUtil.md#flatten)
- [flattenUnique](ArrayUtil.md#flattenunique)
- [intersect](ArrayUtil.md#intersect)
- [isEmpty](ArrayUtil.md#isempty)
- [range](ArrayUtil.md#range)
- [rangeFromString](ArrayUtil.md#rangefromstring)
- [toArray](ArrayUtil.md#toarray)
- [toMap](ArrayUtil.md#tomap)
- [unique](ArrayUtil.md#unique)
- [uniqueFilter](ArrayUtil.md#uniquefilter)

## Functions

### chunk

▸ **chunk**<`T`\>(`arr`, `size`): `T`[][]

Return an array with original array divided in chunks

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T` \| `T`[] | Original array |
| `size` | `number` | Size of each chunk |

#### Returns

`T`[][]

An array containing the chunks of the source array

___

### cloneArray

▸ **cloneArray**<`T`\>(`source`, `deep?`, `transform?`): `T`[]

Clone given array into new array

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `T`[] | `undefined` | Original array to be cloned |
| `deep` | `boolean` | `false` | deep If true will deep clone the array, default: `false` |
| `transform?` | (`value`: `T`) => `T` | `undefined` | Function to transform the objects in the array |

#### Returns

`T`[]

The cloned array

___

### combine

▸ **combine**<`T`\>(...`arrays`): `T`[]

Combine multiple arrays into a single one

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...arrays` | (`T` \| `T`[])[] | The arrays to be combined |

#### Returns

`T`[]

Combined array

___

### combineUnique

▸ **combineUnique**<`T`\>(...`arrays`): `T`[]

Combine multiple arrays into a single one with unique items

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...arrays` | (`T` \| `T`[])[] | Array to be combined |

#### Returns

`T`[]

The combined array with inly unique items

___

### combineUniqueFilter

▸ **combineUniqueFilter**<`T`\>(...`arrays`): `T`[]

Combine multiple arrays into a single with unique items based on filter

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...arrays` | `unknown`[] | Arrays to be combined |

#### Returns

`T`[]

The combined array

___

### contains

▸ **contains**<`T`\>(`arr?`, `item`): `boolean`

Check if array contains the item

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `arr` | `T`[] | `[]` | The array to search |
| `item` | `T` | `undefined` | The item to be searched |

#### Returns

`boolean`

Return `true` if the array contains the item

___

### deepCloneArray

▸ **deepCloneArray**<`T`\>(`source`, `transform?`): `T`[]

Deep Clone given array into new array

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `T`[] | Original array to be cloned |
| `transform?` | (`value`: `T`) => `T` | Function to transform the objects in the array |

#### Returns

`T`[]

The cloned array

___

### delIndex

▸ **delIndex**<`T`\>(`arr`, `index`): `T`[]

Delete the item at the given array index

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T`[] | Array where index will be removed |
| `index` | `number` | The index to remove |

#### Returns

`T`[]

Array with index removed

___

### delItem

▸ **delItem**<`T`\>(`arr`, `elem`, `number?`): `T`[]

Delete all instances of the given item from the array

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `arr` | `T`[] | `undefined` | Array where item will be removed from |
| `elem` | `T` | `undefined` | The item to remove |
| `number` | `number` | `-1` | Number of times that item should be removed (default: `-1` - remove all instances of item) |

#### Returns

`T`[]

The array with item removed

___

### diff

▸ **diff**<`T`\>(`arr`, ...`args`): `T`[]

Return the difference between arrays (all the items that appear only once in the first array)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T`[] | The first array |
| `...args` | (`T` \| `T`[])[] | Other arrays to compare |

#### Returns

`T`[]

The resulting array with the diff items

___

### flatten

▸ **flatten**<`T`\>(...`args`): `T`[]

Return flattened array from the given arrays

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | (`T` \| `T`[])[] | Multiple arrays to be flattened |

#### Returns

`T`[]

The flattened array

___

### flattenUnique

▸ **flattenUnique**<`T`\>(...`args`): `T`[]

Return flattened array with unique items

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | (`T` \| `T`[])[] | Multiple arrays to be flattened |

#### Returns

`T`[]

The flattened array

___

### intersect

▸ **intersect**<`T`\>(...`args`): `T`[]

Return the intersection between arrays

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `T`[][] | Multiple arrays to intersect |

#### Returns

`T`[]

The intersection of the multiple arrays

___

### isEmpty

▸ **isEmpty**(`arg`): `boolean`

Check if array is Empty

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `unknown`[] | Array to check |

#### Returns

`boolean`

`true` if source array is empty

___

### range

▸ **range**(`start`, `end`, `step?`): (`number` \| `string`)[]

Return an array with a range of string or number values

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `start` | `string` \| `number` | `undefined` | First value of the range |
| `end` | `string` \| `number` | `undefined` | Last value of range |
| `step` | `number` | `1` | Stepping between values |

#### Returns

(`number` \| `string`)[]

Array with the range based on entered values

___

### rangeFromString

▸ **rangeFromString**(`str`): (`number` \| `string`)[]

Return an array with a range from a string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | string with the form '1..6..2' or 'a..f' |

#### Returns

(`number` \| `string`)[]

returns an array of strings

___

### toArray

▸ **toArray**<`T`\>(`arr`): `T`[]

Transforms given argument into array

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T` \| `T`[] | Argument to be transformed |

#### Returns

`T`[]

Array of the given argument

___

### toMap

▸ **toMap**(`arg`): `Map`<`unknown`, `unknown`\> \| `undefined`

Transforms argument into Map

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`TObject`](Type.md#tobject) \| [`unknown`, `unknown`][] \| `Map`<`unknown`, `unknown`\> | Argument to be transformed into Map |

#### Returns

`Map`<`unknown`, `unknown`\> \| `undefined`

Resulting Map from argument given or undefined if the argument is not Object, Array or Map

___

### unique

▸ **unique**<`T`\>(`arr`): `T`[]

Return unique elements from an array

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |

#### Returns

`T`[]

___

### uniqueFilter

▸ **uniqueFilter**<`T`\>(`arr`, `comparator?`): `T`[]

Returns a reduced array based on given comparator (if none given, will use `Type.is`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `arr` | `T`[] | `undefined` | Array to be reduced |
| `comparator` | (`arg1`: `T`, `arg2`: `T`) => `boolean` | `Type.is` | comparator function to use `(arg1, arg2)=>boolean` |

#### Returns

`T`[]

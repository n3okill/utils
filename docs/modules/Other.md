[myhelpers](../README.md) / Other

# Namespace: Other

## Table of contents

### Functions

- [cloneBuffer](Other.md#clonebuffer)
- [cloneDate](Other.md#clonedate)
- [cloneError](Other.md#cloneerror)
- [cloneMap](Other.md#clonemap)
- [clonePrimitive](Other.md#cloneprimitive)
- [clonePromise](Other.md#clonepromise)
- [cloneRegExp](Other.md#cloneregexp)
- [cloneSet](Other.md#cloneset)
- [cloneSymbol](Other.md#clonesymbol)
- [cloneTypedArray](Other.md#clonetypedarray)
- [deepCloneMap](Other.md#deepclonemap)
- [deepClonePromise](Other.md#deepclonepromise)
- [deepCloneSet](Other.md#deepcloneset)

## Functions

### cloneBuffer

▸ **cloneBuffer**(`origin`, `transform?`): `Buffer`

Clone buffer

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `Buffer` |
| `transform?` | (`value`: `Buffer`) => `Buffer` |

#### Returns

`Buffer`

___

### cloneDate

▸ **cloneDate**(`origin`, `transform?`): `Date`

Clone date value

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `Date` |
| `transform?` | (`value`: `Date`) => `Date` |

#### Returns

`Date`

New cloned Date object

___

### cloneError

▸ **cloneError**(`origin`, `transform?`): `Error`

Clone Error

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `Error` |
| `transform?` | (`value`: `Error`) => `Error` |

#### Returns

`Error`

New cloned Error object

___

### cloneMap

▸ **cloneMap**<`K`, `V`\>(`origin`, `transform?`): `Map`<`K`, `V`\>

Clone map

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `Map`<`K`, `V`\> |
| `transform?` | (`value`: `V`, `key`: `K`) => `V` |

#### Returns

`Map`<`K`, `V`\>

___

### clonePrimitive

▸ **clonePrimitive**(`origin`, `transform?`): `boolean` \| `string` \| `number`

Clone a primitive value

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `string` \| `number` \| `boolean` |
| `transform?` | (`value`: `string` \| `number` \| `boolean`) => `string` \| `number` \| `boolean` |

#### Returns

`boolean` \| `string` \| `number`

___

### clonePromise

▸ **clonePromise**<`T`\>(`source`, `transform?`): `Promise`<`T`\>

Clone promise

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `Promise`<`T`\> |
| `transform?` | (`value`: `T`) => `T` |

#### Returns

`Promise`<`T`\>

___

### cloneRegExp

▸ **cloneRegExp**(`arg`, `transform?`): `RegExp`

Clone RegExp

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `RegExp` | RegExp to clone |
| `transform?` | (`value`: `RegExp`) => `RegExp` | - |

#### Returns

`RegExp`

New cloned RegExp

___

### cloneSet

▸ **cloneSet**<`T`, `U`\>(`source`, `transform?`): `T`

Clone Set

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Set`<`U`, `T`\> |
| `U` | `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `T` |
| `transform?` | (`value`: `U`) => `U` |

#### Returns

`T`

___

### cloneSymbol

▸ **cloneSymbol**(`origin`, `transform?`): `symbol`

Clone a symbol

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `symbol` |
| `transform?` | (`value`: `symbol`) => `symbol` |

#### Returns

`symbol`

___

### cloneTypedArray

▸ **cloneTypedArray**<`T`\>(`origin`, `transform?`): [`TypedArray`](Type.md#typedarray)

Clone a TypedArray

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | [`TypedArray`](Type.md#typedarray) |
| `transform?` | (`value`: `T`) => `T` |

#### Returns

[`TypedArray`](Type.md#typedarray)

___

### deepCloneMap

▸ **deepCloneMap**<`K`, `V`\>(`origin`, `transform?`): `Map`<`K`, `V`\>

Deep clone Map

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `Map`<`K`, `V`\> |
| `transform?` | (`value`: `V`, `key`: `K`) => `V` |

#### Returns

`Map`<`K`, `V`\>

___

### deepClonePromise

▸ **deepClonePromise**<`T`\>(`source`, `transform?`): `Promise`<`T`\>

Deep Clone promise

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `Promise`<`T`\> |
| `transform?` | (`value`: `T`) => `T` |

#### Returns

`Promise`<`T`\>

___

### deepCloneSet

▸ **deepCloneSet**<`T`, `U`\>(`source`, `transform?`): `T`

Deep clone Set

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Set`<`U`, `T`\> |
| `U` | `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `T` |
| `transform?` | (`value`: `U`) => `U` |

#### Returns

`T`

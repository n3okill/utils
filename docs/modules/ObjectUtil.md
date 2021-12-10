[myhelpers](../README.md) / ObjectUtil

# Namespace: ObjectUtil

## Table of contents

### Functions

- [cloneObject](ObjectUtil.md#cloneobject)
- [deepCloneObject](ObjectUtil.md#deepcloneobject)
- [fromMap](ObjectUtil.md#frommap)
- [isEmpty](ObjectUtil.md#isempty)
- [toMap](ObjectUtil.md#tomap)

## Functions

### cloneObject

▸ **cloneObject**<`T`\>(`source`, `deep?`, `transform?`): `T`

Clone Object

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `source` | `T` | `undefined` |
| `deep` | `boolean` | `false` |
| `transform?` | (`value`: `T`) => `T` | `undefined` |

#### Returns

`T`

New cloned Object

___

### deepCloneObject

▸ **deepCloneObject**<`T`\>(`source`, `transform?`): `T`

Deep Clone Object

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `T` |
| `transform?` | (`value`: `T`) => `T` |

#### Returns

`T`

New deep cloned Object

___

### fromMap

▸ **fromMap**(`map`): [`TObject`](Type.md#tobject)

Transforms Map into Object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `map` | `Map`<`unknown`, `unknown`\> | Map to transform |

#### Returns

[`TObject`](Type.md#tobject)

The object resultant from the Map

___

### isEmpty

▸ **isEmpty**(`arg`): `boolean`

Check if an object is empty

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`TObject`](Type.md#tobject) |

#### Returns

`boolean`

___

### toMap

▸ **toMap**(`obj?`): `Map`<`unknown`, `unknown`\>

Transform object to Map

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | [`TObject`](Type.md#tobject) | The object to transform |

#### Returns

`Map`<`unknown`, `unknown`\>

Map from the object

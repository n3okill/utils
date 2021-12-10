[myhelpers](../README.md) / Mixers

# Namespace: Mixers

## Table of contents

### Type aliases

- [Id](Mixers.md#id)
- [OptionalPropertyNames](Mixers.md#optionalpropertynames)
- [Spread](Mixers.md#spread)
- [SpreadProperties](Mixers.md#spreadproperties)
- [SpreadTwo](Mixers.md#spreadtwo)

### Functions

- [clone](Mixers.md#clone)
- [deepFillIn](Mixers.md#deepfillin)
- [deepMixIn](Mixers.md#deepmixin)
- [merge](Mixers.md#merge)
- [mixIn](Mixers.md#mixin)
- [mixInOne](Mixers.md#mixinone)

## Type aliases

### Id

Ƭ **Id**<`T`\>: `T` extends infer U ? { [K in keyof U]: U[K] } : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

___

### OptionalPropertyNames

Ƭ **OptionalPropertyNames**<`T`\>: { [K in keyof T]-?: Object extends { [P in K]: T[K] } ? K : never }[keyof `T`]

#### Type parameters

| Name |
| :------ |
| `T` |

___

### Spread

Ƭ **Spread**<`A`\>: `A` extends [infer L, ...infer R] ? [`SpreadTwo`](Mixers.md#spreadtwo)<`L`, [`Spread`](Mixers.md#spread)<`R`\>\> : `unknown`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends readonly [...any] |

___

### SpreadProperties

Ƭ **SpreadProperties**<`L`, `R`, `K`\>: { [P in K]: L[P] \| Exclude<R[P], undefined\> }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `L` | `L` |
| `R` | `R` |
| `K` | extends keyof `L` & keyof `R` |

___

### SpreadTwo

Ƭ **SpreadTwo**<`L`, `R`\>: [`Id`](Mixers.md#id)<`Pick`<`L`, `Exclude`<keyof `L`, keyof `R`\>\> & `Pick`<`R`, `Exclude`<keyof `R`, [`OptionalPropertyNames`](Mixers.md#optionalpropertynames)<`R`\>\>\> & `Pick`<`R`, `Exclude`<[`OptionalPropertyNames`](Mixers.md#optionalpropertynames)<`R`\>, keyof `L`\>\> & [`SpreadProperties`](Mixers.md#spreadproperties)<`L`, `R`, [`OptionalPropertyNames`](Mixers.md#optionalpropertynames)<`R`\> & keyof `L`\>\>

#### Type parameters

| Name |
| :------ |
| `L` |
| `R` |

## Functions

### clone

▸ **clone**<`T`\>(`source`, `deep?`, `transform?`): `T`

Clone any argument type

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `T` | `undefined` | - |
| `deep` | `boolean` | `false` | If true will deep clone values in multiple argument types |
| `transform?` | (`value`: `unknown`, `key?`: `unknown`) => `unknown` | `undefined` | - |

#### Returns

`T`

New cloned object

___

### deepFillIn

▸ **deepFillIn**<`A`\>(...`args`): [`Spread`](Mixers.md#spread)<`A`\>

Fill non-existent properties in the first object with the other objects

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `object`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | [...A[]] | Objects to fill |

#### Returns

[`Spread`](Mixers.md#spread)<`A`\>

The first object filled with the new properties

___

### deepMixIn

▸ **deepMixIn**<`A`\>(...`args`): [`Spread`](Mixers.md#spread)<`A`\>

Merge given objects into a new one without cloning values

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `object`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | [...A[]] | Objects to be merged |

#### Returns

[`Spread`](Mixers.md#spread)<`A`\>

The new merged object

___

### merge

▸ **merge**<`A`\>(...`args`): [`Spread`](Mixers.md#spread)<`A`\>

Merge given objects into a new one, cloning the values

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `object`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | [...A[]] | Objects to be merged |

#### Returns

[`Spread`](Mixers.md#spread)<`A`\>

The merged and cloned object

___

### mixIn

▸ **mixIn**<`T`\>(`target`, ...`args`): `T`

Merge multiple objects into the target

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `T` | The object to merge into |
| `...args` | `T`[] | The objects to be merged |

#### Returns

`T`

Return the target object with other arguments merged into it

___

### mixInOne

▸ **mixInOne**<`T`\>(`target`, `source`): `void`

Merge source into target

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `T` | The object to merge into |
| `source` | `T` | The object to merge |

#### Returns

`void`

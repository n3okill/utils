[myhelpers](../README.md) / Configuration

# Namespace: Configuration

## Table of contents

### Functions

- [getProperty](Configuration.md#getproperty)
- [hasProperty](Configuration.md#hasproperty)
- [isPropertyDefined](Configuration.md#ispropertydefined)
- [isPropertyDefinedWithThrow](Configuration.md#ispropertydefinedwiththrow)
- [removeProperty](Configuration.md#removeproperty)
- [setProperty](Configuration.md#setproperty)

## Functions

### getProperty

▸ **getProperty**(`obj`, `name`, `defaultValue?`): `any`

Return the value of a property in the object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `any` | The object to search for the property |
| `name` | `string` \| `string`[] | The name of the property can be on the form "a.b.c[1].d" |
| `defaultValue?` | `any` | Default value to be returned if the property don't exist |

#### Returns

`any`

Value of the property or defaultValue

___

### hasProperty

▸ **hasProperty**(`obj`, `name`): `boolean`

Check if the object has the property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `any` | The object to search for the property |
| `name` | `string` \| `string`[] | The name of the property can be on the form "a.b.c[1].d" |

#### Returns

`boolean`

___

### isPropertyDefined

▸ **isPropertyDefined**(`obj`, `name`): `boolean`

Return true if a property in the given object is not undefined

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `any` | Object where to search for the property |
| `name` | `string` | The name of the property can be on the form "a.b.c[1].d" |

#### Returns

`boolean`

___

### isPropertyDefinedWithThrow

▸ **isPropertyDefinedWithThrow**(`obj`, `name`): `void`

Throws an error if property is not defined in the given object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `any` | Object where to search for the property |
| `name` | `string` | The name of the property can be on the form "a.b.c[1].d" |

#### Returns

`void`

___

### removeProperty

▸ **removeProperty**(`obj`, `name`): `any`

Remove a property from the object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `any` | The object where to remove the property |
| `name` | `string` \| `string`[] | The name of the property can be on the form "a.b.c[1].d" |

#### Returns

`any`

The value of the removed property if defined

___

### setProperty

▸ **setProperty**(`obj`, `name`, `value`, `replace?`): `any`

Set a property in an object

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `obj` | `any` | `undefined` | The object where to set the property |
| `name` | `string` \| `string`[] | `undefined` | The name of the property can be on the form "a.b.c[1].d" |
| `value` | `unknown` | `undefined` | The value to be defined for the property |
| `replace` | `boolean` | `false` | If true will replace the property if it already exists |

#### Returns

`any`

The original object (just for chaining purposes)

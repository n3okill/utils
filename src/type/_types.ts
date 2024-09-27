export type TObjectKey = string | symbol | number;
export type TObject = Record<TObjectKey, unknown>;

export type TypedArrayConstructor =
    | Int8ArrayConstructor
    | Uint8ArrayConstructor
    | Uint8ClampedArrayConstructor
    | Int16ArrayConstructor
    | Uint16ArrayConstructor
    | Int32ArrayConstructor
    | Uint32ArrayConstructor
    | Float32ArrayConstructor
    | Float64ArrayConstructor
    | BigUint64ArrayConstructor
    | BigInt64ArrayConstructor;

export type Primitive = string | number | bigint | boolean | symbol | undefined | null;

/**
 * Javascript Object types Enum
 */
export enum EnumTypes {
    Array,
    AsyncFunction,
    Boolean,
    Blob,
    Buffer,
    Date,
    Error,
    Function,
    Map,
    Null,
    Number,
    Object,
    PlainObject,
    Promise,
    RegExp,
    Set,
    String,
    Symbol,
    TypedArray,
    Undefined,
    NotDefined,
    BigInt,
}

/**
 * @internal
 * @type {string[]}
 */
export const TypedArrayTypes: string[] = [
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float32Array",
    "Float64Array",
    "BigInt64Array",
    "BigUint64Array",
];

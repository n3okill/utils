import * as Mixers from "./mixers.js";
import * as Type from "./type.js";
import { _checkTransform, TransformFunctionType } from "./_internal.js";

/**
 * Clone buffer
 * @param {Buffer} origin
 * @param {Function} transform
 * @returns {Buffer}
 */
export function cloneBuffer(origin: Buffer, transform?: (value: Buffer) => Buffer): Buffer {
    return _checkTransform(Buffer.from(origin), transform as TransformFunctionType);
}

/**
 * Clone date value
 * @param {Date} arg Date to clone
 * @returns {Date} New cloned Date object
 */
export function cloneDate(origin: Date, transform?: (value: Date) => Date): Date {
    return _checkTransform(new Date(origin.getTime()), transform as TransformFunctionType);
}

/**
 * Clone Error
 * @param {Error} arg Error to clone
 * @returns {Error} New cloned Error object
 */
export function cloneError(origin: Error, transform?: (value: Error) => Error): Error {
    return _checkTransform(
        Reflect.construct(origin.constructor, [origin.message]) as Error,
        transform as TransformFunctionType,
    );
}

/*
export function cloneFunction(origin: CallableFunction, deep: boolean = false, transform?: ((value: unknown) => unknown), stack = new Map()): CallableFunction => {
    const c = origin;
    _cloneDescriptors(origin as unknown as Type.TObject, c as unknown as Type.TObject, deep, transform, stack);
    return _checkTransform(c, transform) as CallableFunction;
}*/

/**
 * Deep clone Map
 * @param {Map} origin
 * @param {Function} transform
 * @returns {Map}
 */
export function deepCloneMap<K, V>(origin: Map<K, V>, transform?: (value: V, key: K) => V): Map<K, V> {
    return Mixers.clone(origin, true, transform as TransformFunctionType);
}

/**
 * Clone map
 * @param {Map} origin
 * @param {Function} transform
 * @returns {Map}
 */
export function cloneMap<K, V>(origin: Map<K, V>, transform?: (value: V, key: K) => V): Map<K, V> {
    return Mixers.clone(origin, false, transform as TransformFunctionType);
}

/**
 * Clone a primitive value
 * @param {boolean | string | number} origin
 * @param {Function} transform
 * @returns {boolean | string | number}
 */
export function clonePrimitive(
    origin: boolean | string | number,
    transform?: (value: string | number | boolean) => string | number | boolean,
): boolean | string | number {
    return _checkTransform(
        new (origin.constructor as ObjectConstructor)(origin).valueOf() as string | number | boolean,
        transform as TransformFunctionType,
    );
}

/**
 * Clone promise
 * @param {Promise} source
 * @param {Function} transform
 * @returns {Promise}
 */
export function clonePromise<T>(source: Promise<T>, transform?: (value: T) => T): Promise<T> {
    return Mixers.clone(source, false, transform as TransformFunctionType);
}

/**
 * Deep Clone promise
 * @param {Promise} source
 * @param {Function} transform
 * @returns {Promise}
 */
export function deepClonePromise<T>(source: Promise<T>, transform?: (value: T) => T): Promise<T> {
    return Mixers.clone(source, true, transform as TransformFunctionType);
}

/**
 * Clone RegExp
 * @param {RegExp} arg RegExp to clone
 * @returns {RegExp} New cloned RegExp
 */
export function cloneRegExp(arg: RegExp, transform?: (value: RegExp) => RegExp): RegExp {
    // eslint-disable-next-line security/detect-non-literal-regexp
    const reg = new RegExp(arg.source, arg.flags || (/[gimuy]*$/.exec(arg.toString()) as RegExpExecArray)[0]);
    if ("lastIndex" in arg) {
        reg.lastIndex = arg.lastIndex;
    }
    return _checkTransform(reg, transform as TransformFunctionType);
}

/**
 * Deep clone Set
 * @param {Set} source
 * @param {Function} transform
 * @returns {Set}
 */
export function deepCloneSet<T extends Set<U>, U>(source: T, transform?: (value: U) => U): T {
    return Mixers.clone(source, true, transform as TransformFunctionType);
}

/**
 * Clone Set
 * @param {Set} source
 * @param {Function} transform
 * @returns {Set}
 */
export function cloneSet<T extends Set<U>, U>(source: T, transform?: (value: U) => U): T {
    return Mixers.clone(source as never, false, transform as <U>(value: U) => U) as unknown as T;
}

/**
 * Clone a symbol
 * @param {Symbol} origin
 * @param {Function} transform
 * @returns {Symbol}
 */
export function cloneSymbol(origin: symbol, transform?: (value: symbol) => symbol): symbol {
    return _checkTransform(Object(Symbol.prototype.valueOf.call(origin)) as symbol, transform as TransformFunctionType);
}

/**
 * Clone a TypedArray
 * @param {TypedArray} origin
 * @param {Function} transform
 * @returns {TypedArray}
 */
export function cloneTypedArray<T>(origin: NodeJS.TypedArray, transform?: (value: T) => T): NodeJS.TypedArray {
    return _checkTransform(
        new ((origin as unknown as NodeJS.TypedArray).constructor as Type.TypedArrayConstructor)(
            origin.buffer,
            origin.byteOffset,
            origin.length,
        ),
        transform as TransformFunctionType,
    );
}

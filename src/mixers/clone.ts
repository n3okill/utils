import { _checkTransform, TransformFunctionType } from "../_internal";
import { cloneBuffer } from "../other/cloneBuffer";
import { cloneDate } from "../other/cloneDate";
import { cloneError } from "../other/cloneError";
import { clonePrimitive } from "../other/clonePrimitive";
import { cloneRegExp } from "../other/cloneRegExp";
import { cloneSymbol } from "../other/cloneSymbol";
import { cloneTypedArray } from "../other/cloneTypedArray";
import { EnumTypes, TObject } from "../type/_types";
import { getEnumType } from "../type/getEnumType";
import { isArray } from "../type/isArray";
import { isMap } from "../type/isMap";
import { isObject } from "../type/isObject";
import { isPlainObject } from "../type/isPlainObject";
import { isSet } from "../type/isSet";

/**
 * Clone any argument type
 * @param arg The argument to clone
 * @param deep If true will deep clone values in multiple argument types
 * @returns New cloned object
 */
export function clone<T>(source: T, deep: boolean = false, transform?: TransformFunctionType): T {
    const parentStack: Array<unknown> = [];
    const parentCloned: Array<unknown> = [];

    const _clone = <T>(_source: T): T => {
        let target: unknown;
        const parentIndex = parentStack.indexOf(_source);
        if (parentIndex !== -1) {
            // eslint-disable-next-line security/detect-object-injection
            return parentCloned[parentIndex] as T;
        }

        switch (getEnumType(_source)) {
            case EnumTypes.Array:
                target = new (((_source as Array<T>).constructor as ArrayConstructor) || Array)((_source as []).length);
                break;
            case EnumTypes.Map:
                target = new (((_source as Map<unknown, unknown>).constructor as MapConstructor) || Map)();
                break;
            case EnumTypes.Set:
                target = new (((_source as Set<T>).constructor as SetConstructor) || Set)();
                break;
            case EnumTypes.Promise:
                target = new ((_source as Promise<T>).constructor as PromiseConstructor)(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void): void => {
                        (_source as Promise<T>).then(
                            (value: T | PromiseLike<T>): void => resolve(_checkTransform(_clone(value), transform)),
                            (err: Error): void => reject(_checkTransform(_clone(err), transform)),
                        );
                    },
                );
                break;
            case EnumTypes.Object:
            case EnumTypes.PlainObject:
                if (isPlainObject(_source) || !("constructor" in (_source as TObject))) {
                    target = {};
                } else {
                    target = new ((_source as Record<string, unknown>).constructor as ObjectConstructor)();
                }
                break;
            case EnumTypes.Buffer:
                return cloneBuffer(_source as Buffer, transform) as unknown as T;
            case EnumTypes.Date:
                return cloneDate(_source as Date, transform as (value: Date) => Date) as unknown as T;
            case EnumTypes.Error:
                target = cloneError(_source as Error, transform as (value: Error) => Error);
                break;
            case EnumTypes.RegExp:
                return cloneRegExp(_source as RegExp, transform as (value: RegExp) => RegExp) as unknown as T;
            case EnumTypes.TypedArray:
                return cloneTypedArray(_source as NodeJS.TypedArray, transform) as unknown as T;
            case EnumTypes.Function:
            case EnumTypes.AsyncFunction:
                return (_source as CallableFunction).bind(null) as unknown as T;
            case EnumTypes.Symbol:
                return cloneSymbol(_source as symbol, transform as (value: symbol) => symbol) as unknown as T;
            case EnumTypes.Boolean:
            case EnumTypes.Number:
            case EnumTypes.String:
                return clonePrimitive(
                    _source as never,
                    transform as (value: string | number | boolean) => string | boolean | number,
                ) as unknown as T;
            case EnumTypes.Null:
            case EnumTypes.Undefined:
                return _source;
        }
        parentStack.push(_source);
        parentCloned.push(target);

        if (isArray(_source)) {
            let length: number = (_source as Array<T>).length;
            while (length--) {
                // eslint-disable-next-line security/detect-object-injection
                (target as Array<unknown>)[length] = _checkTransform(
                    // eslint-disable-next-line security/detect-object-injection
                    deep ? _clone((_source as Array<T>)[length]) : (_source as Array<T>)[length],
                    transform,
                    length,
                );
            }
        } else if (isMap(_source)) {
            for (const [key, value] of (_source as Map<unknown, unknown>).entries()) {
                (target as Map<unknown, unknown>).set(
                    key,
                    _checkTransform(deep ? _clone(value) : value, transform, key),
                );
            }
        } else if (isSet(_source)) {
            for (const val of (_source as Set<unknown>).values()) {
                (target as Set<unknown>).add(_checkTransform(deep ? _clone(val) : val, transform));
            }
        }

        const cloneDescriptor = (original: unknown, name: string | symbol, cloneObj: unknown): void => {
            if (
                !(name in (cloneObj as TObject)) ||
                (cloneObj as TObject)[name as string] !== (original as TObject)[name as string]
            ) {
                const descriptor = Object.getOwnPropertyDescriptor(original, name) as PropertyDescriptor;
                const desc: PropertyDescriptor = {};
                desc.writable = descriptor.writable === true;
                desc.configurable = descriptor.configurable === true;
                desc.enumerable = descriptor.enumerable === true;
                if (descriptor.set) {
                    // eslint-disable-next-line @typescript-eslint/unbound-method
                    desc.set = (deep ? _clone(descriptor.set) : descriptor.set) as (v: unknown) => void;
                    delete desc.writable;
                }
                if (descriptor.get) {
                    // eslint-disable-next-line @typescript-eslint/unbound-method
                    desc.get = (deep ? _clone(descriptor.get) : descriptor.get) as () => unknown;
                    delete desc.writable;
                } else {
                    desc.value = (
                        deep ? _checkTransform(_clone(descriptor.value), transform, name) : descriptor.value
                    ) as unknown;
                }
                try {
                    Object.defineProperty(cloneObj, name, desc);
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (err) {
                    throw new Error(`Error defining descriptor for '${name as string}'`);
                }
            }
        };

        const ownPropertyNames = Object.getOwnPropertyNames(_source);
        for (const name of ownPropertyNames) {
            cloneDescriptor(_source, name, target);
        }
        const ownPropertySymbols = Object.getOwnPropertySymbols(_source);
        for (const symbol of ownPropertySymbols) {
            cloneDescriptor(_source, symbol, target);
        }

        if (isObject(_source) || isPlainObject(_source)) {
            target = _checkTransform(target, transform);
        }

        return target as T;
    };

    return _clone(source);
}

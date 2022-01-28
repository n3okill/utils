/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Type from "./type.js";
import * as Other from "./other.js";
import { _checkTransform } from "./_internal.js";

export type OptionalPropertyNames<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never }[keyof T];

export type SpreadProperties<L, R, K extends keyof L & keyof R> = { [P in K]: L[P] | Exclude<R[P], undefined> };

export type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

export type SpreadTwo<L, R> = Id<
    Pick<L, Exclude<keyof L, keyof R>> &
        Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
        Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
        SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;
export type Spread<A extends readonly [...any]> = A extends [infer L, ...infer R] ? SpreadTwo<L, Spread<R>> : unknown;

/**
 * Merge given objects into a new one, cloning the values
 * @param args Objects to be merged
 * @returns The merged and cloned object
 */

export function merge<A extends object[]>(...args: [...A]): Spread<A> {
    let target: any;
    do {
        target = args.shift();
    } while (!target && args.length);
    args.forEach((obj) => {
        if (!Type.isNullOrUndefined(obj)) {
            Object.keys(obj).forEach((key: string): void => {
                Type.isObject((obj as any)[key]) && Type.isObject(target[key])
                    ? (target[key] = merge(target[key], (obj as any)[key]))
                    : (target[key] = clone((obj as any)[key], true));
            });
        }
    });
    return target as Spread<A>;
}

/**
 * Merge source into target
 * @param target The object to merge into
 * @param source The object to merge
 */
export function mixInOne<T>(target: T, source: T): void {
    return Object.getOwnPropertyNames(source).forEach(
        (property: string): void =>
            Object.defineProperty(
                target,
                property,
                Object.getOwnPropertyDescriptor(source, property) as PropertyDescriptor
            ) as unknown as void
    );
}

/**
 * Merge multiple objects into the target
 * @param target The object to merge into
 * @param args The objects to be merged
 * @returns Return the target object with other arguments merged into it
 */
export function mixIn<T>(target: T, ...args: Array<T>): T {
    args.forEach((arg): void => {
        if (!Type.isNullOrUndefined(arg)) {
            mixInOne(target, arg);
        }
    });
    return target;
}

/**
 * Merge given objects into a new one without cloning values
 * @param args Objects to be merged
 * @returns The new merged object
 */
export function deepMixIn<A extends object[]>(...args: [...A]): Spread<A> {
    let target: any;
    do {
        target = args.shift();
    } while (!target && args.length);

    args.forEach((obj): void => {
        Object.keys(obj).forEach((key): void => {
            if (!Object.prototype.hasOwnProperty.call(target, key)) {
                target[key] = (obj as any)[key];
            } else if (Type.isPlainObject(target) && Type.isPlainObject((obj as any)[key])) {
                deepMixIn(target[key], (obj as any)[key]);
            } else {
                mixIn(target, obj);
            }
        });
    });
    return target as Spread<A>;
}

/**
 * Fill non-existent properties in the first object with the other objects
 * @param args Objects to fill
 * @returns The first object filled with the new properties
 */

export function deepFillIn<A extends object[]>(...args: [...A]): Spread<A> {
    let target: any;
    do {
        target = args.shift();
    } while (!target && args.length);

    args.forEach((obj): void => {
        Object.keys(obj).forEach((key): void => {
            if (!Object.prototype.hasOwnProperty.call(target, key)) {
                target[key] = (obj as any)[key];
            } else if (Type.isPlainObject(target) && Type.isPlainObject((obj as any)[key])) {
                deepFillIn(target[key], (obj as any)[key]);
            }
        });
    });
    return target as Spread<A>;
}

/**
 * Clone any argument type
 * @param arg The argument to clone
 * @param deep If true will deep clone values in multiple argument types
 * @returns New cloned object
 */
export function clone<T>(source: T, deep: boolean = false, transform?: (value: unknown, key?: unknown) => unknown): T {
    const parentStack: Array<unknown> = [];
    const parentCloned: Array<unknown> = [];

    const _clone = (_source: unknown): T => {
        let target: unknown;
        const parentIndex = parentStack.indexOf(_source);
        if (parentIndex !== -1) {
            return parentCloned[parentIndex] as T;
        }

        switch (Type.getEnumType(_source)) {
            case Type.EnumTypes.Array:
                target = new (((_source as Array<T>).constructor as ArrayConstructor) || Array)((_source as []).length);
                break;
            case Type.EnumTypes.Map:
                target = new (((_source as Map<unknown, unknown>).constructor as MapConstructor) || Map)();
                break;
            case Type.EnumTypes.Set:
                target = new (((_source as Set<T>).constructor as SetConstructor) || Set)();
                break;
            case Type.EnumTypes.Promise:
                target = new ((_source as Promise<T>).constructor as PromiseConstructor)(
                    (resolve: CallableFunction, reject: CallableFunction): void => {
                        (_source as Promise<T>).then(
                            (value: T): Promise<T> => resolve(_checkTransform(_clone(value), transform)) as Promise<T>,
                            (err: Error): Promise<T> => reject(_checkTransform(_clone(err))) as Promise<T>
                        );
                    }
                );
                break;
            case Type.EnumTypes.Object:
            case Type.EnumTypes.PlainObject:
                if (Type.isPlainObject(_source) || !("constructor" in (_source as Type.TObject))) {
                    target = {};
                } else {
                    target = new ((_source as Record<string, unknown>).constructor as ObjectConstructor)();
                }
                break;
            case Type.EnumTypes.Buffer:
                return Other.cloneBuffer(_source as Buffer, transform as (value: Buffer) => Buffer) as unknown as T;
            case Type.EnumTypes.Date:
                return Other.cloneDate(_source as Date, transform as (value: Date) => Date) as unknown as T;
            case Type.EnumTypes.Error:
                target = Other.cloneError(_source as Error, transform as (value: Error) => Error);
                break;
            case Type.EnumTypes.RegExp:
                return Other.cloneRegExp(_source as RegExp, transform as (value: RegExp) => RegExp) as unknown as T;
            case Type.EnumTypes.TypedArray:
                return Other.cloneTypedArray(_source as NodeJS.TypedArray, transform) as unknown as T;
            case Type.EnumTypes.Function:
            case Type.EnumTypes.AsyncFunction:
                return (_source as CallableFunction).bind(null) as unknown as T;
                break;
            case Type.EnumTypes.Symbol:
                return Other.cloneSymbol(_source as symbol, transform as (value: symbol) => symbol) as unknown as T;
                break;
            case Type.EnumTypes.Boolean:
            case Type.EnumTypes.Number:
            case Type.EnumTypes.String:
                return Other.clonePrimitive(
                    _source as never,
                    transform as (value: string | number | boolean) => string | boolean | number
                ) as unknown as T;
                break;
            case Type.EnumTypes.Null:
            case Type.EnumTypes.Undefined:
                return _source as T;
        }
        parentStack.push(_source);
        parentCloned.push(target);

        if (Type.isArray(_source)) {
            let length: number = (_source as Array<T>).length;
            while (length--) {
                (target as Array<unknown>)[length] = _checkTransform(
                    deep ? _clone((_source as Array<T>)[length]) : (_source as Array<T>)[length],
                    transform,
                    length
                );
            }
        } else if (Type.isMap(_source)) {
            for (const [key, value] of (_source as Map<unknown, unknown>).entries()) {
                (target as Map<unknown, unknown>).set(
                    key,
                    _checkTransform(deep ? _clone(value) : value, transform, key)
                );
            }
        } else if (Type.isSet(_source)) {
            for (const val of (_source as Set<unknown>).values()) {
                (target as Set<unknown>).add(_checkTransform(deep ? _clone(val) : val, transform));
            }
        }

        const cloneDescriptor = (original: unknown, name: string | symbol, cloneObj: unknown): void => {
            if (
                !(name in (cloneObj as Type.TObject)) ||
                (cloneObj as Type.TObject)[name as string] !== (original as Type.TObject)[name as string]
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
                } catch (err) {
                    console.error((err as Error).stack);
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

        if (Type.isObject(_source) || Type.isPlainObject(_source)) {
            target = _checkTransform(target, transform);
        }

        return target as T;
    };

    return _clone(source);
}

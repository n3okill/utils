import { is } from "../type/is";

/**
 * Returns a reduced array based on given comparator (if none given, will use `Type.is`)
 * @param arr Array to be reduced
 * @param comparator comparator function to use `(arg1, arg2)=>boolean`
 * @returns
 */
export function uniqueFilter<T>(arr: Array<T>, comparator: (arg1: T, arg2: T) => boolean = is): Array<T> {
    return arr.reduce<Array<T>>((prev: Array<T>, curr: T): [] => {
        const a = prev.filter((itemPrev: T): boolean => comparator(curr, itemPrev));
        if (!a.length) {
            prev.push(curr);
        }
        return prev as [];
    }, []);
}

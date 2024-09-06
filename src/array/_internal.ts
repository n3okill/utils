import { toNumeric } from "../number/toNumeric";
import { isNumeric } from "../type/isNumeric";

/**
 *
 * @param {string} start
 * @param {string} end
 * @param {number} step
 * @returns {Array<string>}
 * @internal
 */
export function rangeString(start: string, end: string, step: number = 1): Array<string> {
    const result: Array<string> = [];
    const s = toNumeric(start);
    const e = toNumeric(end);
    const isNumericAux = isNumeric(start);
    const max = Math.max(start.length, end.length);
    const reg = /^-?0\d/;
    const pad = reg.test(start) || reg.test(end);
    const isReverse = e < s;
    if (isReverse) {
        step *= -1;
    }

    for (let i = s; isReverse ? i >= e : i <= e; i += step) {
        let val: string;
        if (isNumericAux) {
            val = String(i);
            if (pad) {
                const need = max - val.length;
                if (need > 0) {
                    const z = new Array(need + 1).join("0");
                    if (i < 0) {
                        val = `-${z}${val.slice(1)}`;
                    } else {
                        val = z + val;
                    }
                }
            }
        } else {
            val = String.fromCharCode(i);
        }
        result.push(val);
    }
    return result;
}

/**
 * @param {number} start
 * @param {number} end
 * @param {number} step
 * @returns {Array<number>}
 * @internal
 */
export function rangeNumber(start: number, end: number, step: number = 1): Array<number> {
    const result: Array<number> = [];
    const isReverse = end < start;
    if (isReverse) {
        step *= -1;
    }
    for (let i = start; isReverse ? i >= end : i <= end; i += step) {
        result.push(i);
    }
    return result;
}

import { balancedCounter } from "./balancedCounter";

/**
 * @internal
 * @param input
 * @param open
 * @param close
 * @returns
 */
export function getBalanced(input: string, open = "{", close = "}"): boolean | number[][] {
    const openLength = open.length;
    const closeLength = close.length;
    if (!balancedCounter(input, open, close)) {
        return false;
    }
    const opens: number[] = [];
    const closes: number[] = [];
    const matches: number[][] = [];
    let openI = input.indexOf(open);
    while (openI !== -1) {
        opens.push(openI);
        openI = input.indexOf(open, openI + openLength);
    }
    while (opens.length) {
        const openI = opens.pop();
        let closeI = input.indexOf(close, (openI as number) + openLength);
        while (closes.indexOf(closeI) !== -1) {
            closeI = input.indexOf(close, closeI + closeLength);
        }
        if (closeI === -1) {
            return false;
        }
        closes.push(closeI);
        matches.push([openI as number, closeI]);
    }

    return matches.reverse();
}

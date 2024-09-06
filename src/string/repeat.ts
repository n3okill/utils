
/**
 * Repeat a given string a number of times
 * @param str String that will be repeated
 * @param n Number of times to repeat the given string
 * @return The given string repeated n times
 */
export function repeat(str: string, n: number): string {
    let result = "";
    if (n < 1) {
        return "";
    }
    while (n > 0) {
        //Examples of bitwise operators can be seen at
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
        if (n & 1) {
            result += str;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (n >>= 1), (str += str);
    }
    return result;
}

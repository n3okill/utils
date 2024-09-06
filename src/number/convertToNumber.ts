/**
 * @internal
 * @param arr
 * @returns
 */
export function convertToNumber(arr: string[]): (string | number)[] {
    return arr.map((el: string) => {
        return isNaN(el as unknown as number) ? el : parseInt(el, 10);
    });
}

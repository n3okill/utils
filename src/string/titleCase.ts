import { toString } from "./toString";

/**
 * Converts a CamelCase name into space-separated words.
 * For example, 'PostTag' will be converted to 'Post Tag'.
 * @param  name the string to be converted
 * @param  ucwords whether to capitalize the first letter in each word
 * @return  the resulting words
 */
export function titleCase(name: string, ucwords: boolean = true): string {
    let str = toString(name);

    str = str.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
    return ucwords
        ? str.replace(/([ -_.]|^)(.)/g, function (allMatches, firstMatch, secondMatch: string): string {
              return (firstMatch ? " " : "") + secondMatch.toUpperCase();
          })
        : str;
}

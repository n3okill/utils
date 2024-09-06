import * as StringUtil from "./string_util.js";
import * as ArrayUtil from "./array_util.js";
import * as ObjectUtil from "./object_util.js";
import * as util from "util";

export type TObjectKey = string | symbol | number;
export type TObject = Record<TObjectKey, unknown>;

/**
 * TypedArray Types
 */
/*export type TypedArray =
        | Uint8Array
        | Uint8ClampedArray
        | Uint16Array
        | Uint32Array
        | Int8Array
        | Int16Array
        | Int32Array
        | BigUint64Array
        | BigInt64Array
        | Float32Array
        | Float64Array;*/
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
const TypedArrayTypes: string[] = [
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

/**
 * Argument type utilities
 */

/**
 * Check if to arguments are equal "==="
 * @param arg1
 * @param arg2
 * @returns {boolean}
 */
export function is(arg1: unknown, arg2: unknown): boolean {
    return Object.is ? Object.is(arg1, arg2) : arg1 === arg2;
}

/**
 * Check if argument is of the kind
 * @param arg
 * @param {string} kind Kind to match the type
 * @returns {boolean}
 */
export function isKind(arg: unknown, kind: string): boolean {
    return kindOf(arg).toLowerCase() === kind.toLowerCase();
}

/**
 * Check if argument is an array
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isArray(arg: unknown): arg is Array<any> {
    return Array.isArray ? Array.isArray(arg) : isKind(arg, "array");
}

/**
 * Check if argument is Array or TypedArray
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isArrayType(arg: unknown): arg is Array<any> | NodeJS.TypedArray {
    return isArray(arg) || isTypedArray(arg);
}

/**
 * Check if argument is TypedArray
 * @param arg
 * @returns {boolean}
 */
export function isTypedArray(arg: unknown): arg is NodeJS.TypedArray {
    return TypedArrayTypes.map((x) => x.toLowerCase()).indexOf(kindOf(arg).toLowerCase()) !== -1;
}

/**
 * Check if argument is Int8Array
 * @param arg
 * @returns {boolean}
 */
export function isInt8Array(arg: unknown): arg is Int8Array {
    return isKind(arg, "Int8Array");
}
/**
 * Check if argument is Uint8Array
 * @param arg
 * @returns {boolean}
 */
export function isUint8Array(arg: unknown): arg is Uint8Array {
    return isKind(arg, "Uint8Array");
}

/**
 * Check if argument is Uint8ClampedArray
 * @param arg
 * @returns {boolean}
 */
export function isUint8ClampedArray(arg: unknown): arg is Uint8ClampedArray {
    return isKind(arg, "Uint8ClampedArray");
}

/**
 * Check if argument is Int16Array
 * @param arg
 * @returns {boolean}
 */
export function isInt16Array(arg: unknown): arg is Int16Array {
    return isKind(arg, "Int16Array");
}

/**
 * Check if argument is Uint16Array
 * @param arg
 * @returns {boolean}
 */
export function isUint16Array(arg: unknown): arg is Uint16Array {
    return isKind(arg, "Uint16Array");
}

/**
 * Check if argument is Int32Array
 * @param arg
 * @returns {boolean}
 */
export function isInt32Array(arg: unknown): arg is Int32Array {
    return isKind(arg, "Int32Array");
}

/**
 * Check if argument is Uint32Array
 * @param arg
 * @returns {boolean}
 */
export function isUint32Array(arg: unknown): arg is Uint32Array {
    return isKind(arg, "Uint32Array");
}

/**
 * Check if argument is Float32Array
 * @param arg
 * @returns {boolean}
 */
export function isFloat32Array(arg: unknown): arg is Float32Array {
    return isKind(arg, "Float32Array");
}

/**
 * Check if argument is Float64Array
 * @param arg
 * @returns {boolean}
 */
export function isFloat64Array(arg: unknown): arg is Float64Array {
    return isKind(arg, "Float64Array");
}

export function isBigUint64Array(arg: unknown): arg is BigUint64Array {
    return isKind(arg, "BigUint64Array");
}
export function isBigInt64Array(arg: unknown): arg is BigInt64Array {
    return isKind(arg, "BigInt64Array");
}

export function isBigInt(arg: unknown): arg is bigint {
    return isKind(arg, "bigint");
}

/**
 * Check if argument is Boolean
 * @param arg
 * @returns {boolean}
 */
export function isBoolean(arg: unknown): arg is boolean {
    return isKind(arg, "boolean");
}

/**
 * Check if argument is a blob
 * @param arg
 * @returns {boolean}
 */
export function isBlob(arg: unknown): arg is Blob {
    return isKind(arg, "blob");
}

/**
 * Check if argument is Buffer
 * @param arg
 * @returns {boolean}
 */
export function isBuffer(arg: unknown): arg is Buffer {
    return Buffer.isBuffer(arg);
}

/**
 * Check if argument is Date
 * @param arg
 * @returns {boolean}
 */
export function isDate(arg: unknown): arg is Date {
    return isKind(arg, "date");
}

/**
 * Simple check if argument is in e-mail format
 * @param {string} arg
 * @param {boolean} matches
 * @returns {boolean | string[] | null}
 *
 * ATTENTION: This function can cause a [Regular Expression Denial of Service (ReDoS)]:https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
 */
export function isEmailFormat(arg: string, matches: boolean = false): boolean | null | string[] {
    return matches
        ? // eslint-disable-next-line security/detect-unsafe-regex
          /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,15}$/i.exec(arg)
        : // eslint-disable-next-line security/detect-unsafe-regex
          /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,15}$/i.test(arg);
}

/**
 * Check if argument is empty
 * @param arg
 * @returns {boolean}
 */
export function isEmpty(arg: unknown): boolean {
    return isNullOrUndefined(arg)
        ? true
        : isString(arg)
          ? StringUtil.isEmpty(arg)
          : isArray(arg)
            ? ArrayUtil.isEmpty(arg as Array<unknown>)
            : isMap(arg)
              ? !(arg as Map<unknown, unknown>).size
              : isSet(arg)
                ? !(arg as Set<unknown>).size
                : isBuffer(arg)
                  ? !arg.byteLength
                  : isObject(arg)
                    ? ObjectUtil.isEmpty(arg as TObject)
                    : !isBoolean(arg) && !isNumber(arg);
}

/**
 * Check if argument is Error
 * @param arg
 * @returns {boolean}
 */
export function isError(arg: unknown): arg is Error {
    return isKind(arg, "error");
}

/**
 * Check if argument is function
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(arg: unknown): arg is Function {
    return isKind(arg, "function");
}

/**
 * Check if argument is Function or AsyncFunction
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-function-type
export function isFunctionType(arg: unknown): arg is Function | Promise<any> {
    return isFunction(arg) || isAsyncFunction(arg);
}

/**
 * Check if argument is AsyncFunction
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAsyncFunction(arg: unknown): arg is Promise<any> {
    const AsyncFunction = (async () => {
        //empty
    }).constructor;
    if (
        (arg instanceof AsyncFunction && AsyncFunction !== Function) ||
        arg instanceof Promise ||
        ("isAsyncFunction" in util.types && util.types.isAsyncFunction(arg))
    ) {
        return true;
    }
    let promise;
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        promise = (arg as CallableFunction)();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        //empty
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return promise && isFunction(promise.then) && promise[Symbol.toStringTag] === "Promise";
}

/**
 * Check if argument is Integer
 * @param arg
 * @returns {boolean}
 */
export function isInteger(arg: unknown): arg is number {
    return isNumber(arg) && arg % 1 === 0;
}



/**
 * Check if two arguments are of same type
 * @param arg1
 * @param arg2
 * @returns {boolean}
 */
export function isKindEqual(arg1: unknown, arg2: unknown): boolean {
    return kindOf(arg1).toLowerCase() === kindOf(arg2).toLowerCase();
}
/**
 * Check if argument is Iterable
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIterable(arg: unknown): arg is Iterable<any> {
    return !isNullOrUndefined(arg) && isFunction((arg as never)[Symbol.iterator]);
}

/**
 * Check if argument is AsyncIterable
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAsyncIterable(arg: unknown): arg is AsyncIterable<any> {
    return !isNullOrUndefined(arg) && isFunction((arg as never)[Symbol.asyncIterator]);
}

/**
 * Check if argument is Map
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMap(arg: unknown): arg is Map<any, any> {
    return isKind(arg, "map");
}

/**
 * Check if argument is null
 * @param arg
 * @returns {boolean}
 */
export function isNull(arg: unknown): arg is null {
    return arg === null;
}

/**
 * Check if argument is null or undefined
 * @param arg
 * @returns {boolean}
 */
export function isNullOrUndefined(arg: unknown): arg is null | undefined {
    return isNull(arg) || isUndefined(arg);
}

/**
 * Check if argument is Number
 * @param arg
 * @returns {boolean}
 */
export function isNumber(arg: unknown): arg is number {
    return isKind(arg, "number");
}

/**
 * Check if argument is numeric type, check if is number or a string that can be converted into number
 * @param arg
 * @returns {boolean}
 */
export function isNumeric(arg: unknown): arg is number {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return isNumber(arg) || (isString(arg) && parseInt(arg, 10) == arg);
}

/**
 * Check if argument is a alpha sequence of type a..z or as defined by regex argument
 * @param arg
 * @param {RegExp} regex
 * @returns {boolean}
 */
export function isAlphaSequence(arg: unknown, regex?: RegExp): boolean {
    // eslint-disable-next-line security/detect-unsafe-regex
    return isSequence(arg, regex || /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/);
}

/**
 * Check if argument is a numeric sequence of type 1..5 or as defined by regex argument
 * @param arg
 * @param {RegExp} regex
 * @returns {boolean}
 */
export function isNumericSequence(arg: unknown, regex?: RegExp): boolean {
    // eslint-disable-next-line security/detect-unsafe-regex
    return isSequence(arg, regex || /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/);
}

/**
 * Check if argument is a sequence based on given regexp
 * @param arg
 * @param {RegExp} regex
 * @returns {boolean}
 */
export function isSequence(arg: unknown, regex: RegExp): boolean {
    return regex.test(StringUtil.toString(arg));
}

/**
 * Check if argument is Object
 * @param arg
 * @returns {boolean}
 */
export function isObject(arg: unknown): arg is object {
    return !isNullOrUndefined(arg) && isKind(arg, "object");
}

/**
 * Check if argument is a plain object
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPlainObject(arg: unknown): arg is Record<PropertyKey, any> {
    return (
        !!arg &&
        isObject(arg) &&
        isFunction((arg as FunctionConstructor).constructor) &&
        isObject((arg as ObjectConstructor).constructor.prototype) &&
        Object.prototype.hasOwnProperty.call((arg as ObjectConstructor).constructor.prototype, "isPrototypeOf")
    );
}
/**
 * Check if argument is of primitive type
 * @param arg
 * @returns {boolean}
 */
export function isPrimitive(arg: unknown): arg is Primitive {
    return isBigInt(arg) || isBoolean(arg) || isNumber(arg) || isString(arg) || isSymbol(arg) || isNullOrUndefined(arg); //["string", "number", "boolean"].indexOf(typeof arg) !== -1 ? true : isNullOrUndefined(arg);
}
/**
 * Check if argument is a Promise
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPromise(arg: unknown): arg is Promise<any> {
    return isKind(arg, "promise");
}

/**
 * Check if argument is RegExp
 * @param arg
 * @returns {boolean}
 */
export function isRegExp(arg: unknown): arg is RegExp {
    return isKind(arg, "RegExp");
}

/**
 * Check if argument is Set
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSet(arg: unknown): arg is Set<any> {
    return isKind(arg, "set");
}

/**
 * Check if argument is String
 * @param arg
 * @returns {boolean}
 */
export function isString(arg: unknown): arg is string {
    return isKind(arg, "string");
}

/**
 * Check if argument is Symbol
 * @param arg
 * @returns {boolean}
 */
export function isSymbol(arg: unknown): arg is symbol {
    return isKind(arg, "symbol");
}

/**
 * Check if argument is Undefined
 * @param arg
 * @returns {boolean}
 */
export function isUndefined(arg?: unknown): arg is undefined {
    return typeof arg === "undefined";
}

/**
 * Returns a value indicating whether a URL is relative.
 * A relative URL does not have host info part.
 * @param {string} url - the URL to be checked
 * @return {boolean} whether the URL is relative
 */
export function isUrlRelative(url: string): boolean {
    return !url.startsWith("//") && url.indexOf("://") === -1;
}

/**
 * Return a string with the type of the object
 * @param arg
 * @returns {string}
 */
export function kindOf(arg: unknown): string {
    return arg === null
        ? "null"
        : arg === undefined
          ? "undefined"
          : (/^\[object (.*)]$/.exec(Object.prototype.toString.call(arg)) as RegExpExecArray)[1];
}

/**
 * Return the Enum value of the type of the argument
 * @param arg
 * @returns {EnumTypes}
 */
export function getEnumType(arg: unknown): EnumTypes {
    if (isArray(arg)) {
        return EnumTypes.Array;
    } else if (isPromise(arg)) {
        return EnumTypes.Promise;
    } else if (isAsyncFunction(arg)) {
        return EnumTypes.AsyncFunction;
    } else if (isBigInt(arg)) {
        return EnumTypes.BigInt;
    } else if (isBoolean(arg)) {
        return EnumTypes.Boolean;
    } else if (isBuffer(arg)) {
        return EnumTypes.Buffer;
    } else if (isDate(arg)) {
        return EnumTypes.Date;
    } else if (isError(arg)) {
        return EnumTypes.Error;
    } else if (isFunction(arg)) {
        return EnumTypes.Function;
    } else if (isMap(arg)) {
        return EnumTypes.Map;
    } else if (isNull(arg)) {
        return EnumTypes.Null;
    } else if (isNumber(arg)) {
        return EnumTypes.Number;
    } else if (isObject(arg)) {
        return EnumTypes.Object;
    } else if (isPlainObject(arg)) {
        return EnumTypes.PlainObject;
    } else if (isRegExp(arg)) {
        return EnumTypes.RegExp;
    } else if (isSet(arg)) {
        return EnumTypes.Set;
    } else if (isString(arg)) {
        return EnumTypes.String;
    } else if (isSymbol(arg)) {
        return EnumTypes.Symbol;
    } else if (isTypedArray(arg)) {
        return EnumTypes.TypedArray;
    } else if (isUndefined(arg)) {
        return EnumTypes.Undefined;
    } else {
        return EnumTypes.NotDefined;
    }
}

/**
 * Return content type from extension
 * @param {string} ext
 * @returns {string}
 */
export function getContentType(ext: string): string {
    if (ext[0] === ".") {
        ext = ext.substring(1);
    }

    const extension: Record<string, string> = {
        "123": "application/vnd.lotus-1-2-3",
        "": "application/pgp-encrypted",
        "3dml": "text/vnd.in3d.3dml",
        "3g2": "video/3gpp2",
        "3gp": "video/3gpp",
        "7z": "application/x-7z-compressed",
        "N/A": "application/andrew-inset",
        aab: "application/x-authorware-bin",
        aac: "audio/x-aac",
        aam: "application/x-authorware-map",
        aas: "application/x-authorware-seg",
        abw: "application/x-abiword",
        ac: "application/pkix-attr-cert",
        acc: "application/vnd.americandynamics.acc",
        ace: "application/x-ace-compressed",
        acu: "application/vnd.acucobol",
        adp: "audio/adpcm",
        aep: "application/vnd.audiograph",
        afp: "application/vnd.ibm.modcap",
        ahead: "application/vnd.ahead.space",
        ai: "application/postscript",
        aif: "audio/x-aiff",
        air: "application/vnd.adobe.air-application-installer-package+zip",
        ait: "application/vnd.dvb.ait",
        ami: "application/vnd.amiga.ami",
        apk: "application/vnd.android.package-archive",
        appcache: "text/cache-manifest",
        application: "application/x-ms-application",
        apr: "application/vnd.lotus-approach",
        asf: "video/x-ms-asf",
        aso: "application/vnd.accpac.simply.aso",
        atc: "application/vnd.acucorp",
        "atom, .xml": "application/atom+xml",
        atomcat: "application/atomcat+xml",
        atomsvc: "application/atomsvc+xml",
        atx: "application/vnd.antix.game-component",
        au: "audio/basic",
        avi: "video/avi",
        aw: "application/applixware",
        azf: "application/vnd.airzip.filesecure.azf",
        azs: "application/vnd.airzip.filesecure.azs",
        azw: "application/vnd.amazon.ebook",
        bcpio: "application/x-bcpio",
        bdf: "application/x-font-bdf",
        bdm: "application/vnd.syncml.dm+wbxml",
        bed: "application/vnd.realvnc.bed",
        bh2: "application/vnd.fujitsu.oasysprs",
        bin: "application/octet-stream",
        bmi: "application/vnd.bmi",
        bmp: "image/bmp",
        box: "application/vnd.previewsystems.box",
        btif: "image/prs.btif",
        bz: "application/x-bzip",
        bz2: "application/x-bzip2",
        c: "text/x-c",
        c11amc: "application/vnd.cluetrust.cartomobile-config",
        c11amz: "application/vnd.cluetrust.cartomobile-config-pkg",
        c4g: "application/vnd.clonk.c4group",
        cab: "application/vnd.ms-cab-compressed",
        car: "application/vnd.curl.car",
        cat: "application/vnd.ms-pki.seccat",
        ccxml: "application/ccxml+xml,",
        cdbcmsg: "application/vnd.contact.cmsg",
        cdkey: "application/vnd.mediastation.cdkey",
        cdmia: "application/cdmi-capability",
        cdmic: "application/cdmi-container",
        cdmid: "application/cdmi-domain",
        cdmio: "application/cdmi-object",
        cdmiq: "application/cdmi-queue",
        cdx: "chemical/x-cdx",
        cdxml: "application/vnd.chemdraw+xml",
        cdy: "application/vnd.cinderella",
        cer: "application/pkix-cert",
        cgm: "image/cgm",
        chat: "application/x-chat",
        chm: "application/vnd.ms-htmlhelp",
        chrt: "application/vnd.kde.kchart",
        cif: "chemical/x-cif",
        cii: "application/vnd.anser-web-certificate-issue-initiation",
        cil: "application/vnd.ms-artgalry",
        cla: "application/vnd.claymore",
        class: "application/java-vm",
        clkk: "application/vnd.crick.clicker.keyboard",
        clkp: "application/vnd.crick.clicker.palette",
        clkt: "application/vnd.crick.clicker.template",
        clkw: "application/vnd.crick.clicker.wordbank",
        clkx: "application/vnd.crick.clicker",
        clp: "application/x-msclip",
        cmc: "application/vnd.cosmocaller",
        cmdf: "chemical/x-cmdf",
        cml: "chemical/x-cml",
        cmp: "application/vnd.yellowriver-custom-menu",
        cmx: "image/x-cmx",
        cod: "application/vnd.rim.cod",
        cpio: "application/x-cpio",
        cpt: "application/mac-compactpro",
        crd: "application/x-mscardfile",
        crl: "application/pkix-crl",
        cryptonote: "application/vnd.rig.cryptonote",
        csh: "application/x-csh",
        csml: "chemical/x-csml",
        csp: "application/vnd.commonspace",
        css: "text/css",
        csv: "text/csv",
        cu: "application/cu-seeme",
        curl: "text/vnd.curl",
        cww: "application/prs.cww",
        dae: "model/vnd.collada+xml",
        daf: "application/vnd.mobius.daf",
        davmount: "application/davmount+xml",
        dcurl: "text/vnd.curl.dcurl",
        dd2: "application/vnd.oma.dd2+xml",
        ddd: "application/vnd.fujixerox.ddd",
        deb: "application/x-debian-package",
        der: "application/x-x509-ca-cert",
        dfac: "application/vnd.dreamfactory",
        dir: "application/x-director",
        dis: "application/vnd.mobius.dis",
        djvu: "image/vnd.djvu",
        dna: "application/vnd.dna",
        doc: "application/msword",
        docm: "application/vnd.ms-word.document.macroenabled.12",
        docx: "application/msword",
        dotm: "application/vnd.ms-word.template.macroenabled.12",
        dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
        dp: "application/vnd.osgi.dp",
        dpg: "application/vnd.dpgraph",
        dra: "audio/vnd.dra",
        dsc: "text/prs.lines.tag",
        dssc: "application/dssc+der",
        dtb: "application/x-dtbook+xml",
        dtd: "application/xml-dtd",
        dts: "audio/vnd.dts",
        dtshd: "audio/vnd.dts.hd",
        dvi: "application/x-dvi",
        dwf: "model/vnd.dwf",
        dwg: "image/vnd.dwg",
        dxf: "image/vnd.dxf",
        dxp: "application/vnd.spotfire.dxp",
        ecelp4800: "audio/vnd.nuera.ecelp4800",
        ecelp7470: "audio/vnd.nuera.ecelp7470",
        ecelp9600: "audio/vnd.nuera.ecelp9600",
        edm: "application/vnd.novadigm.edm",
        edx: "application/vnd.novadigm.edx",
        efif: "application/vnd.picsel",
        ei6: "application/vnd.pg.osasli",
        eml: "message/rfc822",
        emma: "application/emma+xml",
        eol: "audio/vnd.digital-winds",
        eot: "application/vnd.ms-fontobject",
        eps: "application/postscript",
        epub: "application/epub+zip",
        es: "application/ecmascript",
        es3: "application/vnd.eszigno3+xml",
        esf: "application/vnd.epson.esf",
        etx: "text/x-setext",
        exe: "application/octet-stream",
        exi: "application/exi",
        ext: "application/vnd.novadigm.ext",
        ez2: "application/vnd.ezpix-album",
        ez3: "application/vnd.ezpix-package",
        f: "text/x-fortran",
        f4v: "video/x-f4v",
        fbs: "image/vnd.fastbidsheet",
        fcs: "application/vnd.isac.fcs",
        fdf: "application/vnd.fdf",
        fe_launch: "application/vnd.denovo.fcselayout-link",
        fg5: "application/vnd.fujitsu.oasysgp",
        fh: "image/x-freehand",
        fig: "application/x-xfig",
        fli: "video/x-fli",
        flo: "application/vnd.micrografx.flo",
        flv: "video/x-flv",
        flw: "application/vnd.kde.kivio",
        flx: "text/vnd.fmi.flexstor",
        fly: "text/vnd.fly",
        fm: "application/vnd.framemaker",
        fnc: "application/vnd.frogans.fnc",
        fpx: "image/vnd.fpx",
        fsc: "application/vnd.fsc.weblaunch",
        fst: "image/vnd.fst",
        ftc: "application/vnd.fluxtime.clip",
        fti: "application/vnd.anser-web-funds-transfer-initiation",
        fvt: "video/vnd.fvt",
        fxp: "application/vnd.adobe.fxp",
        fzs: "application/vnd.fuzzysheet",
        g2w: "application/vnd.geoplan",
        g3: "image/g3fax",
        g3w: "application/vnd.geospace",
        gac: "application/vnd.groove-account",
        gdl: "model/vnd.gdl",
        geo: "application/vnd.dynageo",
        gex: "application/vnd.geometry-explorer",
        ggb: "application/vnd.geogebra.file",
        ggt: "application/vnd.geogebra.tool",
        ghf: "application/vnd.groove-help",
        gif: "image/gif",
        gim: "application/vnd.groove-identity-message",
        gmx: "application/vnd.gmx",
        gnumeric: "application/x-gnumeric",
        gph: "application/vnd.flographit",
        gqf: "application/vnd.grafeq",
        gram: "application/srgs",
        grv: "application/vnd.groove-injector",
        grxml: "application/srgs+xml",
        gsf: "application/x-font-ghostscript",
        gtar: "application/x-gtar",
        gtm: "application/vnd.groove-tool-message",
        gtw: "model/vnd.gtw",
        gv: "text/vnd.graphviz",
        gxt: "application/vnd.geonext",
        gzip: "application/x-gzip",
        h261: "video/h261",
        h263: "video/h263",
        h264: "video/h264",
        hal: "application/vnd.hal+xml",
        hbci: "application/vnd.hbci",
        hdf: "application/x-hdf",
        hlp: "application/winhlp",
        hpgl: "application/vnd.hp-hpgl",
        hpid: "application/vnd.hp-hpid",
        hps: "application/vnd.hp-hps",
        hqx: "application/mac-binhex40",
        htke: "application/vnd.kenameaapp",
        htm: "text/html",
        html: "text/html",
        hvd: "application/vnd.yamaha.hv-dic",
        hvp: "application/vnd.yamaha.hv-voice",
        hvs: "application/vnd.yamaha.hv-script",
        i2g: "application/vnd.intergeo",
        icc: "application/vnd.iccprofile",
        ice: "x-conference/x-cooltalk",
        ico: "image/x-icon",
        ics: "text/calendar",
        ief: "image/ief",
        ifb: "text/calendar",
        ifm: "application/vnd.shana.informed.formdata",
        igl: "application/vnd.igloader",
        igm: "application/vnd.insors.igm",
        igs: "model/iges",
        igx: "application/vnd.micrografx.igx",
        iif: "application/vnd.shana.informed.interchange",
        imp: "application/vnd.accpac.simply.imp",
        ims: "application/vnd.ms-ims",
        ipfix: "application/ipfix",
        ipk: "application/vnd.shana.informed.package",
        irm: "application/vnd.ibm.rights-management",
        irp: "application/vnd.irepository.package+xml",
        itp: "application/vnd.shana.informed.formtemplate",
        ivp: "application/vnd.immervision-ivp",
        ivu: "application/vnd.immervision-ivu",
        jad: "text/vnd.sun.j2me.app-descriptor",
        jam: "application/vnd.jam",
        jar: "application/java-archive",
        java: "text/x-java-source,java",
        jisp: "application/vnd.jisp",
        jlt: "application/vnd.hp-jlyt",
        jnlp: "application/x-java-jnlp-file",
        joda: "application/vnd.joost.joda-archive",
        jpe: "image/jpeg",
        jpeg: "image/jpeg",
        "jpeg, .jpg": "image/jpeg",
        jpg: "image/jpeg",
        jpgv: "video/jpeg",
        jpm: "video/jpm",
        js: "text/javascript",
        json: "application/json",
        karbon: "application/vnd.kde.karbon",
        kfo: "application/vnd.kde.kformula",
        kia: "application/vnd.kidspiration",
        kml: "application/vnd.google-earth.kml+xml",
        kmz: "application/vnd.google-earth.kmz",
        kne: "application/vnd.kinar",
        kon: "application/vnd.kde.kontour",
        kpr: "application/vnd.kde.kpresenter",
        ksp: "application/vnd.kde.kspread",
        ktx: "image/ktx",
        ktz: "application/vnd.kahootz",
        kwd: "application/vnd.kde.kword",
        lasxml: "application/vnd.las.las+xml",
        latex: "application/x-latex",
        lbd: "application/vnd.llamagraphics.life-balance.desktop",
        lbe: "application/vnd.llamagraphics.life-balance.exchange+xml",
        les: "application/vnd.hhe.lesson-player",
        less: "text/css",
        link66: "application/vnd.route66.link66+xml",
        lrm: "application/vnd.ms-lrm",
        ltf: "application/vnd.frogans.ltf",
        lvp: "audio/vnd.lucent.voice",
        lwp: "application/vnd.lotus-wordpro",
        m21: "application/mp21",
        m3u: "audio/x-mpegurl",
        m3u8: "application/vnd.apple.mpegurl",
        m4a: "audio/mp4a-latm",
        m4v: "video/x-m4v",
        ma: "application/mathematica",
        mads: "application/mads+xml",
        mag: "application/vnd.ecowin.chart",
        mathml: "application/mathml+xml",
        mbk: "application/vnd.mobius.mbk",
        mbox: "application/mbox",
        mc1: "application/vnd.medcalcdata",
        mcd: "application/vnd.mcd",
        mcurl: "text/vnd.curl.mcurl",
        md: "text/markdown",
        mdb: "application/x-msaccess",
        mdi: "image/vnd.ms-modi",
        meta4: "application/metalink4+xml",
        mets: "application/mets+xml",
        mfm: "application/vnd.mfmp",
        mgp: "application/vnd.osgeo.mapguide.package",
        mgz: "application/vnd.proteus.magazine",
        mid: "audio/midi",
        midi: "audio/midi",
        mif: "application/vnd.mif",
        mj2: "video/mj2",
        mlp: "application/vnd.dolby.mlp",
        mmd: "application/vnd.chipnuts.karaoke-mmd",
        mmf: "application/vnd.smaf",
        mmr: "image/vnd.fujixerox.edmics-mmr",
        mny: "application/x-msmoney",
        mods: "application/mods+xml",
        mov: "video/quicktime",
        movie: "video/x-sgi-movie",
        mp3: "audio/mpeg",
        mp4: "video/mp4",
        mp4a: "audio/mp4",
        mpc: "application/vnd.mophun.certificate",
        mpe: "video/mpeg",
        mpeg: "video/mpeg",
        mpg: "video/mpeg",
        mpga: "audio/mpeg",
        mpkg: "application/vnd.apple.installer+xml",
        mpm: "application/vnd.blueice.multipass",
        mpn: "application/vnd.mophun.application",
        mpp: "application/vnd.ms-project",
        mpy: "application/vnd.ibm.minipay",
        mqy: "application/vnd.mobius.mqy",
        mrc: "application/marc",
        mrcx: "application/marcxml+xml",
        mscml: "application/mediaservercontrol+xml",
        mseq: "application/vnd.mseq",
        msf: "application/vnd.epson.msf",
        msh: "model/mesh",
        msl: "application/vnd.mobius.msl",
        msty: "application/vnd.muvee.style",
        mts: "model/vnd.mts",
        mus: "application/vnd.musician",
        musicxml: "application/vnd.recordare.musicxml+xml",
        mv4: "video/mv4",
        mvb: "application/x-msmediaview",
        mwf: "application/vnd.mfer",
        mxf: "application/mxf",
        mxl: "application/vnd.recordare.musicxml",
        mxml: "application/xv+xml",
        mxs: "application/vnd.triscape.mxs",
        mxu: "video/vnd.mpegurl",
        "n-gage": "application/vnd.nokia.n-gage.symbian.install",
        n3: "text/n3",
        nbp: "application/vnd.wolfram.player",
        nc: "application/x-netcdf",
        ncx: "application/x-dtbncx+xml",
        ngdat: "application/vnd.nokia.n-gage.data",
        nlu: "application/vnd.neurolanguage.nlu",
        nml: "application/vnd.enliven",
        nnd: "application/vnd.noblenet-directory",
        nns: "application/vnd.noblenet-sealer",
        nnw: "application/vnd.noblenet-web",
        npx: "image/vnd.net-fpx",
        nsf: "application/vnd.lotus-notes",
        oa2: "application/vnd.fujitsu.oasys2",
        oa3: "application/vnd.fujitsu.oasys3",
        oas: "application/vnd.fujitsu.oasys",
        obd: "application/x-msbinder",
        oda: "application/oda",
        odb: "application/vnd.oasis.opendocument.database",
        odc: "application/vnd.oasis.opendocument.chart",
        odf: "application/vnd.oasis.opendocument.formula",
        odft: "application/vnd.oasis.opendocument.formula-template",
        odg: "application/vnd.oasis.opendocument.graphics",
        odi: "application/vnd.oasis.opendocument.image",
        odm: "application/vnd.oasis.opendocument.text-master",
        odp: "application/vnd.oasis.opendocument.presentation",
        ods: "application/vnd.oasis.opendocument.spreadsheet",
        odt: "application/vnd.oasis.opendocument.text",
        oga: "audio/ogg",
        ogg: "application/ogg",
        ogv: "video/ogg",
        ogx: "application/ogg",
        onetoc: "application/onenote",
        opf: "application/oebps-package+xml",
        org: "application/vnd.lotus-organizer",
        osf: "application/vnd.yamaha.openscoreformat",
        osfpvg: "application/vnd.yamaha.openscoreformat.osfpvg+xml",
        otc: "application/vnd.oasis.opendocument.chart-template",
        otf: "application/x-font-otf",
        otg: "application/vnd.oasis.opendocument.graphics-template",
        oth: "application/vnd.oasis.opendocument.text-web",
        oti: "application/vnd.oasis.opendocument.image-template",
        otp: "application/vnd.oasis.opendocument.presentation-template",
        ots: "application/vnd.oasis.opendocument.spreadsheet-template",
        ott: "application/vnd.oasis.opendocument.text-template",
        oxt: "application/vnd.openofficeorg.extension",
        p: "text/x-pascal",
        p10: "application/pkcs10",
        p12: "application/x-pkcs12",
        p7b: "application/x-pkcs7-certificates",
        p7m: "application/pkcs7-mime",
        p7r: "application/x-pkcs7-certreqresp",
        p7s: "application/pkcs7-signature",
        p8: "application/pkcs8",
        par: "text/plain-bas",
        paw: "application/vnd.pawaafile",
        pbd: "application/vnd.powerbuilder6",
        pbm: "image/x-portable-bitmap",
        pcf: "application/x-font-pcf",
        pcl: "application/vnd.hp-pcl",
        pclxl: "application/vnd.hp-pclxl",
        pcurl: "application/vnd.curl.pcurl",
        pcx: "image/x-pcx",
        pdb: "application/vnd.palm",
        pdf: "application/pdf",
        pfa: "application/x-font-type1",
        pfr: "application/font-tdpfr",
        pgm: "image/x-portable-graymap",
        pgn: "application/x-chess-pgn",
        pgp: "application/pgp-signature",
        pic: "image/x-pict",
        pki: "application/pkixcmp",
        pkipath: "application/pkix-pkipath",
        plb: "application/vnd.3gpp.pic-bw-large",
        plc: "application/vnd.mobius.plc",
        plf: "application/vnd.pocketlearn",
        pls: "application/pls+xml",
        pml: "application/vnd.ctc-posml",
        png: "image/png",
        pnm: "image/x-portable-anymap",
        portpkg: "application/vnd.macports.portpkg",
        potm: "application/vnd.ms-powerpoint.template.macroenabled.12",
        potx: "application/vnd.openxmlformats-officedocument.presentationml.template",
        ppam: "application/vnd.ms-powerpoint.addin.macroenabled.12",
        ppd: "application/vnd.cups-ppd",
        ppm: "image/x-portable-pixmap",
        ppsm: "application/vnd.ms-powerpoint.slideshow.macroenabled.12",
        ppsx: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
        ppt: "application/vnd.ms-powerpoint",
        pptm: "application/vnd.ms-powerpoint.presentation.macroenabled.12",
        pptx: "application/vnd.ms-powerpoint",
        prc: "application/x-mobipocket-ebook",
        pre: "application/vnd.lotus-freelance",
        prf: "application/pics-rules",
        ps: "application/postscript",
        psb: "application/vnd.3gpp.pic-bw-small",
        psd: "image/vnd.adobe.photoshop",
        psf: "application/x-font-linux-psf",
        pskcxml: "application/pskc+xml",
        ptid: "application/vnd.pvi.ptid1",
        pub: "application/x-mspublisher",
        pvb: "application/vnd.3gpp.pic-bw-var",
        pwn: "application/vnd.3m.post-it-notes",
        pya: "audio/vnd.ms-playready.media.pya",
        pyv: "video/vnd.ms-playready.media.pyv",
        qam: "application/vnd.epson.quickanime",
        qbo: "application/vnd.intu.qbo",
        qfx: "application/vnd.intu.qfx",
        qps: "application/vnd.publishare-delta-tree",
        qt: "video/quicktime",
        qxd: "application/vnd.quark.quarkxpress",
        ram: "audio/x-pn-realaudio",
        rar: "application/x-rar-compressed",
        ras: "image/x-cmu-raster",
        rcprofile: "application/vnd.ipunplugged.rcprofile",
        rdf: "application/rdf+xml",
        rdz: "application/vnd.data-vision.rdz",
        rep: "application/vnd.businessobjects",
        res: "application/x-dtbresource+xml",
        rgb: "image/x-rgb",
        rif: "application/reginfo+xml",
        rip: "audio/vnd.rip",
        rl: "application/resource-lists+xml",
        rlc: "image/vnd.fujixerox.edmics-rlc",
        rld: "application/resource-lists-diff+xml",
        rm: "application/vnd.rn-realmedia",
        rmp: "audio/x-pn-realaudio-plugin",
        rms: "application/vnd.jcp.javame.midlet-rms",
        rnc: "application/relax-ng-compact-syntax",
        rp9: "application/vnd.cloanto.rp9",
        rpss: "application/vnd.nokia.radio-presets",
        rpst: "application/vnd.nokia.radio-preset",
        rq: "application/sparql-query",
        rs: "application/rls-services+xml",
        rsd: "application/rsd+xml",
        "rss, .xml": "application/rss+xml",
        rtf: "text/rtf",
        rtx: "text/richtext",
        s: "text/x-asm",
        saf: "application/vnd.yamaha.smaf-audio",
        sass: "text/css",
        sbml: "application/sbml+xml",
        sc: "application/vnd.ibm.secure-container",
        scd: "application/x-msschedule",
        scm: "application/vnd.lotus-screencam",
        scq: "application/scvp-cv-request",
        scs: "application/scvp-cv-response",
        scurl: "text/vnd.curl.scurl",
        sda: "application/vnd.stardivision.draw",
        sdc: "application/vnd.stardivision.calc",
        sdd: "application/vnd.stardivision.impress",
        sdkm: "application/vnd.solent.sdkm+xml",
        sdp: "application/sdp",
        sdw: "application/vnd.stardivision.writer",
        see: "application/vnd.seemail",
        seed: "application/vnd.fdsn.seed",
        sema: "application/vnd.sema",
        semd: "application/vnd.semd",
        semf: "application/vnd.semf",
        ser: "application/java-serialized-object",
        setpay: "application/set-payment-initiation",
        setreg: "application/set-registration-initiation",
        "sfd-hdstx": "application/vnd.hydrostatix.sof-data",
        sfs: "application/vnd.spotfire.sfs",
        sgl: "application/vnd.stardivision.writer-global",
        sgml: "text/sgml",
        sh: "application/x-sh",
        shar: "application/x-shar",
        shf: "application/shf+xml",
        sis: "application/vnd.symbian.install",
        sit: "application/x-stuffit",
        sitx: "application/x-stuffitx",
        skp: "application/vnd.koan",
        sldm: "application/vnd.ms-powerpoint.slide.macroenabled.12",
        sldx: "application/vnd.openxmlformats-officedocument.presentationml.slide",
        slt: "application/vnd.epson.salt",
        sm: "application/vnd.stepmania.stepchart",
        smf: "application/vnd.stardivision.math",
        smi: "application/smil+xml",
        snf: "application/x-font-snf",
        spf: "application/vnd.yamaha.smaf-phrase",
        spl: "application/x-futuresplash",
        spot: "text/vnd.in3d.spot",
        spp: "application/scvp-vp-response",
        spq: "application/scvp-vp-request",
        src: "application/x-wais-source",
        sru: "application/sru+xml",
        srx: "application/sparql-results+xml",
        sse: "application/vnd.kodak-descriptor",
        ssf: "application/vnd.epson.ssf",
        ssml: "application/ssml+xml",
        st: "application/vnd.sailingtracker.track",
        stc: "application/vnd.sun.xml.calc.template",
        std: "application/vnd.sun.xml.draw.template",
        stf: "application/vnd.wt.stf",
        sti: "application/vnd.sun.xml.impress.template",
        stk: "application/hyperstudio",
        stl: "application/vnd.ms-pki.stl",
        str: "application/vnd.pg.format",
        stw: "application/vnd.sun.xml.writer.template",
        sub: "image/vnd.dvb.subtitle",
        sus: "application/vnd.sus-calendar",
        sv4cpio: "application/x-sv4cpio",
        sv4crc: "application/x-sv4crc",
        svc: "application/vnd.dvb.service",
        svd: "application/vnd.svd",
        svg: "image/svg+xml",
        swf: "application/x-shockwave-flash",
        swi: "application/vnd.aristanetworks.swi",
        sxc: "application/vnd.sun.xml.calc",
        sxd: "application/vnd.sun.xml.draw",
        sxg: "application/vnd.sun.xml.writer.global",
        sxi: "application/vnd.sun.xml.impress",
        sxm: "application/vnd.sun.xml.math",
        sxw: "application/vnd.sun.xml.writer",
        t: "text/troff",
        tao: "application/vnd.tao.intent-module-archive",
        tar: "application/x-tar",
        tcap: "application/vnd.3gpp2.tcap",
        tcl: "application/x-tcl",
        teacher: "application/vnd.smart.teacher",
        tei: "application/tei+xml",
        tex: "application/x-tex",
        texinfo: "application/x-texinfo",
        tfi: "application/thraud+xml",
        tfm: "application/x-tex-tfm",
        thmx: "application/vnd.ms-officetheme",
        tif: "image/tiff",
        tiff: "image/tiff",
        tmo: "application/vnd.tmobile-livetv",
        torrent: "application/x-bittorrent",
        tpl: "application/vnd.groove-tool-template",
        tpt: "application/vnd.trid.tpt",
        tra: "application/vnd.trueapp",
        trm: "application/x-msterminal",
        tsd: "application/timestamped-data",
        tsv: "text/tab-separated-values",
        ttf: "application/x-font-ttf",
        ttl: "text/turtle",
        twd: "application/vnd.simtech-mindmapper",
        txd: "application/vnd.genomatix.tuxedo",
        txf: "application/vnd.mobius.txf",
        txt: "text/plain",
        ufd: "application/vnd.ufdl",
        umj: "application/vnd.umajin",
        unityweb: "application/vnd.unity",
        uoml: "application/vnd.uoml+xml",
        uri: "text/uri-list",
        ustar: "application/x-ustar",
        utz: "application/vnd.uiq.theme",
        uu: "text/x-uuencode",
        uva: "audio/vnd.dece.audio",
        uvh: "video/vnd.dece.hd",
        uvi: "image/vnd.dece.graphic",
        uvm: "video/vnd.dece.mobile",
        uvp: "video/vnd.dece.pd",
        uvs: "video/vnd.dece.sd",
        uvu: "video/vnd.uvvu.mp4",
        uvv: "video/vnd.dece.video",
        vcd: "application/x-cdlink",
        vcf: "text/x-vcard",
        vcg: "application/vnd.groove-vcard",
        vcs: "text/x-vcalendar",
        vcx: "application/vnd.vcx",
        vis: "application/vnd.visionary",
        viv: "video/vnd.vivo",
        vsd: "application/vnd.visio",
        vsf: "application/vnd.vsf",
        vtu: "model/vnd.vtu",
        vxml: "application/voicexml+xml",
        wad: "application/x-doom",
        wav: "audio/x-wav",
        wax: "audio/x-ms-wax",
        wbmp: "image/vnd.wap.wbmp",
        wbs: "application/vnd.criticaltools.wbs+xml",
        wbxml: "application/vnd.wap.wbxml",
        weba: "audio/webm",
        webm: "video/webm",
        webp: "image/webp",
        wg: "application/vnd.pmi.widget",
        wgt: "application/widget",
        wm: "video/x-ms-wm",
        wma: "audio/x-ms-wma",
        wmd: "application/x-ms-wmd",
        wmf: "application/x-msmetafile",
        wml: "text/vnd.wap.wml",
        wmlc: "application/vnd.wap.wmlc",
        wmls: "text/vnd.wap.wmlscript",
        wmlsc: "application/vnd.wap.wmlscriptc",
        wmv: "video/x-ms-wmv",
        wmx: "video/x-ms-wmx",
        wmz: "application/x-ms-wmz",
        woff: "font/woff",
        wpd: "application/vnd.wordperfect",
        wpl: "application/vnd.ms-wpl",
        wps: "application/vnd.ms-works",
        wqd: "application/vnd.wqd",
        wri: "application/x-mswrite",
        wrl: "model/vrml",
        wsdl: "application/wsdl+xml",
        wspolicy: "application/wspolicy+xml",
        wtb: "application/vnd.webturbo",
        wvx: "video/x-ms-wvx",
        x3d: "application/vnd.hzn-3d-crossword",
        xap: "application/x-silverlight-app",
        xar: "application/vnd.xara",
        xbap: "application/x-ms-xbap",
        xbd: "application/vnd.fujixerox.docuworks.binder",
        xbm: "image/x-xbitmap",
        xdf: "application/xcap-diff+xml",
        xdm: "application/vnd.syncml.dm+xml",
        xdp: "application/vnd.adobe.xdp+xml",
        xdssc: "application/dssc+xml",
        xdw: "application/vnd.fujixerox.docuworks",
        xenc: "application/xenc+xml",
        xer: "application/patch-ops-error+xml",
        xfdf: "application/vnd.adobe.xfdf",
        xfdl: "application/vnd.xfdl",
        xht: "application/xhtml+xml",
        xhtml: "application/xhtml+xml",
        xif: "image/vnd.xiff",
        xlam: "application/vnd.ms-excel.addin.macroenabled.12",
        xls: "application/vnd.ms-excel",
        xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
        xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
        xlsx: "application/vnd.ms-excel",
        xltm: "application/vnd.ms-excel.template.macroenabled.12",
        xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
        xml: "application/xml",
        xo: "application/vnd.olpc-sugar",
        xop: "application/xop+xml",
        xpi: "application/x-xpinstall",
        xpm: "image/x-xpixmap",
        xpr: "application/vnd.is-xpr",
        xps: "application/vnd.ms-xpsdocument",
        xpw: "application/vnd.intercon.formnet",
        xsl: "application/xml",
        xslt: "application/xslt+xml",
        xsm: "application/vnd.syncml+xml",
        xspf: "application/xspf+xml",
        xul: "application/vnd.mozilla.xul+xml",
        xwd: "image/x-xwindowdump",
        xyz: "chemical/x-xyz",
        yaml: "text/yaml",
        yang: "application/yang",
        yin: "application/yin+xml",
        zaz: "application/vnd.zzazz.deck+xml",
        zip: "application/zip",
        zir: "application/vnd.zul",
        zmm: "application/vnd.handheld-entertainment+xml",
    };
    return extension[ext.toLowerCase()] || "application/octet-stream";
}

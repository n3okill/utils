import { _checkTransform, TransformFunctionType } from "../_internal";

/**
 * Clone buffer
 * @param {Buffer} origin
 * @param {Function} transform
 * @returns {Buffer}
 */
export function cloneBuffer(origin: Buffer, transform?: (value: Buffer) => Buffer): Buffer {
    return _checkTransform(Buffer.from(origin), transform as TransformFunctionType);
}

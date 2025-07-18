// vite-parse5-shim.js
// We import the real CJS bundle directly, bypassing any alias loops:
import * as p5 from 'parse5/dist/index.js'

// Ensure parseAsync always exists:
const parseAsync =
  typeof p5.parseAsync === 'function'
    ? p5.parseAsync
    : (html, options) => Promise.resolve(p5.parse(html, options))

// Export everything under a fresh (mutable) object:
const exportObj = {
  ...p5,
  parseAsync
}

export default exportObj
export const parse = p5.parse
export const parseFragment = p5.parseFragment
export const serialize = p5.serialize
export { parseAsync }
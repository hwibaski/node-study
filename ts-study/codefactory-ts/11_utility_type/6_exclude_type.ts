/**
 * Exclude Type
 */

// number | boolean
type NoString = Exclude<string | boolean | number, string>;

// string
type NoFunction = Exclude<string | (() => void), Function>;

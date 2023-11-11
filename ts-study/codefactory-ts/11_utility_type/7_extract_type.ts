/**
 * Extract Type
 *
 * 특정 타입만 추출
 */

// string 타입만 추출
type StringOnly = Extract<string | boolean | number, string>;

// () => void 만 추출
type FunctionOnly = Extract<string | (() => void), Function>;

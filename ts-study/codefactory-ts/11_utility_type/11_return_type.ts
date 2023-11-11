/**
 * Return Type
 */

// number
type ReturnTypeSample = ReturnType<() => number>;

type FunctionSign = (x: number, y: number) => number;

// number
type ReturnType2 = ReturnType<FunctionSign>;

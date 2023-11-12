/**
 * Infer keyword
 *
 * 유추하다.
 *
 * (Inferring TYpe in Conditional Type)
 *
 * Infer Keyword는 Conditional Type에서만 사용 가능한 키워드
 * 그러니 extends 키워드를 사용했을 때 extend 한 대상에서 타입을 한 번 더 추론하는 역할을 한다.
 */

// 1) 가장 많이 사용하는 예제
// Flattening -> Array를 벗겨낼 때
// string[] -> string
// string[][] -> string[]

type Flatten<Type> = Type extends Array<string> ? string : Type;

type StringArray = Flatten<string[]>; // string
type NumberArray = Flatten<number[]>; // number[]

type Flatten2<Type, ElementType> = Type extends Array<ElementType> ? ElementType : Type;

type StringArray2 = Flatten2<string[], string>; // string
type NumberArray2 = Flatten2<number[], number>; // number

// Type이 만약에 array야 그러면 Array의 구성 요소를 infer 해서 ElementType이라는 제네릭을 만들어서 그 타입을 리턴하고
// 그게 아니라면 Type을 그래도 리턴해
type Flatten3<Type> = Type extends Array<infer ElementType> ? ElementType : Type;

type StringArray3 = Flatten3<string[]>; // string
type NumberArray3 = Flatten3<number[]>; // number
type TwoDArray = Flatten3<boolean[][]>; // boolean[]

// Flatten3랑 같음
type Flatten4<Type> = Type extends (infer ElementType)[] ? ElementType : Type;

// 2) Return Type 추론
type InferReturnType<Type> = Type extends (...args: any[]) => string ? string : Type;

type NumberArray5 = InferReturnType<number[]>;
type StringFunc = InferReturnType<() => string>; // string
type NumberFunc = InferReturnType<() => number>; // () => number

type InferReturnType2<Type> = Type extends (...args: any[]) => infer ReturnType ? ReturnType : Type;

type StringFunc2 = InferReturnType2<() => string>; // string
type NumberFunc2 = InferReturnType2<() => number>; // number

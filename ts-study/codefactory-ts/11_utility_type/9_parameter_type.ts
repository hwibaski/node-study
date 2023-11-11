/**
 * Parameter Type
 */

function sampleFunction(x: number, y: string, z: boolean) {

}

// 파라미터의 값들을 순서대로 가지고 온다.
type Params = Parameters<typeof sampleFunction>;
type Params2 = Parameters<(one: number) => void>;

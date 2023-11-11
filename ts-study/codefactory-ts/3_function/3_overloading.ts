/**
 * Overloading
 */

/**
 * 파라미터를 하나를 받거나
 * 1) 하나를 받거나
 * 2) 세 개를 받는 함수
 */

function stringOrStrings(members: string): string;
function stringOrStrings(member1: string, member2: string, member3: string): string;

// function stringOrStrings(member1: string): number; // 시그니처 맞지않음
// function stringOrStrings(): string // 원본 함수에서 파라미터를 한 개도 안 받는 경우는 없으므로 시그니쳐 맞지 않음


/**
 * 만약에 하나의 파리머터만 입력받는다면
 * 아이돌 멤버들을 하나의 스트링으로 입력받는다.
 * 예) '안유진, 장원영, 레이'
 *
 * 만약에 세 개의 파라미터를 받는다면
 * 각각 아이돌을 각각의 파라미터의 값으로 입력한다.
 * 예) '안유진', '장원영', '레이'
 */

function stringOrStrings(memberOrMembers: string, member2?: string, member3?: string) {
    if (member2 && member3) {
        return `아이브: ${memberOrMembers}, ${member2}, ${member3}`;
    } else {
        return `아이브: ${memberOrMembers}`;
    }
}


console.log(stringOrStrings('안유진', '장원영', '레이'));
console.log(stringOrStrings('안유진, 장원영, 레이'));
// 아래의 함수 호출은 막고 싶다. 왜냐하면 우리는 파라미터를 1개 아니면 3개로만 설정하고 싶기 때문에
// 이럴 때 오버로딩을 사용하게 된다.
// console.log(stringOrString('안유진', '장원영'));

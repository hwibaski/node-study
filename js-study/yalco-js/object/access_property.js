/**
 * getter
 * - 반드시 값을 반환해야 함
 * - 특정 프로퍼티(들)를 원하는 방식으로 가공하여 내보낼 때 사용
 *
 * setter
 * - setter는 하나의 인자를 받음
 * - 특정 프로퍼티에 값이 저장되는 방식을 조작하거나 제한하는데 사용
 */

// ⚠️ 필드 이름과 setter의 이름이 같을 때

class YalcoChicken {
    constructor (name, no) {
        this.name = name;
        this.no = no;
    }
    get no () {
        return this.no + '호점';
    }
    set no (no) {
        this.no = no;
    }
}
// const chain1 = new YalcoChicken('판교', 3); // ⚠️ 오류 발생!

// 생성자 호출 -> this.no = no -> setter 호출 -> setter 자기 자신 호출 무한 반복


// 해결책
class YalcoChicken2 {
    constructor (name, no) {
        this.name = name;
        this.no = no;
    }
    get no () {
        return this._no + '호점';
    }
    set no (no) {
        this._no = no;
    }
}

const chain2 = new YalcoChicken2('판교', 3);


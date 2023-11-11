/**
 * Visibility keyword
 *
 * 1) public (기본값) - 어디서든 접근이 가능
 * 2) protected - 현재 클래스 및 하위 (자식) 클래스에서 접근 가능
 * 3) private - 현재 클래스 내부에서만 접근 가능
 */

class PropertyTestParent {
    public publicProperty = 'public';
    protected protectedProperty = 'protect';
    private privateProperty = 'private';
    #jsPrivateProperty = 'js private';

    test() {
        this.publicProperty;
        this.protectedProperty;
        this.privateProperty;
        this.#jsPrivateProperty;
    }
}


class PropertyTestChild extends PropertyTestParent {
    test() {
        this.publicProperty;
        this.protectedProperty;
        // this.privateProperty; // 접근 불가
        // this.#jsPrivateProperty; // 접근 불가
    }
}

const instacne = new PropertyTestChild();
instacne.publicProperty;
// instacne.protectedProperty

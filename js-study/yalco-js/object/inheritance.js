class YalcoChicken3 {
    static brand = '얄코치킨';
    static contact () {
        console.log(`${this.brand}입니다. 무엇을 도와드릴까요?`);
    }
}

class ConceptYalcoChicken extends YalcoChicken3 {
    static contact () {
        super.contact();
        console.log('컨셉 가맹문의는 홈페이지를 참조하세요.');
    }
}

ConceptYalcoChicken.contact();

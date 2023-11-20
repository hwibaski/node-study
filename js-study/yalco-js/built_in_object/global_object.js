console.log(this); // {}
// ⚠️ Node.js로 문서 실행시의 this는 전역 객체를 가리키지 않음
// 이후 모듈 관련 강에서 배울 것

console.log(global); // {global}

// ⭐️ globalThis 통일된 식별자 - node, 브라우저 모두에서 가능
console.log(globalThis); // {global}

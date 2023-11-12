/**
 * Reflection Metadata
 */

import 'reflect-metadata';

const iu = {
    name: '아이유',
    age: 32,
    nationality: 'korean'
}

console.log(iu);

/**
 * 파라미터의 정의
 *
 * 1) 메타데이터의 키
 * 2) 메타데이터 키에 저장할 값
 * 3) 메타데이터를 저장할 객체
 * 4) 메타데이터를 저장할 객체의 프로퍼티
 *
 * 4번은 필수가 아니다.
 *
 * 메타데이터란 무엇인가? - 데이터에 대한 데이터
 */
Reflect.defineMetadata('test-meta', 123, iu);

console.log(iu);

console.log(Reflect.getMetadata('test-meta', iu)); // 123

Reflect.defineMetadata('test-meta', 456, iu);
console.log(Reflect.getMetadata('test-meta', iu)); // 456

Reflect.defineMetadata('meta2', {name: '코드팩토리'}, iu);
console.log(Reflect.getMetadata('meta2', iu)); // 456

/**
 * 프로퍼티에 저장하기
 */
Reflect.defineMetadata('object-metadata', 999, iu, 'name');
console.log(Reflect.getMetadata('object-metadata', iu, 'name')); // 999

// 메타데이터 삭제
Reflect.deleteMetadata('object-metadata', iu, 'name');

// 메타데이터 존재하는지 확인
Reflect.hasMetadata('object-metadata', iu, 'name');
console.log(Reflect.getMetadataKeys(iu));
console.log(Reflect.getMetadataKeys(iu, 'name'));

Reflect.defineMetadata('prototype-data', '프로토타입 메타에요!', Object.getPrototypeOf(iu));

// 프로토타입 체인 까지 검사한다.
console.log(Reflect.getMetadataKeys(iu));

//자신한테 실재로 있는 메타데이터만 검사한다.
console.log(Reflect.getOwnMetadataKeys(iu));



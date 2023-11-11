/**
 * Required Type
 *
 * 모든 프로퍼티가 필수가 되도록 변경
 */

interface Dog {
    name: string;
    age?: number;
    country?: string;
}

const requiredDog: Required<Dog>= {
    name:'모찌',
    age: 7,
    country: '한국'
}

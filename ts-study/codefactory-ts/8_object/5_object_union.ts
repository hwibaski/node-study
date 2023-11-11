/**
 * Object Union
 */

/**
 * 유추된 객체 타입 유니언
 */
const dogOrCat = Math.random() > 0.5 ?
// 강아지
    {
        name: '별이',
        age: 12,
    } :
// 고양이
    {
        name: '오리',
        breed: '코리안 길냥이'
    };

dogOrCat.name; // string
dogOrCat.age; // number | undefined
dogOrCat.breed // string | undefined

/**
 * 강아지일 때는 breed 프로퍼티에 접근하지 못하게 만들고 싶다면?
 * Dog type Cat Type 따로 선언해야됨
 */

interface Dog {
    name: string;
    age: number;
}

interface Cat {
    name: string;
    breed: string;
}

type DogOrCat = Dog | Cat;

const dogOrCat2: DogOrCat = Math.random() > 0.5 ?
    // 강아지
    {
        name: '별이',
        age: 12,
    } :
    // 고양이
    {
        name: '오리',
        breed: '코리안 길냥이'
    };

dogOrCat2.name; // string
// dogOrCat2.age; //  error
// dogOrCat2.breed //  error

// in narrowing 사용!
if ('age' in dogOrCat2) {
    dogOrCat2.age // Dog
} else {
    dogOrCat2.breed // Cat
}

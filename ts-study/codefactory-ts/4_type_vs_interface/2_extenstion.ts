/**
 * Interface & type Extension
 */

interface IName {
    name: string
}

interface  IIdol extends IName {
    age: number;
}

const idol: IIdol = {
    name: '안유진',
    age: 23,
}

type TName = {
    name: string;
}

type TIdol = TName & {age: number};

const idol2: TIdol = {
    name: '아이유',
    age: 29,
}

// interface와 type 끼리의 상속도 가능하다!!
interface  IIdol2 extends TName {
    age: number;
}

const idol3: IIdol2 = {
    name: '제니',
    age: 29,
}

type TIdol2 = IName & {age: number}

/**
 * type 상속은 여러개 가능
 */

type DogName = {
    name: string;
}

type DogAge = {
    age: number;
}

type DogBreed = {
    breed: string;
}

type Dog = DogName & DogAge & DogBreed;

const dog: Dog = {
    name: '코드팩토리',
    age: 32,
    breed: 'Poodl'
}

interface CatName {
    name: string;
}

interface CatAge {
    age: number;
}

interface Cat extends CatName, CatAge {
    breed: string;
}

const cat: Cat = {
    name: '냥이',
    age: 7,
    breed: '코리안 냥이'
}

/**
 * Overriding
 *
 * type : 확장하면서 intersection이 되면 never 타입으로 변환(primitive type의 경우), 단 narrowing 할 경우에는 허용
 * interface : 확장하면서 intersection 될 경우 허용하지 않음(primitive type의 경우), 단 narrowing 할 경우에는 허용
 */

type THeight = {
    height: number;
}

type TRectangle = THeight & {
    // height: string; // number 였던 height를 string으로 overriding -> primitive 끼리 & 되어서 never 타입 됨
    width: number;
}

// const rectangle: TRectangle = {
//     width: 100,
//     height:
// }

type TWidth = {
    width: number | string;
}

type TRectangle2 = TWidth & { // TWidth의 width를 width로 narrowing할 때는 유용하다.
    width: number;
    height: number;
}

const rectangle: TRectangle2 = {
    height: 100,
    width: 100
}

interface IHeight {
    height: number;
}

interface  IRectangle extends IHeight {
    // height: string;  // 애초에 확장하면서 type overriding이 허가되지 않는다.
    width: number;
}

interface IWidth {
    width: number | string;
}

interface IRectangle2 extends IWidth {
    width: string; // narrowing 하게될 경우에는 가능
    height: number;
}

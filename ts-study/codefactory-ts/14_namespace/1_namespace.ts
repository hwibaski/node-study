/**
 * Namespace
 *
 * 관련 있는 기능들을 하나의 모듈로 묶을 수 있는 방법
 * - 현재는 쓰지 않음
 */

// Idol 클래스와 User 클래스를 분리하고 싶은 욕망이 생김
namespace Home{
    class Idol {
        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }
    }

    // new User() -> 에러남

    // export 해주면 다른 곳에서 접근 가능
    export const yujin = new Idol('안유진', 23);
}


namespace Post {
    class User {
        email: string;
        name: string;

        constructor(email: string, name: string) {
            this.email = email;
            this.name = name;
        }
    }

    Home.yujin
}

/**
 * 중첩된 namespace 가능
 */
namespace Comment {
    const name = 'comment';

    namespace Detail {
        const page = 'detail';

        console.log(name);
        console.log(page);
    }

    console.log('---------')
    console.log(name);
    // console.log(page);
}


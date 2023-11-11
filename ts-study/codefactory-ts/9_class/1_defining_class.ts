/**
 * Class 선언
 */

class SampleClass {}

class Game {
    name: string;
    country: string;
    download: number;


    constructor(name: string, country: string, download: number) {
        this.name = name;
        this.country = country;
        this.download = download;
    }

    introduc() {
        return `${this.name}은 ${this.country}에서 제작된 ${this.download}개의 다운로드를 달섷안 게임입니다.`
    }
}

const starcraft = new Game('starcraft', 'usa', 100000000);

const retVal = starcraft.introduc();


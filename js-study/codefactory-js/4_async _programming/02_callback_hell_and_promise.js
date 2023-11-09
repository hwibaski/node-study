/**
 * Callback
 */
function waitAndRun() {
    setTimeout(() => {
        console.log('끝');
    }, 2000);
}

// waitAndRun();

function waitAndRun2() {
    setTimeout(
        () => {
            console.log('1번 콜백 끝');
            setTimeout(() => {
                console.log('2번 콜백 끝');
                setTimeout(() => {
                    console.log('3번 콜백 끝');
                }, 2000);
            }, 2000);
        }, 2000);
}

// waitAndRun2();

/**
 * Promise
 */
const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('완료');
    }, 2000);
});

// timeoutPromise.then((res) => {
//     console.log('---then---');
//     console.log(res);
// });

/**
 * reject 자체가 에러를 발생시키는게 아니고 에러 발생 시 리턴하고 싶은 값을
 * reject()에 담아서 보내면 된다. 그러면 .catch()에서 잡힌다.
 */
const getPromise = (seconds) => new Promise((resolve, reject) => {
    setTimeout(() => {
        // if(xxx){
        //     resolve('성공')
        // }else{
        //     reject('에러');
        // }
        resolve('에러');
    }, seconds * 1000);
});

// 필요시 then 안에서 promise를 리턴해서 계속 chaining 가능
getPromise(3)
    .then(res => {
        console.log('--- first then ---');
        console.log(res);

        return getPromise(1)
    }).then(res => {
        console.log('--- second then ---');
        console.log(res);
    })

// getPromise(3)
//     .then((res) => {
//         console.log('--- first then ---');
//         console.log(res);
//     })
//     .catch((res)=>{
//         console.log('--- first catch ---');
//         console.log(res);
//     })
//     .finally(()=>{
//         console.log('--- finally ---');
//     });

Promise.all([
    getPromise(1),
    getPromise(4),
    getPromise(1),
]).then((res)=>{
    console.log(res);
});

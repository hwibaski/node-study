/**
 * Async / Await
 */
const getPromise = (seconds)=> new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('resolved~~');
    }, seconds * 1000)
});

async function runner(){
    console.log('runner() 실행')
    try{
        const result1 = await getPromise(1);
        console.log(result1);
        const result2 = await getPromise(2);
        console.log(result2);
        const result3 = await getPromise(1);
        console.log(result3);
    }catch(e){
        console.log('---catch e---');
        console.log(e);
    }finally{
        // console.log('---finally---');
    }
}

runner();

const getPromise2 = (seconds)=> new Promise((resolve, reject) => {
    setTimeout(()=>{
        console.log("promise 실행")
    }, seconds * 1000)
});

async function runner2(){
    console.log('runner2() 실행')
    try{
        const result1 = getPromise2(1);
        const result2 = getPromise2(2);
        const result3 = getPromise2(1);
    }catch(e){
        console.log('---catch e---');
        console.log(e);
    }finally{
        // console.log('---finally---');
    }
}

runner2();

/**
 * console.log() 기록
 *
 * runner() 실행
 * runner2() 실행
 * resolved~~
 * promise 실행
 * promise 실행
 * promise 실행
 * resolved~~
 * resolved~~
 */

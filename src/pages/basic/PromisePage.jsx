import React from 'react';

function PromisePage(props) {

    const loop = (name) => {
        // random 0 < 1 0.123234455
        const random = Math.floor(Math.random() * 100) + 1;
        for(let i = 0; i < random; i++) {
            console.log(`${name}: ${i}`)
        }
    }

    const testPromise = () => {
        return new Promise((resolve, reject) => {
            loop("test1");
            resolve("test1 반복 완료")
        });
    }

    const testPromise2 = () => {
        return new Promise((resolve, reject) => {
            loop("test2");
            resolve("test2 반복 완료")
        });
    }

    const testPromise3 = () => {
        return new Promise((resolve, reject) => {
            loop("test3");
            resolve("test3 반복 완료")
        });
    }

    const testPromise4 = (num) => {
        return new Promise((resolve, reject) => {
            console.log("test4");
            if(num === 0) {
                reject("test4 오류!!!");
                return;
            }
            resolve("test4 성공!!!");
        });
    }

    const testPromise5 = async (num) => {
        console.log("test5");
        if(num === 0) {
            throw new Error("test5 오류!!!"); // throw 는 오류가 터지면 거기서 작동 중단 되기 때문에 return 필요없음
        }
        return "test5 성공!!!";
    }

    const handleClick1 = () => {
        // 순서대로 나오는 것이 아니라 promise3까지 반복 다 완료 후에
        // console.log(반복 완료)가 나온다.
        testPromise().then(r => console.log(r));
        testPromise2().then(r => console.log(r));
        testPromise3().then(r => console.log(r));
        console.log("a"); // 이것도 resolve 전에 먼저 실행 된 후 resolve가 실행
    }

    //만약 순서대로 만들고 싶으면 then 안에서 다른 promise가 호출되어야 한다
    const handleClick2 = () => {
        testPromise().then(r => {
            console.log(r);
            testPromise2().then(r => {
                console.log(r);
                testPromise3().then(r => {
                    console.log(r);
                })
            })
        });
    }

    // 이것을 async await를 이용해서 만드려면
    // 순서대로 실행이됨 근데 이럴거면 await을 왜 쓸까?
    const handleClick3 = async () => {
        const r = await testPromise();
        console.log(r);
        const r2 = await testPromise2();
        console.log(r2);
        const r3 = await testPromise3();
        console.log(r3);
    }

    const handleClick4 = async () => {
        testPromise4()
        .then(r => {
            console.log(r);
        })
        .catch(e => {
            console.error(e);
        });

        testPromise5()
        .then(r => {
            console.log(r);
        })
        .catch(e => {
            console.error(e);
        });
    }

    // 위를 await을 사용하면
    const handleClick5 = async () => {
        try {
            const r = await testPromise4();
            console.log(r);
        } catch(e) {
            console.error(e);
        }

        try {
            const r = await testPromise5();
            console.log(r);
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <div>
            <button onClick={handleClick1}>버튼1</button>
            <button onClick={handleClick2}>버튼2</button>
            <button onClick={handleClick3}>버튼3</button>
            <button onClick={handleClick4}>버튼4</button>
            <button onClick={handleClick5}>버튼5</button>
        </div>
    );
}

export default PromisePage;
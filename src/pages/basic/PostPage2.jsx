import React, { useState } from 'react'; // export default 했을 때 형태
// default를 뺏을 때 형태 (중괄호로 일단 감싸져있음) 
import { COLOR_OPTIONS, SIZE_OPTIONS } from '../../constants/productOptions'; 
import axios from 'axios';

function PostPage2(props) {

    const [ product, setProduct ] = useState({
        productName: "",
        price: "",
        sizeId: "",
        colorId: ""
    });

    const handleInputChange = (e) => {
        setProduct(product => {
            return {
                ...product,
                [e.target.name]: e.target.value
            }
        });
    }

    // async는 항상 함수 앞에서만 붙고 함수 앞에 붙으면 반환값으로 Promise를 반환한다는 뜻이다
    // await은 async 함수 안에서만 동작된다
    // JS가 await을 만나면 Promise가 처리될때까지 기다립니다(await) 
    const handleSubmitClick = async () => {
        try { // await는 Promise 앞에서만 달 수 있다
            const response = await axios.post("http://localhost:8080/basic/product", product);
            console.log(response);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <header>
                <h1>비동기 데이터 통신(POST2)</h1>
            </header>
            <main>
                <h3>상품등록</h3>
                <p>
                    <label htmlFor="">상품명</label>
                    <input type="text" 
                        name="productName"
                        onChange={handleInputChange} />
                </p>
                <p>
                    <label htmlFor="">가격</label>
                    <input type="text" 
                        name="price"
                        onChange={handleInputChange} />
                </p>
                <p>
                    <label htmlFor="">사이즈</label>
                    <select name="sizeId" onChange={handleInputChange}>
                        {   // 반복 돌릴땐 key값 잡아주기 나중에 DB와 키값도 맞춰야함??
                            SIZE_OPTIONS.map(size => 
                            <option key={size.id} value={size.id}>{size.name}</option>)
                        }
                    </select>
                </p>
                <p>
                    <label htmlFor="">색상</label>
                    <select name="colorId" onChange={handleInputChange}>
                        {
                            COLOR_OPTIONS.map(color => 
                            <option key={color.id} value={color.id}>{color.name}</option>)
                        }
                    </select>
                </p>
                <p>
                    <button onClick={handleSubmitClick}>등록하기</button>
                </p>
            </main>
        </>
    );
}

export default PostPage2;
import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import ReactModal from 'react-modal';
ReactModal.setAppElement("#root"); // 최상위를 root로 잡겠다는 뜻

const layout = css`
    box-sizing: border-box;
    margin-bottom: 20px;
    border-bottom: 2px solid #dbdbdb;
`;

function ComputerPage(props) {

    const [ isModalOpen, setModalOpen ] = useState(false);

    const [ computerDetail , setComputerDetail ] = useState({
        computerId: "",
        company: "",
        cpu: "",
        ram: "",
        ssd: ""
    });

    const [ registerComputer, setRegisterComputer ] = useState({
        company: "",
        cpu: "",
        ram: "",
        ssd: ""
    });

    const [ updateComputer, setUpdateComputer ] = useState({
        computerId: "",
        company: "",
        cpu: "",
        ram: "",
        ssd: ""
    });

    const [ params, setParams ] = useState({
        company: "",
        cpu: ""
    })

    const [ computerList, setComputerList ] = useState([]);

    const requestComputerList = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/computers", {
                // params: params -> 키(원래 내장된것) 밸류(위에 설정한 이름)가 
                // 똑같기 때문에 그냥 params만 써도 된다
                params
            });
            setComputerList(response.data);
            console.log(response);
        } catch(e) {
            console.error(e);
        }
    }

    const handleSearchInputChange = (e) => {
        setParams(p => {
            return {
                ...p,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSearchClick = () => {

        requestComputerList();

        setParams({
            company: "",
            cpu: ""
        })
    }

    const handleSelectComputerClick = async (computerId) => {
        const data = await requestGetComputer(computerId);
        if(!data) { // 데이터가 없을 경우엔 빈 값으로 채우겠다
            setComputerDetail({
                computerId: "",
                company: "",
                cpu: "",
                ram: "",
                ssd: ""
            });
            return;
        } 
        setComputerDetail(data); // 데이터가 잇으면 setComputerDetail 하겠다
    }
    
    const requestGetComputer = async (computerId) => {
        let responseData = null;
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/computer/${computerId}`);
            console.log(response);
            responseData = response.data;
        } catch (e) {
            console.error(e);
        }
        return responseData;
    } 

    const handleRegisterInputChange = (e) => {
        setRegisterComputer(rc => {
            return {
                ...rc,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleRegisterSubmitClick = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/v1/computer", registerComputer);
            
            if(response.status === 200) {
                alert("등록성공!");
            } else {
                alert("등록실패!");
            }
        } catch (e) {
            console.log(e);
            alert("등록실패!");
        }
    }

    const handleDeleteComputerClick = async (computerId) => {
        if(window.confirm("정말 삭제하시겠습니까?")) {
            await requestDeleteComputer(computerId);
            await requestComputerList(); // 삭제완료 메세지가 뜨는 것과 별개이므로 await을 붙여도 되고 안붙여도 상관없다
            alert("삭제 완료!")
        }
    }

    const requestDeleteComputer = async (computerId) => {
        let responseData = null;

        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/computer/${computerId}`);
            responseData = response.data;
        } catch (e) {
            console.error(e);
        }

        return responseData;
    }

    const closeModal = () => {
        setModalOpen(false);
        setUpdateComputer({
            computerId: "",
            company: "",
            cpu: "",
            ram: "",
            ssd: ""
        })
    }

    const handleUpdateComputerClick = async (computerId) => {
        setModalOpen(true);
        const data = await requestGetComputer(computerId);
        setUpdateComputer(data);
    }

    const handleUpdateSubmitClick = async () => {
        await requestUpdateComputer();
        await requestComputerList();
        closeModal();
    }

    const requestUpdateComputer = async () => {
        let responseData = null;

        try {
            const response = await axios.put(`http://localhost:8080/api/v1/computer/${updateComputer.computerId}`, updateComputer);
            responseData = response.data;
        } catch (e) {
            console.error(e);
        }

        return responseData;
    }

    const handleUpdateInputChange = (e) => {
        setUpdateComputer(uc => {
            return {
                ...uc,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div>
            <ReactModal 
                style={{
                    content: {
                        boxSizing: 'border-box',
                        transform: 'translate(-50%, -50%)',
                        top: '50%',
                        left: '50%',
                        padding: '20px',
                        width: '400px',
                        height: '400px',
                        backgroundColor: '#fafafa',
                    }
                }}
                isOpen={isModalOpen} // modal을 열었다 닫았다 해줌?
                onRequestClose={closeModal} // 아무데나 누르거나 esc 누르면 닫힘
            >
                <div css={css`
                    display: flex; 
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    height: 100%;
                `}>
                    <h2>컴퓨터 정보 수정</h2>
                    <input type="text" name='computerId' onChange={handleUpdateInputChange} value={updateComputer.computerId} disabled={true} />
                    <input type="text" name='company' placeholder='제조사' onChange={handleUpdateInputChange} value={updateComputer.company} />
                    <input type="text" name='cpu' placeholder='CPU' onChange={handleUpdateInputChange} value={updateComputer.cpu} />
                    <input type="text" name='ram' placeholder='RAM' onChange={handleUpdateInputChange} value={updateComputer.ram} />
                    <input type="text" name='ssd' placeholder='SSD' onChange={handleUpdateInputChange} value={updateComputer.ssd} />
                    <div>
                        <button onClick={handleUpdateSubmitClick}>확인</button>
                        <button onClick={() => closeModal()}>취소</button>
                    </div>
                </div>
            </ReactModal>

            <div css={layout}>
                <h2>목록</h2>
                <p>
                    <input type="text" name='company' onChange={handleSearchInputChange} value={params.company} placeholder='제조사' />
                    <input type="text" name='cpu' onChange={handleSearchInputChange} value={params.cpu} placeholder='CPU' />
                    <button onClick={handleSearchClick}>조회</button>
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>선택</th>
                            <th>ID</th>
                            <th>제조사</th>
                            <th>수정</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            computerList.map(computer => 
                                <tr key={computer.computerId}>
                                    {/* 함수 정의를 해서 넣어줘야한다.  
                                    그냥 넣으면 랜더링 동시에 호출되버림
                                    눌렀을 때 실행되게 하기 위해 정의 형태로 넣어야한다*/}
                                    <td><button onClick={() => handleSelectComputerClick(computer.computerId)} >선택</button></td>
                                    <td>{computer.computerId}</td>
                                    <td>{computer.company}</td>
                                    <td><button onClick={() => handleUpdateComputerClick(computer.computerId)} >수정</button></td>
                                    <td><button onClick={() => handleDeleteComputerClick(computer.computerId)} >삭제</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
            <div css={layout}>
                <h2>세부정보</h2>
                <ul>
                    <li>ID: {computerDetail.computerId}</li>
                    <li>제조사: {computerDetail.company}</li>
                    <li>CPU: {computerDetail.cpu}</li>
                    <li>RAM: {computerDetail.ram}</li>
                    <li>SSD: {computerDetail.ssd}</li>
                </ul>

            </div>
            <div css={layout}>
                <h2>등록</h2>
                <p>
                    <label htmlFor="">제조사</label>
                    <input type="text" 
                    name='company' 
                    onChange={handleRegisterInputChange}
                    value={registerComputer.company} />
                </p>
                <p>
                    <label htmlFor="">CPU</label>
                    <input type="text" 
                    name='cpu' 
                    onChange={handleRegisterInputChange}
                    value={registerComputer.cpu} />
                </p>
                <p>
                    <label htmlFor="">RAM</label>
                    <input type="text" 
                    name='ram' 
                    onChange={handleRegisterInputChange}
                    value={registerComputer.ram} />
                </p>
                <p>
                    <label htmlFor="">SSD</label>
                    <input type="text" 
                    name='ssd' 
                    onChange={handleRegisterInputChange}
                    value={registerComputer.ssd} />
                </p>
                <p>
                    <button onClick={handleRegisterSubmitClick}>등록</button>
                </p>
            </div>
        </div>
    );
}

export default ComputerPage;
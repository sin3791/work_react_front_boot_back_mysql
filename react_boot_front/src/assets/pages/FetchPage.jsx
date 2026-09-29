import { useState } from "react";

function FetchPage(){
    //상품정보
    const [product, setProduct] = useState([])
    //상품정보 목록
    const [productList, setProductList] = useState([])
    function fetchStart(){
        fetch("http://192.168.4.253:9092/fetchTest?title=연습중&content=fetch를 이용한 비동기 테스트&hit=12",{method:"get"})
        .then(response=>{

            if(!response)
            {
                throw new Error("응답실패....")
            }
            console.log("response-->", response);
            return response.json();
        })
        
        .then(data=>{
            console.log("data-->", data)
            setProduct(data);
        })
        .catch(error=>{
            console.log("error->", error)
        })

        
    }

    //post방식 비동기 호출
    function fetchPostStart(){
        fetch("http://192.168.4.253:9092/fetchPostTest",{
            method:'post',
            headers:{
                "Content-type" : "application/x-www-form-unlencoded"
            },
            body:"proCode=5656&proName=책상&option=120cm&price=5000"
        })
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            console.log("data-->", data)
            setProductList(data) // [{},{},{}]
        })
        .catch((error)=>{
            console.log("에러-->", error)
        })
    }
    return (
        <div className="container">
            <h1>fetch를 이용한 비동기 처리</h1>
            <button onClick={fetchStart}>fetch를 이용한 GET방식요청</button>

            <table className="table">
                <tbody>
                <tr>
                    <td>상품코드</td>
                    <td>상품명</td>
                    <td>옵션</td>
                    <td>가격</td>   
                </tr>

                <tr>
                    <td>{product.proCode}</td>
                    <td>{product.proName}</td>
                    <td>{product.option}</td>
                    <td>{product.price}</td>
                </tr>
                </tbody>

            </table>    
            <hr />
            <button onClick={fetchPostStart}>fetch를 이용한 post 방식 비동기 호출</button>
             <table className="table">
                <tbody>
                <tr>
                    <td>상품코드</td>
                    <td>상품명</td>
                    <td>옵션</td>
                    <td>가격</td>   
                </tr>
                {
                    // 상품목록: 배열에 json데이터 이르모 map()으로 반복수행한다.
                    productList.map((record, i)=>{
                        return (
                            <tr>
                                <td>{record.proCode}</td>
                                <td>{record.proName}</td>
                                <td>{record.option}</td>
                                <td>{record.price}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div> 
    )
}

export default FetchPage;   
import { useState } from "react";
import axios from 'axios'; // 👈 이 줄을 꼭 추가해 주어야 합니다!

function AxoisPage(){
    
    const [result, setResult] = useState("");

    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState(0)

    const [productList, setProductList] = useState([])

    // get방식 요청하기
    function axiosGetTest(){
        axios.get("http://192.168.4.253:9092/axiosGetTest",{
            params : {
                now_pages:5,
                searchWord: "빅데이터"
            }
        })
        // 응답 받았을때
        .then(function(response){
            console.log(response)
        })
        // 에러가 발생하면
        .catch(function(error){
            console.log(error)
        })
    }

    
    function axiosPostTest(){
        axios.post("http://192.168.4.253:9092/axiosPostTest",{
            proName : "싸이클",
            price : "12500"
        })
        .then((response)=>{
            console.log(response)
            setProductName(response.data.productName);//상품명 (기존 유지)
            
            // 💡 가격 부분만 리스트 요소를 더한 총합으로 계산해서 대입합니다!
            const list = response.data.product;
            const totalPrice = list ? list.reduce((sum, record) => sum + record.price, 0) : 0;
            setPrice(totalPrice); // 가격
            
            setProductList(response.data.product)//컬렉션 (기존 유지)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    return(
        <div className="container">
            <h2>Axios를 이용한 비동기 호출</h2>
            <button onClick={axiosGetTest}>axios를 이용한 get방식 호출</button>

            <div>
                응답내용 : {result}
            </div>
            <button onClick={axiosPostTest}>axios를 이용한 post방식 호출</button>

            <div>
                상품명: {productName}
            </div>
            <div>
                가격: {price}
            </div>
            <table className="table">
                <tbody>
                {
                    productList.map((record, idx)=>{
                        return (
                            <tr key={idx}>
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

export default AxoisPage
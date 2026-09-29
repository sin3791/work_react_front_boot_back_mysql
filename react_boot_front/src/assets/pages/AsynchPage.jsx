import { useState } from 'react'; // 1. 상단에 import 추가

function AsynchPage(){
    var [result, setResult] = useState("");
    var [list, setList] = useState([]);

    function xmlStart(){
        var xHttp = new XMLHttpRequest();
        
        xHttp.onreadystatechange = function(){
            console.log("readyState" + this.readyState);
            console.log("status ->"+this.status);
            console.log("responseText->"+this.responseText);

            if (this.readyState == 4 && this.status == 200){
                setResult(this.responseText);
            }
        }

        xHttp.open("GET", "http://192.168.4.253:9092/xmlTest?name=홍길동&age=25", true);
        xHttp.send();
    }

    // post방식 비동기처리
    function xmlStart2(){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function(){
            if(this.readyState==4 && this.status==200){
                setResult(this.responseText);
            }

        }
        xmlHttp.open("POST", "http://192.168.4.253:9092/xmlTest2", true);
        // post방식일떄는 header를 작성한다
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttp.send("proCode=8888&proName=자전거&option=전기&price=120000");

    }

    function xmlStart3(){
        var xHttp = new XMLHttpRequest();

        xHttp.onreadystatechange = function(){
            if(this.readyState==4 && this.status==200){
                console.log(this.responseText);
                var jsonData = JSON.parse(this.responseText);
                console.log(jsonData);
            
                // 서버에서 받은 정보를 list에 보관하기
                //[{},{},{}]
                //map() : 배열을 반복처리하는 함수
                // jsonData.map((product)=>{
                    
                // });
                setList(jsonData);
            }
        }
        xHttp.open("GET", "http://192.168.4.253:9092/xmlTest3", true)
        xHttp.send();
    }

    return (
        <div className="container">
            <h2>XMLHttpRequest를 이용한 비동기처리</h2>
            <button onClick={xmlStart}>server에서 문자열 가져오기(GET)</button>
            <button onClick={xmlStart2}>server에서 문자열 가져오기(POST)</button>
            <div>result : {result}</div>
            <button onClick={xmlStart3}>컬렉션 요청(List)</button>

            <div>
                <div className ="row" style={{borderBottom: "1px solid gray"}}>
                    <div className="col-sm-3 p-3">상품코드</div>
                    <div className="col-sm-3 p-3">상품명</div>
                    <div className="col-sm-3 p-3">옵션</div>
                    <div className="col-sm-3 p-3">가격</div>
                </div>

                {
                    list.map((record)=>{
                        return (
                            <div className ="row" style={{borderBottom: "1px solid gray"}}>
                                <div className="col-sm-3 p-3">{record.proCode}</div>
                                <div className="col-sm-3 p-3">{record.proName}</div>
                                <div className="col-sm-3 p-3">{record.option}</div>
                                <div className="col-sm-3 p-3">{record.price}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AsynchPage;
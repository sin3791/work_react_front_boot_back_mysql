import { useEffect } from "react"
import { Link } from 'react-router-dom';
import axios from "axios"

function DataList(){
    
    function getDataList(){

        useEffect(()=>{
            getDataList();
        },[])
        axios.get("http://192.168.4.253:9092/data/dataList")
        .then((rest)=>{
            console.log(rest.data)
        })
        .catch((e)=>{
            console.log(e)
        })
    }
    
    return (
        <div className="container">
            <h2>자료실 글 목록</h2>
            {
                (sessionStorage.getItem("logStatus")=="Y")
                &&
                (
                    <button onClick={()=>location.href='/data/dataWrite'}>글쓰기</button>

                )
            }

            <div className="row" style={{borderBottom: "2px solid gray"}}>
                <div className="col-sm-1 p-3">번호</div>
                <div className="col-sm-7 p-3">제목</div>
                <div className="col-sm-1 p-3">글쓴이</div>
                <div className="col-sm-1 p-3">조회수</div>
                <div className="col-sm-2 p-3">등록일</div>
            </div>

            <div className="row" style={{borderBottom: "1px solid #ddd"}}>
                <div className="col-sm-1 p-3">120</div>
                <div className="col-sm-7 p-3"><Link>제목</Link></div>
                <div className="col-sm-1 p-3">글쓴이</div>
                <div className="col-sm-1 p-3">조회수</div>
                <div className="col-sm-2 p-3">등록일</div>
            </div>
        </div>
    )
}

export default DataList
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import axios from "axios"

import { serverUrl } from "../../common/config";

function DataList(){

    const [dataList, setDataList] = useState([]);

    useEffect(()=>{
            getDataList();
        },[])
    function getDataList(){

        
        axios.get(serverUrl+"/data/dataList")
        .then((res)=>{
            console.log(res.data);
            setDataList(res.data);
            //const jsonData = JSON.parse(res.data);
            //console.log(jsonData);
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

            <div>
                {
                    dataList.map((record, idx)=>{
                        return (
                            <div key = {idx} className="row" style={{borderBottom: "1px solid #ddd"}}>
                                <div className="col-sm-1 p-3">{record.id}</div>
                                <div className="col-sm-7 p-3"><Link to={`/data/dataDetail/${record.id}`}>{record.subject}</Link></div>
                                <div className="col-sm-1 p-3">{record.joinsEntity.username}</div>
                                <div className="col-sm-1 p-3">{record.hit}</div>
                                <div className="col-sm-2 p-3">{record.writedate}</div>
                            </div>
                        )
                    })
                }
            </div>

            {/* <div className="row" style={{borderBottom: "1px solid #ddd"}}>
                <div className="col-sm-1 p-3">120</div>
                <div className="col-sm-7 p-3"><Link>제목</Link></div>
                <div className="col-sm-1 p-3">글쓴이</div>
                <div className="col-sm-1 p-3">조회수</div>
                <div className="col-sm-2 p-3">등록일</div>
            </div> */}
        </div>
    )
}

export default DataList
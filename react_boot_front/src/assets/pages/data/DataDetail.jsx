import axios from "axios";
import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom";
// 1. 올바르게 import 되었는지 확인
function DataDetail(){
    const {id} = useParams()

    const [data, setData] = useState({}) 
    // console.log("kjjj"+id)
    // const mounted = useRef(false)
    useEffect(()=>{

        // if(!mounted.current)
        //     mounted.current=true
        // else
            // console.log();
            getDataDetail();
        

    },[])

    function getDataDetail(){
    
        axios.get(`http://192.168.4.253:9092/data/dataDetail/${id}`)
        .then((res)=>{
            console.log(res.data)
            setData(res.data)

        })
        .catch((e)=>{
            console.log(e)
        })
    }

    const downloadFile = async(downFile)=>{
        alert(downFile);

        const res = await axios.get(`http://192.168.4.253:9092/data/file/download/${downFile}`, 
                                    {responseType: 'blob'})
        
        const url =window.URL.createObjectURL(new Blob([res.data]))

        //2. a태그 만들기
        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.download = `${downFile}`;

        //4. a태그를 document에 추가하기
        document.body.appendChild(aTag);

        aTag.click()
        aTag.remove()

        window.URL.revokeObjectURL(url)

                                    
    }


    // {data.joinsEntity.userid}
    return (
        <div className="container">
            <h2>자료실 글내용보기</h2>
            <div className="row" style={{ borderBottom: "1px solid gray" }}>
                <div className="col-sm-1 p-3">글번호</div>
                <div className="col-sm-5 p-3">{data.id}</div>
                <div className="col-sm-1 p-3">등록일</div>
                <div className="col-sm-5 p-3">{data.writedate}</div>
            </div>

            <div className="row" style={{ borderBottom: "1px solid gray" }}> 
                <div className="col-sm-1 p-3">글쓴이</div>
                <div className="col-sm-5 p-3">{data.joinsEntity?.username}</div>
                <div className="col-sm-1 p-3">조회수</div>
                <div className="col-sm-5 p-3">{data.hit}</div>
            </div>

            <div className="row" style={{ borderBottom: "1px solid gray" }}>
                <div className="col-sm-1 p-3">글제목</div>
                <div className="col-sm-11 p-3">{data.subject}</div>
            </div>

            <div className="row" style={{ borderBottom: "1px solid gray" }}>
                <div className="col-sm-1 p-3">글내용</div>
                <div className="col-sm-11 p-3" dangerouslySetInnerHTML={{__html:data.content}}></div>
            </div>

            <div className="row" style={{ borderBottom: "1px solid gray" }}>
                <div className="col-sm-1 p-3">첨부파일</div>
                <div className="col-sm-11 p-3">{
                        data.fileList?.map((imageData, idx) =>{
                            return (
                                // .${imageData.extname}
                                // <img src={`http://192.168.4.253:9092/uploads/${encodeURIComponent(imageData.filename)}`}
                                <img src={`http://192.168.4.253:9092/uploads/${imageData.filename}.${imageData.extname}`}                                
                                style={{width:"180px", height: "100px", margin: "10px", cursor: "pointer"}}    
                                key={idx} alt={imageData.filename}
                                onClick={()=>{downloadFile(`${imageData.filename}.${imageData.extname}`)}}
                                />
                            )
                        })
                    }</div>
            </div>

            <div>
                <button type="button" className="btn btn-primary">수정</button>
                <button type="button" className="btn btn-success">삭제</button>
            </div>
        </div>
    )
}


export default DataDetail
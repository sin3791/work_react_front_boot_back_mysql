import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
function BoardEdit(){
    // 이전페이지에서 보낸 레코드번호(id)의 값을 Request하기
    const {id} = useParams()

    const [record, setRecord] = useState({})

    useEffect(()=>{
        getBoardView();
    },[])
    function getBoardView(){
        axios.get(`http://192.168.4.253:9092/board/boardView/${id}`)
        .then((res)=>{
            console.log(res)
            setRecord({
                id:res.data.id,
                hit:res.data.hit,
                createDataTime:res.data.createDateTime,
                subject:res.data.subject,
                content:res.data.content,
                username:res.data.joinsEntity.username
            });

        })
        .catch((e)=>{
            console.log(e)
        })
    }

    function boardDelete(){
        if(confirm("글을 삭제하시겠습니까?")){
            axios.get(`http://192.168.4.253:9092/board/boardDel/${id}`)
            .then((res)=>{
                if(res.data == "1"){
                    location.href = "/board/list";
                }
            })
            .catch((e)=>{
                console.log(e)
            })
        }
    }
    return (
        <div className="container">
            <h2>게시판 글 내용보기</h2>
            <div className="row" style={{borderBottom:'1px solid gray'}}>
                <div className="col-sm-3 p-3">번호</div>
                <div className="col-sm-3 p-3">{record.id}</div>
                <div className="col-sm-3 p-3">작성자</div>
                <div className="col-sm-3 p-3">{record.username}</div>
            </div>
        
            <div className="row" style={{borderBottom:'1px solid gray'}}>
                <div className="col-sm-3 p-3">등록일</div>
                <div className="col-sm-3 p-3">{record.createDateTime}</div>
                <div className="col-sm-3 p-3">조회수</div>
                <div className="col-sm-3 p-3">{record.hit}</div>
            </div>

            <div className="row" style={{borderBottom:'1px solid gray'}}>
                <div className="col-sm-3 p-3">제목</div>
                <div className="col-sm-3 p-3" >{record.subject}</div>
                
            </div>

            <div className="row" style={{borderBottom:'1px solid gray'}}>
                <div className="col-sm-3 p-3">글 내용</div>
                <div className="col-sm-3 p-3"><div dangerouslySetInnerHTML={{__html:record.content}}></div></div>
                
            </div>

            <div style = {{margin:'30px 0',padding:'30px 0'}}>
                <button type="button" className="btn btn-success" onClick={()=>location.href='/board/list'}>목록</button>&nbsp;
                {
                    (record.username == sessionStorage.getItem("logUsername"))
                    && 
                    (
                        <>
                            <button type ="button" className="btn btn-info" onClick={()=>location.href=`/board/boardEdit/${record.id}`}>수정</button>&nbsp;
                            <button type ="button" className="btn btn-warning" onClick={boardDelete}>삭제</button>    
                        </>
                    )
                }
               
            </div>
        </div>

        
    )
}

export default BoardEdit
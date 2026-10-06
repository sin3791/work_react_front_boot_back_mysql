function DataList(){
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
        </div>
    )
}

export default DataList
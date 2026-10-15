import { Link, Outlet } from "react-router-dom"
import Footer from "../pages/Footer"
import "../css/top.css"
function ApiLayout(){
    return (
        <> {/* 최상위 요소를 감싸는 빈 Fragment */}
            <div className="row">
                <div className="col-sm-2 api-menu" style={{backgroundColor: "navy", color: "#fff", textAlign:"center", minHeight: "90vh"}}>
                    <h1 style={{padding:"50px 0"}}><Link to="/openApi/apiLayout">OpenAPI</Link></h1>

                    <div className="P-2"><Link to="/">메인 Home</Link></div>
                    <div className="p-2"><Link to="/openapi/apiLayout/KakaoMap">카카오맵</Link></div>
                    <div className="col-sm-2"><Link to="/openapi/apiLayout/email">이메일 네이버</Link></div>
                </div>

                <div className="col-sm-10 p-0"><Outlet/></div>
            </div>
            <Footer/>
        </>
    )
}

export default ApiLayout
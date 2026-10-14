import { Outlet } from "react-router-dom"
import Footer from "../pages/Footer"

function ApiLayout(){
    return (
        <> {/* 최상위 요소를 감싸는 빈 Fragment */}
            <div className="row">
                <div className="col-sm-2">
                    <h2>OpenAPI</h2>

                    <div>Home</div>
                    <div>카카오맵</div>
                </div>

                <div className="col-sm-10"><Outlet/></div>
            </div>
            <Footer/>
        </>
    )
}

export default ApiLayout
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./assets/pages/Layout"
import Home from './assets/pages/Home'

import AsynchPage from "./assets/pages/AsynchPage"
import FetchPage from "./assets/pages/FetchPage"
import AxoisPage from "./assets/pages/AxiosPage"

import Login from './assets/pages/Login'
import Memberform from "./assets/pages/Memberform"
import MemberEdit from "./assets/pages/MemberEdit"
import AdminLayout from "./assets/pages/Admin/AdminLayout"
import MemberList from "./assets/pages/admin/MemberList"
import BoardList from "./assets/pages/board/BoardList"
import BoardWrite from "./assets/pages/board/BoardWrite"


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* outlet에 표시할 기본(첫) 페이지 컴포넌트 설정 */}
          <Route index element={<Home />}></Route>
          {/* 비동기 연습 */}
          <Route path="/asynch" element={<AsynchPage/>}></Route>
          <Route path="/fetch" element={<FetchPage/>}></Route>
          <Route path="/axios" element={<AxoisPage/>}></Route>
          {/* 회원인증 */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/memberform" element={<Memberform />}></Route>
          <Route path="/memberEdit" element={<MemberEdit />}></Route>

          {/* 게시판 */}
          <Route path="/board/list" element={<BoardList />}></Route>
          <Route path="/board/write" element={<BoardWrite />}></Route>
        </Route>

        <Route path="/admin/home" element={<AdminLayout />}>
          <Route index element={<MemberList />}></Route>
          {/* <Route path="/memberList" element={<MemberList />}></Route> */}
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

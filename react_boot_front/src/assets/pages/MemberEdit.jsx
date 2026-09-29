import { useState } from "react"

function Memberform() {
    const [memberData, setmemberData] = useState({ userid: 'ejjang', uesrpwd: '', username: '홍길동', usertel: '010-1234-5678', useremail: 'abcd12@naver.com' })


    const setMemberform = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setmemberData((p) => {
            return { ...p, [name]: value }
        })

        console.log(memberData)
    }

    // 아이디, 비번 등 정보 등록 
    const memberformCheck = (event) => {
        event.preventDefault(); //action 페이지 이동 해제하는 기능

        // 정규성 검사

        // 비밀번호 정규성
        const pwreg = /^[A-Za-z0-9]{8,10}$/
        if (!pwreg.test(memberData.userpwd)) {
            alert("비밀번호는 영대소문자, 숫자를 포함해 8~10자 이내로 가능")
            return;
        }

        // 전화번호 정규성
        const phonereg = /^(010|02|031|041|051|061)[-][0-9]{3,4}[-][0-9]{4}$/
        if (!phonereg.test(memberData.usertel)) {
            alert("연락처는 010-0000-0000 형식으로 입력");
            return false;
        }
        // 이메일 정규성
        const emailreg = /^[A-Za-z0-9]{5,10}[@][a-zA-Z0-9]{2,6}[.][a-zA-Z]{2,3}([a-zA-Z]{2,3})?$/
        if (!emailreg.test(memberData.useremail)) {
            alert("이메일을 잘못 입력하였습니다.");
            return false;
        }

        // 백엔드(DB에서 수정)

    }
    // useEffect에서 로그인 회원 정보를 DB에서 조회하여야 함


    return (
        <div className="container" style={{ width: '500px' }}>
            <h1 style={{ textAlign: 'center' }}>회원정보 수정</h1>
            <form onSubmit={memberformCheck}>
                <div className="mb-3 mt-3">
                    <label for="userid" className="form-label">아이디</label>
                    <input type="text" className="form-control" id="userid" placeholder="아이디를 입력하세요" name="userid" minLength={5} maxLength={12} value={memberData.userid} disabled
                        onChange={setMemberform} />
                </div>
                <div className="mb-3">
                    <label for="userpwd" className="form-label">비밀번호</label>
                    <input type="password" className="form-control" id="userpwd" placeholder="비밀번호를 입력하세요" name="userpwd" required
                        onChange={setMemberform} />
                </div>
                <div className="mb-3">
                    <label for="username" className="form-label">이름</label>
                    <input type="text" className="form-control" id="username" placeholder="이름을 입력하세요" name="username" required
                        onChange={setMemberform} value={memberData.username} readOnly />
                </div>
                <div className="mb-3">
                    <label for="usertel" className="form-label">연락처</label>
                    <input type="text" className="form-control" id="usertel" placeholder="연락처(010-1234-5678)를 입력하세요" name="usertel" required
                        onChange={setMemberform} value={memberData.usertel} />
                </div>
                <div className="mb-3">
                    <label for="useremail" className="form-label">이메일</label>
                    <input type="email" className="form-control" id="useremail" placeholder="이메일을 입력하세요" name="useremail" required
                        onChange={setMemberform} value={memberData.useremail} />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">회원정보 수정하기</button>
                </div>
            </form>
        </div>
    )
}

export default Memberform
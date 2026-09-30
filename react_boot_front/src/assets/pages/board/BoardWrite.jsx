import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/toastui-editor.css'
import color from '@toast-ui/editor-plugin-color-syntax'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import { useRef, useState } from 'react'

function BoardWrite() {
    // 제목을 보관할 변수
    const [title, setTitle] = useState('')
    // 내용을 보관할 변수
    const editorRef = useRef()

    const titleChange = (event) => {
        setTitle(event.target.value);
    }
    const handleBoard = () => {
        // HTML태그로 글내용 얻어오기
        // console.log('글내용: ', editorRef.current?.getInstance().getHTML())

        // MarkDown으로 글내용 얻어오기
        const content = editorRef.current?.getInstance().getMarkdown()

        // 유효성검사 : 제목, 글내용
        if (title == "") {
            alert('제목을 입력해주세요')
            return;
        }
        if (content == "") {
            alert('글내용을 입력하세요')
            return
        }

        // axios를 이용한 백엔드 호출(제목, 글내용, 글쓴이) => json타입으로 보냄
        const boardData = {
            title: title,
            content: content,
            userid: sessionStorage.getItem("logId")
        }
        console.log(boardData)
        // 등록여부에 따라 현재페이지 유지
        // 등록 성공 시 목록으로 이동
    }
    return (
        <div>
            <div className='container'>
                <h2>게시판 글쓰기(ToastEditer)</h2>
                <input type='text' name='title' id='title' style={{ width: "90%", padding: "10px", margin: "10px 0" }} onChange={titleChange} />

                <Editor
                    ref={editorRef}
                    initialValue=""
                    previewStyle="vertical"
                    height="500px"
                    initialEditType="wysiwyg"
                    useCommandShortcut={false}
                    hideModeSwitch={true}
                    plugins={[color]}
                />
                <button onClick={handleBoard}>글 등록하기</button>
            </div>
        </div>
    )
}

export default BoardWrite
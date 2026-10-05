import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/toastui-editor.css'
import color from '@toast-ui/editor-plugin-color-syntax'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import { useRef, useState } from 'react'
import axios from 'axios'
function DataWrite() {
    // 제목을 보관할 변수
    const [subject, setSubject] = useState('')
    // 내용을 보관할 변수
    const editorRef = useRef()

    const subjectChange = (event) => {
        setSubject(event.target.value);
    }


    const handleData = () => {
      
        console.log('subject=>', subject);
        // MarkDown으로 글내용 얻어오기
        const content = editorRef.current?.getInstance().getHTML()
        
        
        // 유효성검사 : 제목, 글내용
        if (subject == "") {
            alert('제목을 입력해주세요')
            return;
        }
        if (content == "") {
            alert('글내용을 입력하세요')
            return
        }

       
    }
    return (
        <div>
            <div className='container'>

            <h2>게시판 글쓰기(ToastEditer)</h2>
            <form>
                {/* 제목 입력 */}
                <input 
                    type='text' 
                    name='subject' 
                    id='subject' 
                    style={{ width: "90%", padding: "10px", margin: "10px 0" }} 
                    onChange={subjectChange} 
                    maxLength={200}
                />

                {/* 에디터 */}
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

                {/* 안쪽 form을 div로 변경 */}
                <div className="mb-3 mt-3">
                    <label htmlFor="filelist" className="form-label">첨부파일:</label>
                    <input type="file" id="filelist" name="filelist"/>
                </div>

                <button type="button" onClick={handleData}>자료실 글 등록하기</button>
            </form> 
            </div>

            
        </div>
    )
}

export default DataWrite
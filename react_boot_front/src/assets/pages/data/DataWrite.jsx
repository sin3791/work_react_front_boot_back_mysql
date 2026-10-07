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

    //첨부파일 담을 변수
    const [files, setFiles]=useState([]); // ['a.gif']


    const subjectChange = (event) => {
        setSubject(event.target.value);
    }

    const handleFileChange = (event)=>{
        setFiles(Array.from(event.target.files));
    }

    const handleData = (event) => {
        
        event.preventDefault();
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
            return;
        }

        //첨부파일
        console.log("files-->", files)
        if(files.length == 0){
            alert("첨부파일은 1개이상 반드시 선택하여야 합니다.");
            return;
        }

        //axios 를 이용하여 백엔드 호출
        //form객체를 생성하여 작성자, 제목, 글내용, 첨부파일 추가한 다음 전송
        const formData = new FormData();
        formData.append("subject", subject);
        formData.append("content", content);
        formData.append("joinsEntity.id",sessionStorage.getItem("logId"));
        //첨부파일을 통해 추가하기
        for(var i=0; i<files.length; i++){
            formData.append("files", files[i]);
        }
        axios.post('http://192.168.4.253:9092/data/dataWrite', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((e) => {
            console.log(e)
        })
       
    }
    return (
        <div>
            <div className='container'>

            <h2>자료실 글쓰기(ToastEditer)</h2>
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
                    height="400px"
                    initialEditType="wysiwyg"
                    useCommandShortcut={false}
                    hideModeSwitch={true}
                    plugins={[color]}
                />

                {/* 안쪽 form을 div로 변경 */}
                <div className="mb-3 mt-3">
                    <label htmlFor="files" className="form-label">첨부파일:</label>
                    <input type="file" className="form-control"
                        id="files" name="files"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>

                <button type="button" onClick={handleData}>자료실 글 등록하기</button>
            </form> 
            </div>

            
        </div>
    )
}

export default DataWrite
function EmailNaver(){
    return (
        <>
            <h1>이메일쓰기</h1>
            <form action="/action_page.php">
                <div className="mb-3 mt-3">
                    <label for="to" className="form-label">받는이메일주소:</label>
                    <input type="email" className="form-control" id="email" placeholder="받는사람 이메일주소" name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" />
                </div>
                <div className="form-check mb-3">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default EmailNaver;
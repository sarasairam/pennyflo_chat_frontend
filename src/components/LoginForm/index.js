import  { useState }  from "react"
import Cookies from 'js-cookie'
import './index.css'
import  { useHistory }  from "react-router-dom";

const LoginForm =()=>{
    const [Username, setUsername] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showSubmitError, setSubmitError] = useState(false);

    const onChangeUsername = (event) => setUsername(event.target.value);

    const history = useHistory()
    
    const onSubmitSuccess = () => {
      const token = "habdbvjhbecbjbjcbb"
      Cookies.set("cookie", token, {
        expires: 30,
        path: "/",
      });
        history.push(`/chat/${Username}`)
      };
    
      const onSubmitFailure = (errorMsg) => {
        setSubmitError(true)
        setErrorMsg(errorMsg)
      };

    const onSubmitForm = async (event) => {
            event.preventDefault();
            const url = "https://pennyflo-chat-backend.onrender.com/new-User/"
            const userDetails = {Username} 
            const options = {
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(userDetails)}
            const response = await fetch(url,options)
            if(response.ok){
                const responseData = await response.json()
                console.log(responseData)
                onSubmitSuccess();
            }else{
              onSubmitFailure("Refresh the page and try again");
            }
          };
    

        return(
            <div className="Main-container">
              <div className="card p-5 m-5 text-center">
                  <p>Sample login-for test cases</p>
                  <p>sara</p>
              </div>
              <div className="column justify-content-between">
                  <form className="card shadow-lg p-5 d-flex flex-column form-style" onSubmit={onSubmitForm}>
                    <div className="pb-3">
                      <label htmlFor="username" className="text-sm label">Username</label>
                      <input id="username"type="text" className="form-control" value={Username} onChange={onChangeUsername}/>
                    </div>
                    <button type="submit" className="m-3 btn btn-primary submit-button">Submit</button>
                    {showSubmitError && <p className="text-danger">*{errorMsg}</p>}
                </form>
              </div>
            </div>
        )
    }

export default LoginForm 
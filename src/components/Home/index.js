import { Component } from "react";
import Cookies from "js-cookie";
import {Grid} from 'react-loader-spinner'
import UserItem from '../UserItem';
import Message from '../Message'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component{
  state={InputValue:"",Username:"",senderUser:"",Messages:[],Usersdata:[],apiStatus:apiStatusConstants.initial}

  componentDidMount(){
    this.getData()
  }

  getDataMessages=async()=>{
    const {senderUser,Username} = this.state
    const url = `https://pennyflo-chat-backend.onrender.com/messages/`
    const details={
        senderUser,
        Username
    }
    const options = {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(details)}
    const response = await fetch(url,options)
    const responseData = await response.json()
    this.setState({Messages:responseData})
  }

  getData=async()=>{
    const {match} = this.props
    const {params} = match
    const {Username} = params
    this.setState({Username})
    this.setState({apiStatus:apiStatusConstants.inProgress})
    const url = "https://pennyflo-chat-backend.onrender.com/all-Users/"
    const response = await fetch(url)
    if(response.ok){
      const responseData = await response.json()
    this.setState({Usersdata:responseData,apiStatus:apiStatusConstants.success})
    }else{
      this.setState({apiStatus:apiStatusConstants.failure})
    }
    }

  onLogout=()=>{
    Cookies.remove("cookie");
    const {history} = this.props
    history.replace('/login')
  }
  sendData=async()=>{
    const {InputValue,senderUser,Username} = this.state
     const url = `https://pennyflo-chat-backend.onrender.com/new-message/`
    const details={
        senderUser,
        Username,
        InputValue
    }
    const options = {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(details)}
    const response = await fetch(url,options)
    const responseData = await response.json()
    console.log(responseData)
  }

  sendMessage=()=>{
    this.sendData()
    this.setState({InputValue:""})
  }

  deleteMessage=async(MessageID)=>{
    const url = `https://pennyflo-chat-backend.onrender.com/delete-message/`
    const details={
        MessageID
    }
    const options = {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(details)}
    await fetch(url,options)
    }

  renderLoadingView = () => (
    <div className="main-container-loader">
       <div className="products-loader-container">
        <Grid  color="#0b69ff" height="50" width="50" />
       </div>
    </div>
  )

  renderFailureView=()=>(
    <div className="main-container">
      <img
      src="https://res.cloudinary.com/dpglcx4ft/image/upload/v1711465678/No_data-pana_gezvxt.png"
      alt="FailureView"
      className="failure-view"
    />
    <button type="button" onClick={this.getData} className="btn btn-primary">Try Again</button>
    </div>
  ) 

  updateSendUser=(data)=>{
    this.setState({senderUser:data},this.getDataMessages)
  }

  updateInputValue=(event)=>{
    this.setState({InputValue:event.target.value})
  }

  renderSuccessView=()=>{
    const {Usersdata,Username,senderUser,InputValue,Messages} = this.state
    const UsersdataFiltered = Usersdata.filter(each=>(
        each.Username!==Username
    ))
    return(
    <div className="main-container">
        <div className="main-top">
            <p className="main-heading">Chat-Hub</p>
            <p className="main-heading">Welcome @ {Username}</p>
            <button type="button" onClick={this.onLogout} className="btn btn-primary m-2">Log Out</button>
        </div>
        <div className="container-home">
            <div className="card card-left">
                <p className="m-3">Users Available</p>
                <ul className="users-card">
                {UsersdataFiltered.map(each=>(        
                    <UserItem data = {each} senderUser={senderUser} updateSenderUser={this.updateSendUser} key={each.UserID}/>
                ))}    
                </ul>
            </div>
            <div className="card card-right">
                {senderUser===""? <>
                <div className="messages-card-empty">
                    <p className="bg-danger p-2 text-center">Click on Users to Chat</p>
                </div>
                </>:<>
                <p className="username-para">@ {senderUser}</p>
                {Messages.length===0? 
                <div className="messages-card-empty">
                    <p className="bg-info p-2 text-center">Start conversation</p>
                </div>
                :
                <ul className="messages-card">
                    {Messages.map(each=>(
                          <Message key={each.MessageID} deleteMessage={this.deleteMessage} data ={each} Username={Username} className="list-message"/>
                    ))}
                </ul> }
                </>}
                <div className="input-card">
                    <input type="text" placeholder="Enter message..." value={InputValue} onChange={this.updateInputValue} className="input-message m-2 p-1"/>
                    <button type="button" className="btn btn-primary m-2" onClick={this.sendMessage}>Send</button>                    
                </div>
            </div>
        </div>
    </div>
    )
    }

  render(){
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }

    }

  }
export default Home;

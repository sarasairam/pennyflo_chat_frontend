import { MdDelete } from "react-icons/md";
import './index.css'

const Message = (props)=>{
    const {data,deleteMessage,Username} = props
    const {MessageID,Content,SenderID,Timestamp}=data
    const deleteMessageHere=()=>{
        deleteMessage(MessageID)
    }
    if(SenderID===Username){
        return(
            <li className="list-item-message special">
            <p className='message-content'>{Content}</p>
            <p className='message-time'>{Timestamp}</p>
            <button className='delete-message' onClick={deleteMessageHere}><MdDelete />
            </button>
        </li>
        )
    }
    return(
        <li className="list-item-message">
            <p className='message-content'>{Content}</p>
            <p className='message-time'>{Timestamp}</p>
        </li>
    )
 }
export default Message;
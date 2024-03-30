import './index.css'

const UserItem = (props)=>{
    const {data,updateSenderUser,senderUser} = props
    const updateSenderUserHere=()=>{
        updateSenderUser(data.Username)
    }
    if(senderUser===data.Username){
        return(
            <li>
                <button type="button" onClick={updateSenderUserHere} className="user-list-item selected-item">{data.Username}</button>
            </li>
        )
    }
    return(
    <li>
        <button type="button" onClick={updateSenderUserHere} className="user-list-item">{data.Username}</button>
    </li>
    )
}
export default UserItem;
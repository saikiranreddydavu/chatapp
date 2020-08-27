// import React from "react"
// import {Card} from "react-bootstrap";
// import ReactLoading from "react-loading"
// import "react-toastify/dist/ReactToastify.css"
//
// import firebase from "../../Services/firebase"
// import "./Chatbox.css"
// import LoginString from "../Login/LoginString"
// import "bootstrap/dist/css/bootstrap.min.css"
// export default class ChatBox extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       isLoading:false,
//       inputValue:""
//     }
//     this.currentUserName = localStorage.getItem(LoginString.Name);
//     this.currentUserId = localStorage.getItem(LoginString.ID)
//     this.currentUserMessages = localStorage.getItem(localStorage.Messages)
//     this.currentUserDocumentId = localStorage.getItem(LoginString.FirebaseDocumentId)
//     this.currentPeerUser = this.props.currentPeerUser
//     this.groupChatId = null
//     this.onSendMessage = this.onSendMessage.bind(this)
//     this.hashString =this.hashString.bind(this)
//     this.listMessage = []
//     this.currentPeerUserMessages=[]
//     this.onConfirm = this.onConfirm.bind(this)
//     this.renderListMessage = this.renderListMessage.bind(this)
//     this.getListHistory = this.getListHistory.bind(this)
//
//   }
// //"https://i.pinimg.com/474x/2e/2e/25/2e2e25c53d858f4af66151304fdb68b7.jpg"
//   componentWillReceiveProps(newProps){
//     this.currentPeerUser = newProps.currentPeerUser
//     this.getListHistory()
//   }
//   componentDidMount(){
//     this.getListHistory();
//   }
//
//   componentDidUpdate(){
//     this.scrollToBottom()
//   }
//
//   scrollToBottom=()=>{
//     if(this.messagesEnd){
//       this.messagesEnd.scrollIntoView({})
//     }
//   }
//
//   getListHistory=()=>{
//     this.listMessage.length = 0
//     this.setState({isLoading:true})
//     if(this.hashString(this.currentUserId)<=this.hashString(this.currentPeerUser.id)){
//       this.groupChatId = `${this.currentUserId} - ${this.currentPeerUser.id}`
//     }else{
//       this.groupChatId = `${this.currentPeerUser.id} - ${this.currentUserId}`
//     }
//     firebase.firestore()
//     .collection('Messages')
//     .doc(this.groupChatId)
//     .collection(this.groupChatId)
//     .orderBy('timestamp')
//     .onSnapshot(Snapshot=>{
//       Snapshot.docChanges().forEach(change =>{
//         this.listMessage.push(change.doc.data())
//       })
//       this.setState({isLoading:false})
//     })
//     console.log(this.listMessage)
//
//
//   }
//
//   onSendMessage = (content)=>{
//     const timestamp = new Date().getTime()
//     if(content.trim()===""){
//       return
//     }
//     const itemMessage = {
//       idFrom : this.currentUserId,
//       idTo : this.currentPeerUser.id,
//       timestamp : firebase.firestore.FieldValue.serverTimestamp(),
//       content : content.trim()
//     }
//
//     firebase.firestore()
//     .collection('Messages')
//     .doc(this.groupChatId)
//     .set({idFrom:this.currentUserId})
//     .then(()=>{
//       this.onConfirm(itemMessage)
//     })
//
//   }
//   onConfirm = (itemMessage)=>{
//     firebase.firestore()
//     .collection('Messages')
//     .doc(this.groupChatId)
//     .collection(this.groupChatId)
//     .add(itemMessage)
//     .then(()=>{
//       this.setState({inputValue:""})
//     })
//   }
//   renderListMessage = ()=>{
//     if(this.listMessage.length > 0){
//       let viewListMessage = []
//       this.listMessage.map((item,index)=>{
//         if(item.idFrom == this.currentUserId){
//           viewListMessage.push(
//             <div className="viewItemRight" key = {item.timestamp}>
//             <span className = "textContentItem">{item.content}</span>
//             </div>
//           )
//         }
//         else{
//           viewListMessage.push(
//             <div className = "viewItemLeft" key = {item.timestamp}>
//             <span className = "textContentItem">{item.content}</span>
//             </div>
//           )
//         }
//       })
//       return viewListMessage
//     }
//
//   }
//   render(){
//     return(
//   <Card className ="viewChatBoard">
//   <div className = "headerChatBoard">
//   <img
//   className ="viewAvatarItem"
//   src={require('./profile.png')}
//   alt =""
//   />
//   <span className="textHeaderChatBoard">
//   <p style = {{fontSize:'20px'}}>{this.currentPeerUser.name}</p>
//   </span>
//   <div>
//   </div>
//   </div>
//
//   <div className="viewListContentChat">
//   {this.renderListMessage()}
//   </div>
//
//   <div className = "viewBottom">
//   <input
//   className = "viewInput"
//   placeholder = "Type a Message"
//   value = {this.state.inputValue}
//   onChange = {event =>{
//     this.setState({inputValue:event.target.value})
//   }}
//   />
//   <img
//   className = "icSend"
//   src = {require('./send.png')}
//   alt = "icon send"
//   onClick = {()=>{this.onSendMessage(this.state.inputValue )}}
//   />
//   </div>
//   </Card>
//   )
//   }
//
//   hashString = str=>{
//     let hash = 0
//     for(let i=0;i<str.length;i++){
//       hash+=Math.pow(str.charCodeAt(i) * 31,str.length-i)
//       hash = hash & hash
//     }
//     return hash
//   }
// }

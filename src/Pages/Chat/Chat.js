import React,{Component} from "react"
import LoginString from "../Login/LoginString"
import firebase from "../../Services/firebase"
import "./Chat.css"
import ReactLoading from "react-loading"
import ChatBox from "../Chatbox/Chatbox"
import WelcomeBoard from "../Welcome/Welcome"
export default class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading:true,
      isOpenDialogConfirmLogout:false,
      currentPeerUser:null,
      displayedContacts:[]
    }
    this.displayedContacts = []

    this.currentUserName = localStorage.getItem(LoginString.Name);
    this.currentUserId = localStorage.getItem(LoginString.ID)
    this.currentUserMessages = localStorage.getItem(localStorage.Messages)
    this.currentUserDocumentId = localStorage.getItem(LoginString.FirebaseDocumentId)

    this.logout = this.logout.bind(this);
    this.getListUsers =this.getListUsers.bind(this);
    this.searchUsers = []
    this.renderListUser = this.renderListUser.bind(this)
    this.displaySearchedContacts = this.displaySearchedContacts.bind(this)
  }
  componentDidMount (){
    firebase.firestore().collection('users').doc(this.currentUserDocumentId).get()
    this.getListUsers()
  }
  getListUsers = async()=>{
    const result = await firebase.firestore().collection('users').get()
    if(result.docs.length > 0){
      let listUsers = []
      listUsers = [...result.docs]
      listUsers.forEach((item, index)=>{
        this.searchUsers.push(
          {
            key : index,
            documentkey: item.id,
            id:item.data().id,
            name:item.data().name,

          }
        )
      })
      this.setState({isLoading:false})
    }
    this.renderListUser()
  }

  renderListUser = ()=>{
    if(this.searchUsers.length > 0){
      let viewListUser = []
      let classname = ""
      this.searchUsers.map((item)=>{
        if(item.id !== this.currentUserId){
          viewListUser.push(
            <button
            key = {item.key}
            id = {item.key}
            onClick = {()=>{
              this.setState({
                currentPeerUser : item
              })
              document.getElementById(item.key).style.backgroundColor = '#fff'
              document.getElementById(item.key).style.color = "#fff"
            }}
            >
            <div className = "viewWrapContentItem">
            <span className = "textItem">{item.name}</span>
            </div>
            </button>
          )
        }
      })
      this.setState({displayedContacts:viewListUser})
    }else{
      console.log("no users ")
    }
  }
  logout=()=>{
    firebase.auth().signOut()
    this.props.history.push("/")
    localStorage.clear()
  }
  searchHandler = (event)=>{
    let searchQuery = event.target.value.toLowerCase(),
    displayedContacts = this.searchUsers.filter((el)=>{
      let SearchValue = el.name.toLowerCase();
      return SearchValue.indexOf(searchQuery)!==-1;

    })
    this.displayedContacts = displayedContacts
    this.displaySearchedContacts();
  }
  displaySearchedContacts=()=>{
    if(this.searchUsers.length > 0){
      let viewListUser = []
      let classname = ""
      this.displayedContacts.map((item)=>{
        if(item.id != this.currentUserId){
          viewListUser.push(
            <button
            id = {item.key}
            onClick = {()=>{
              this.setState({
                currentPeerUser : item
              })
              document.getElementById(item.key).style.backgroundColor = '#fff'
              document.getElementById(item.key).style.color = "#fff"
            }}
            >
            <div className = "viewWrapContentItem">
            <span className = "textItem">{item.name}</span>
            </div>
            </button>
          )
        }
      })
      this.setState({displayedContacts:viewListUser})
    }else{
      console.log("no users ")
    }
  }
  render(){
    return(
      <div className="root">
       <div className="body">
        <div className="viewListUser">
        <div className="profileviewleftside">
        <div className = "ProfilePicture">
        {this.currentUserName}
        </div>
        <button className = "Logout" onClick = {this.logout}>Logout</button>
        </div>
        <div className = "rootsearchbar">
        <div className = "input-container">
        <i className = "fa fa-search icon"></i>
        <input className = "input-field"
        type = "text"
        onChange ={this.searchHandler}
        placeholder = "Search"
        />
        </div>
        {this.state.displayedContacts}
        </div>

        </div>
        <div className="viewBoard">
        {this.state.currentPeerUser?(
          <ChatBox currentPeerUser = {this.state.currentPeerUser}/>
        ):(<WelcomeBoard currentUserName = {this.currentUserName}/>)}
        </div>
       </div>
      </div>
    )
  }
}

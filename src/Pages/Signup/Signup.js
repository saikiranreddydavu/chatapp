import React,{Component} from "react"
import {Link} from "react-router-dom"
import "./Signup.css"
import firebase from "../../Services/firebase"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import {Card} from "react-bootstrap"
import LoginString from "../Login/LoginString"
export default class Signup extends Component {
  constructor(){
    super();
    this.state = {
      email :"",
      password :"",
      name: "",
      error:null
    }
    this.handlechange = this.handlechange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
    handlechange(event){
      this.setState({[event.target.name]: event.target.value});
    }
    async handleSubmit(event){
      const {name,password,email} = this.state;
      event.preventDefault();
      try{
         firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(async result =>{
          console.log("hello")
          firebase.firestore().collection('users')
          .add({
            name,
            id:result.user.uid,
            email,
            password,
            URL:"",
            messages:[{notificationId:"",number: 0}]
          }).then((docRef)=>{
            localStorage.setItem(LoginString.ID,result.user.uid); //id that is in authentication
            localStorage.setItem(LoginString.Name,name);
            localStorage.setItem(LoginString.Email,email);
            localStorage.setItem(LoginString.Password,password);
            localStorage.setItem(LoginString.Description,"");
            localStorage.setItem(LoginString.FirebaseDocumentId,docRef.id)//user id that is in firestore or database
            this.setState({
              name :"",
              password:"",
              email : "",
            })
            this.props.history.push("/chat");
          })
          .catch((error)=>{
            alert("Email already exists or network issues")
            console.error("error in signup",error)
          })
        })
      }
      catch(error){
        console.log(error.message)
      }
    }

  render(){
    return(
      <div>
      <Card className = "formacontrooutside">
      <form className = "customform" noValidate onSubmit = {this.handleSubmit}>
      <h1>Signup Form</h1>
        <TextField
        variant = "outlined"
        margin = "normal"
        required
        id = "email"
        label = "Email Address"
        name = "email"
        autoComplete = "email"
        autoFocus
        onChange = {this.handlechange}
        value = {this.state.email}
        />
        <div>
        </div>
        <TextField
        variant = "outlined"
        margin = "normal"
        required
        id = "password"
        label = "password"
        name = "password"
        type ="password"
        autoComplete = "current-password"
        autoFocus
        onChange = {this.handlechange}
        value = {this.state.password}
        />
        <div>
        </div>
        <TextField
        variant = "outlined"
        margin = "normal"
        required
        id = "name"
        label = "Your Name"
        name = "name"
        autoComplete = "name"
        autoFocus
        onChange = {this.handlechange}
        value = {this.state.name}
        />
        <div className = "CenterAliningItems">
        <button className = "filebuttons" type = "submit">
        <span>Sign Up</span>
        </button>
        </div>
      </form>
      </Card>
      </div>
    )
  }
}

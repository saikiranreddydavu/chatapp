import React,{Component} from "react"
import {Link} from "react-router-dom"
import firebase from "../../Services/firebase"
import LoginString from "./LoginString"
import "./Login.css"
import {Card} from "react-bootstrap"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading : true,
      error:null,
      email:"",
      password:""
    }
      this.handlechange = this.handlechange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  handlechange(event){
    this.setState({[event.target.name]: event.target.value});
  }
  componentDidMount(){
    if(localStorage.getItem(LoginString.ID)){
      this.setState({isLoading:false},()=>{
        this.setState({isLoading:false})
        this.props.history.push("./chat")
      })
    }else{
      this.setState({isLoading:false})
    }
  }
  async handleSubmit(event){
    event.preventDefault();
    this.setState({error:""});
    await firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
    .then(async result =>{
      let user = result.user
      if(user){
        await firebase.firestore().collection('users')
        .where('id',"==",user.uid)
        .get()
        .then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
            const currentdata = doc.data()
            localStorage.setItem(LoginString.ID,currentdata.id); //id that is in authentication and inside firestore
            localStorage.setItem(LoginString.Name,currentdata.name);
            localStorage.setItem(LoginString.Email,currentdata.email);
            localStorage.setItem(LoginString.Password,currentdata.password);
            localStorage.setItem(LoginString.Description,"");
            localStorage.setItem(LoginString.FirebaseDocumentId,doc.id)//user id that is reference for particular database
          })
        })
      }
      this.props.history.push('./chat')
    }).catch(function(error){
      alert("Wrong email or password")
    })
  }


  render(){
    return(
      <div>
      <Card className = "formacontrooutside">
      <form className = "customform" noValidate onSubmit = {this.handleSubmit}>
      <h1>Login Page</h1>
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
        <div className = "CenterAliningItems">
        <button className = "button1" type = "submit">
        <span>Login</span>
        </button>
        </div>
      </form>
      </Card>
      </div>
    )
  }
}
export default Login;

import React,{Component} from "react"
import Header from "../../components/Header";
import "./Home.css"

class HomePage extends Component {
  render(){
    return(
      <div>
      <Header/>
        <div class = "splash-container">
          <div class = "splash">
            <h1 class = "splash-head"> WEB CHAT</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage

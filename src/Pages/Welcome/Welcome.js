import React from "react"

import "./Welcome.css"

export default class Welcomecard extends React.Component{
  render(){
    return(
      <div className="viewWelcomeBoard">
      <span className="textTitleWelcome">Welcome,{ this.props.currentUserName}</span>
      <span className="textDesciptionWelcome">
        Happy Chatting
      </span>
      </div>
    )
  }
}

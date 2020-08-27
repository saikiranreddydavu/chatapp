import React from "react"
import "./Header.css"
import {Link} from "react-router-dom"
function Header(){
  return (
    <header class = "header-login-signup">
    <div class = "header-limiter">
      <h1><a>DSKR <span>Chat</span></a></h1>
      <nav>
      </nav>
    <ul>
      <li><Link to= "/login"> Login</Link></li>
      <li><Link to= "/signup"> Signup</Link></li>
    </ul>
    </div>
      </header>
  )
}
export default Header;

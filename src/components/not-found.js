import React from 'react'
import Navbar from './navbar.js'
import { NavLink } from 'react-router-dom'
import '../css/not_found.css'

class NotFound extends React.Component {

  state = {};

  render() {
    return (
      <>
      <Navbar/>
      <div className="container-fluid p-0">
        <div className="not-found-box">
          <img src="https://picsum.photos/1920/1080?random=1" alt="" />
          <span className="overlay"></span>
        </div>
        <div className="text">
          <h1>404</h1>
          <span>Not Found</span>
          <p><i>Sorry, Page not found - Go to Home</i></p>
          <NavLink exact to="/" className="btn btn-primary pl-3 pr-3">Home</NavLink>
        </div>

      </div>
      </>
      )
  }
}

export default NotFound;
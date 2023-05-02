import React from 'react'
import Navbar from './navbar.js'

class Logout extends React.Component {

  componentDidMount(){
    localStorage.removeItem('token')
    window.location = '/'
  }

  render() {
    return null
  }
}

export default Logout;
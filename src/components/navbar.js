import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import '../css/navbar.css'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

export default class Navbar extends React.Component {
	state = {
		keyword: "",
		isUserLoggedIn: false
	}

  componentDidMount(){
	    try{
	      const jwt = localStorage.getItem('token')
	      const user = jwt_decode(jwt)
	      this.setState({user, isUserLoggedIn: true})  
	    }
	    catch(ex){ 
	    }
	  }

  onFormSubmit = async (event) =>{
    event.preventDefault();
    let date = new Date()
    let timestamp = date.toLocaleDateString() + " "+ date.toLocaleTimeString()
    if(this.state.user){
      try{
        let response = await axios.post('http://localhost:3005/keyword', {
          user_id: this.state.user.id,
          keyword: this.state.keyword,
          timestamp: timestamp
        })
        console.log(response) 
      }
        catch(error) {
          console.log(error);
        };
    }
    window.location = `/search-result?query=${this.state.keyword}&type=${this.props.type}`
  }


	checkJoinPage(){
		let link = window.location.href
		if (link.includes("join") == true){
			return {to: "/login", text: "Login"}
		}else{
			return {to: "/join", text: "Join"}
		}
	}

	checkSearch(){
		let link = window.location.href
		if ((link.includes("join") == true) || (link.includes("login") == true) || (link.includes("account") == true) ||
			(link.includes("liked") == true)){
			return false
		}else{
			return true
		}
	}

	joinPage = this.checkJoinPage()
	isSearchDisplayed = this.checkSearch()			

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light p-1 m-0">
			<Link to="/" className="navbar-brand logo ml-3">Pixellry</Link>
			{this.isSearchDisplayed &&
			<form onSubmit={this.onFormSubmit} className="nav-search">
			  <input 
			  className="form-control"
			  type="search" 
			  placeholder="Search" 
			  aria-label="Search"
			  value={this.state.keyword}
              onChange={(e)=>this.setState({keyword: e.target.value})}
              required/>
			  <button className="btn search-btn"><i className="fas fa-search"></i></button>
			</form>
			}
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			  <span className="navbar-toggler-icon"></span>
			</button>
			
			<div className="collapse navbar-collapse" id="navbarNav">
			  <ul className="navbar-nav ml-auto">
				<li className="nav-item">
				  <NavLink exact to="/" className="nav-link">Home</NavLink>
				</li>
				<li className="nav-item">
				  <NavLink to="/explore" className="nav-link">Explore</NavLink>
				</li>
				<li className="nav-item">
				  <NavLink to="/videos" className="nav-link">Videos</NavLink>
				</li>
				{this.state.isUserLoggedIn && <li className="nav-item">
				  <NavLink to="/account" className="nav-link">Account</NavLink>
				</li>}

				{this.state.isUserLoggedIn || <li className="login-btn">
				  <Link to={this.joinPage.to} className="btn btn-primary pl-3 pr-3">{this.joinPage.text}</Link>
				</li>}
			  </ul>
			</div>
		  </nav>
		);
	}
}

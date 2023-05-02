import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './navbar.js'
import '../css/join.css'
import axios from 'axios'

class Join extends React.Component {

  state = { imageUrl: "", isFetching: false,
            first_name: "", 
            last_name: "", 
            email: "", 
            password: "",
            error: ""
          }

  componentDidMount(){
    this.getImage()
  }

  getImage = async () =>{
    let image = await fetch("https://picsum.photos/900/1200?random=1")
    this.setState({ imageUrl: image.url, isFetching: true})
  }

  onFormSubmit = async (event) =>{
    try{
      event.preventDefault();
      let date = new Date()
      let joined_date = date.toLocaleDateString() + " "+ date.toLocaleTimeString()
      let response = await axios.post('http://localhost:3005/users', {
        firstName: this.state.first_name,
        lastName: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        joined_date: joined_date
      })
      console.log(response)
      let errorMsg = response.data.message
      if (errorMsg) this.setState({error: errorMsg})
      else{
        this.setState({error: ""})
        console.log(response)
        if (response.data === "User joined") window.location = `/login`
      } 
  }
    catch(error) {
      console.log(error);
    };

  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="container p-0">
          <form onSubmit={this.onFormSubmit} className="form">
            <h6 className="text-center text-danger">{this.state.error}</h6>
              <h2 className="text-center mb-5">Create Account</h2>
              <div className="row">
                  <div className="col p-0 text-left">
                      <label htmlFor="firt-name" className="form-label">First Name</label>
                      <input type="text" id="first-name" className="form-control" 
                      value={this.state.first_name}
              onChange={(e)=>this.setState({first_name: e.target.value})}
              required/>
                  </div>
                  <span className="space"></span>
                  <div className="col p-0 text-left">
                      <label htmlFor="last-name" className="form-label">Last Name</label>
                      <input type="text" className="form-control" value={this.state.last_name}
              onChange={(e)=>this.setState({last_name: e.target.value})}
              required/>
                  </div>
              </div>
              <div className="mb-3 text-left">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                value={this.state.email}
              onChange={(e)=>this.setState({email: e.target.value})}
              required/>
              </div>
              <div className="mb-3 text-left">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"
                value={this.state.password}
              onChange={(e)=>this.setState({password: e.target.value})}
              required />
              </div>
              <button type="submit" className="btn btn-primary form-control">Create Account</button>
              <div className="mt-2">
                  <Link to="login/">Already have a account?</Link>
              </div>
              <div className="text-justify mt-2">
                  By joining, you agree to our <Link to="#">Terms of Service</Link> 
                  and <Link to="#">Privacy Policy</Link>.
              </div>
            </form>
            <div className="login-image">
            {this.state.isFetching && <img src={this.state.imageUrl} alt="Not found" />}
            {this.state.isFetching || <div className="image-loading">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>}
            </div>
        </div>
      </div>
      )
  }
}

export default Join;
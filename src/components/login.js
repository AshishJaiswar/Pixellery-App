import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './navbar.js'
import '../css/join.css'
import axios from 'axios'

class Login extends React.Component {

  state = { imageUrl: "", isFetching: false,
            email: "", 
            password: "",
            error: ""}

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
      let response = await axios.post('http://localhost:3005/login', {
        email: this.state.email,
        password: this.state.password
      })
      console.log(response)
      let errorMsg = response.data.message
      if (errorMsg) this.setState({error: errorMsg})
      else{
        this.setState({error: ""})
        if (response.data.isLoggedIn){
          localStorage.setItem('token', response.data.token)
          window.location = `/`
        } 
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
            <div className="login-image">
            {this.state.isFetching && <img src={this.state.imageUrl} alt="Not found" />}
            {this.state.isFetching || <div className="image-loading">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>}
            </div>
          <form onSubmit={this.onFormSubmit} className="form">
          <h6 className="text-center text-danger">{this.state.error}</h6>
            <h2 className="text-center mb-5">Welcome</h2>
            <div className="mb-3 text-left">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              value={this.state.email}
              onChange={(e)=>this.setState({email: e.target.value})} required/>
            </div>
            <div className="mb-3 text-left">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1"
              value={this.state.password}
              onChange={(e)=>this.setState({password: e.target.value})}
              required/>
            </div>
            <div className="mb-3 form-check text-left">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
            </div>
            <button type="submit" className="btn btn-primary form-control">Login</button>
            <div className="mt-2">
                <Link to="#">Forgot password?</Link>
            </div>
            <div className="mt-2">
                <Link to="/join">Haven't created account yet?</Link>
            </div>
          </form>
        </div>
      </div>
      )
  }
}

export default Login;
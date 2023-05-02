import React from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import '../css/account.css'

class Account extends React.Component {

  state = {user_data: [], upload_class: "file-input d-none", form_edit_class: "",
            form_cancel_class: "d-none"};

  async componentDidMount(){
    try{
      const jwt = localStorage.getItem('token')
      const user = jwt_decode(jwt)
      this.setState({user}) 
      this.get_account_details(user)
    }catch(ex){
      window.location = "/not-found"
    }
  }

  get_account_details = async (user) =>{
      try{
        let response = await axios.get(`http://localhost:3005/get-account-details/${user.id}`)
        this.setState({user_data: response.data[0]})
        console.log(response)  
      }
      catch(error) {
        console.log(error);
      }
  }

  handle_edit = (event) => {
    event.preventDefault()
    this.setState({upload_class: "file-input", form_edit_class:"d-none", form_cancel_class: ""})
    document.getElementById("pho-no").disabled = false
    document.getElementById("dob").disabled = false
    document.getElementById("add").disabled = false
    document.getElementById("save").disabled = false

  }
  handle_cancel = (event) => {
    event.preventDefault()
    this.setState({upload_class: "file-input d-none", form_edit_class:"", form_cancel_class: "d-none"})
    document.getElementById("pho-no").disabled = true
    document.getElementById("dob").disabled = true
    document.getElementById("add").disabled = true
    document.getElementById("save").disabled = true
  }

  save_profile = async (event) =>{
    event.preventDefault()
    let path = document.getElementById("file").value
    let pho_no = document.getElementById("pho-no").value
    
    if (pho_no.match(/^[0-9]+$/) == null){
      alert("Phone number should contain only integers") 
      return  
    }
    if (pho_no.length <= 8){
      alert("Number should be greater than 8...") 
      return  
    } 
    if (pho_no.length >= 10){
      alert("Number should be less than 10...") 
      return  
    } 
    let dob = document.getElementById("dob").value
    let address = document.getElementById("add").value
    let response = await axios.put('http://localhost:3005/save-details', {
      user_id: this.state.user.id,
      pofile_img: path,
      pho_no: pho_no,
      dob: dob,
      address: address
    })
     console.log(response)
     if (response.data === "Profile updated."){
      alert("profile updated sucessfully")
     }
  }
  render() {
    return (
      <>
        <Navbar/>
        <div className="container-fluid rounded bg-white mt-5">
            <div className="row">
                <div className="col-md-4 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-1">
                    <div className="mt-5">
                        <img id="profile-pic" className="rounded-circle" src={this.state.user_data.profile_img} />
                    </div>
                    <div className={this.state.upload_class}>
                      <input type="file" id="file" className="file" />
                      <label htmlFor="file">Select file</label>
                    </div>
                      <span className="font-weight-bold">{this.state.user_data.first_name + " " + this.state.user_data.last_name}</span>
                      <span className="text-black-50">{this.state.user_data.email}</span>
                    </div>
                    <div>
                      <Link to="/liked">Liked</Link>
                    </div>
                    <div>
                      <Link to="/my-collections">My Collection</Link>
                    </div>
                    {this.state.user_data.email === "admin@gmail.com" && <div>
                      <Link to="/dashboard">Admin Dashboard</Link>
                    </div>}
                    
                    <div className="mt-4">
                        <Link to="" className="btn btn-dark mr-2">Setting</Link>
                        <Link to="/logout" className="btn btn-danger">Logout</Link>
                    </div>
                    
                </div>
                <div className="col-md-8">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                        <form onSubmit={this.handle_edit} className={this.state.form_edit_class}>
                            <button type="submit" className="ml-3 btn btn-outline-secondary">Edit Profile</button>
                        </form>
                        <form onSubmit={this.handle_cancel} className={this.state.form_cancel_class}>
                            <button type="submit" className="ml-3 btn btn-outline-secondary">Cancel</button>
                        </form> 
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6 mb-2"><input type="text" className="form-control" placeholder="First name" value={this.state.user_data.first_name} disabled/></div>
                            <div className="col-md-6"><input type="text" className="form-control" placeholder="Last Name" value={this.state.user_data.last_name} disabled/></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6 mb-2"><input type="text" className="form-control" placeholder="Email" value={this.state.user_data.email} disabled/></div>
                            <div className="col-md-6"><input type="text" id="pho-no" className="form-control" placeholder="Phone number" disabled/></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6 mb-2"><input type="date" id="dob" className="form-control" placeholder="DOB" disabled /></div>
                            <div className="col-md-6"><input type="text" id="add" className="form-control" placeholder="Address" disabled /></div>                            
                        </div>
                        <div className="mt-5 text-right">
                        <form onSubmit={this.save_profile}>
                            <button id="save" className="mr-3 btn btn-primary profile-button" type="submit" disabled>Save Profile</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
      </>
      )
  }
}

export default Account;
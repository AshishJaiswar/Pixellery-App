import React from 'react'
import './css/sb-admin-2.css'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import SideBar from './sidebar.js'

class DashboardUser extends React.Component {

	state = {tbl_user: []}

	componentDidMount(){
	    try{
	      const jwt = localStorage.getItem('token')
	      const user = jwt_decode(jwt)
	      if (user.email !== "admin@gmail.com"){
	      	window.location = "/not-found"
	      }else{
	      	this.getUserTable()
	      }
	    }catch(ex){
	      
	    }
  	}

  	getUserTable = async () =>{
  		try{
	        let response = await axios.get('http://localhost:3005/table-user')
	        console.log(response) 
	        this.setState({tbl_user: response.data})
	      }
	    catch(error) {
	      console.log(error);
	    }
  	}

  	deleteUser = async (email) => {
  		try{
	        let response = await axios.post('http://localhost:3005/delete-user',{
	        	email: email
	        })
	        console.log(response)
	        if(response.status === 200) alert("User deleted.")
	        window.location.reload()
	      }
	    catch(error) {
	      console.log(error);
	    }
  	}
	render(){
		return(
			<div id="wrapper">
	        	<SideBar />
	        

        
        <div id="content-wrapper" className="d-flex flex-column">

            
            <div id="content">

                
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>

                    <ul className="navbar-nav ml-auto">

                        
                        <li className="nav-item dropdown no-arrow d-sm-none">
                            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-search fa-fw"></i>
                            </a>
                            
                            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                <form className="form-inline mr-auto w-100 navbar-search">
                                    <div className="input-group">
                                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>

                        
                        <div className="topbar-divider d-none d-sm-block"></div>

                        
                        <li className="nav-item dropdown no-arrow show">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Isha Jaiswar</span>
                        </li>

                    </ul>

                </nav>
				
                <div className="table-responsive-sm tbl-scroll">
	                <div className="card-header py-3">
	                    <h5 className="m-0 font-weight-bold text-primary">Users Table</h5>
	                </div>
                	<table className="table">
					  <thead className="thead-light">
					    <tr>
					      <th scope="col">#</th>
					      <th scope="col">First Name</th>
					      <th scope="col">Last Name</th>
					      <th scope="col">Email Id</th>
					      <th scope="col">Password</th>
					      <th scope="col">Phone Number</th>
					      <th scope="col">DOB</th>
					      <th scope="col">Address</th>
					      <th scope="col">Profile Image</th>
					      <th scope="col">Date Joined</th>
					      <th scope="col">Delete Account</th>
					    </tr>
					  </thead>
					  <tbody>
					  {this.state.tbl_user.map((item, index) => (
					  	<tr>
					      <th scope="col">{index + 1}</th>
					      <td scope="col">{item.first_name}</td>
					      <td scope="col">{item.last_name}</td>
					      <td scope="col">{item.email}</td>
					      <td scope="col">{item.password}</td>
					      <td scope="col">{item.phone_no}</td>
					      <td scope="col">{item.dob}</td>
					      <td scope="col">{item.address}</td>
					      <td scope="col">{item.profile_img}</td>
					      <td scope="col">{item.date_joined}</td>
					      <td scope="col"><button onClick={this.deleteUser.bind(this, item.email)} type="button" className="btn btn-outline-danger">Delete</button></td>
					    </tr>
					  	))}
					    
					  </tbody>
					</table>
                </div>
			</div>
		</div>
	</div>
			)
	}
}

export default DashboardUser;
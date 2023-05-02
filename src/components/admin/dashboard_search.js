import React from 'react'
import './css/sb-admin-2.css'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import SideBar from './sidebar.js'

class DashboardSearch extends React.Component {

	state = {top_searches: [], tbl_search: []}

	componentDidMount(){
	    try{
	      const jwt = localStorage.getItem('token')
	      const user = jwt_decode(jwt)
	      if (user.email !== "admin@gmail.com"){
	      	window.location = "/not-found"
	      }else{
	      	this.getTopSearches()
	      }
	    }catch(ex){
	      
	    }
  	}

  	getTopSearches = async () =>{
  		try{
	        let response = await axios.get('http://localhost:3005/top-searches')
	        let tbl_response = await axios.get('http://localhost:3005/table-searches')
	        console.log(tbl_response) 
	        this.setState({top_searches: response.data, tbl_search: tbl_response.data})
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
				
				<div className="card shadow mb-4 mr-4">
                                <div className="card-header py-3">
                                    <h5 className="m-0 font-weight-bold text-primary">Top 5 Searches</h5>
                                </div>
                                <div className="card-body">
                                {this.state.top_searches.map((item, index) =>(
                                	<h6 key={index} className="border-bottom pb-2">{item.keyword}</h6>
                               ))
                                }
                                </div>
                </div>
                <div className="mr-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-primary">Search Table</h5>
                </div>
                	<table className="table">
					  <thead className="thead-light">
					    <tr>
					      <th scope="col">#</th>
					      <th scope="col">First Name</th>
					      <th scope="col">Last Name</th>
					      <th scope="col">Email Id</th>
					      <th scope="col">Keyword</th>
					      <th scope="col">Timestamp</th>
					    </tr>
					  </thead>
					  <tbody>
					  {this.state.tbl_search.map((item, index) => (
					  	<tr>
					      <th scope="row">{index + 1}</th>
					      <td>{item.first_name}</td>
					      <td>{item.last_name}</td>
					      <td>{item.email}</td>
					      <td>{item.keyword}</td>
					      <td>{item.timestamp}</td>
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

export default DashboardSearch;
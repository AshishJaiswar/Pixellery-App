import React from 'react'
import './css/sb-admin-2.css'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import SideBar from './sidebar.js'
import CollectionModal from './collection_modal'

class DashboardCollection extends React.Component {

	state = {tbl_collections: [], collection_name: ""}

	getCollection = async (user) =>{
    let collections = await axios.get(`http://localhost:3005/get-collection/${user.id}`)
    this.setState({data:collections.data})
  	}

	componentDidMount(){
	    try{
	      const jwt = localStorage.getItem('token')
	      const user = jwt_decode(jwt)
	      if (user.email !== "admin@gmail.com"){
	      	window.location = "/not-found"
	      }else{
	      	this.getCollectionsTable()
	      }
	    }catch(ex){
	      
	    }
  	}

  	getCollectionsTable = async () =>{
  		try{
	        let response = await axios.get('http://localhost:3005/table-collections')
	        console.log(response) 
	        this.setState({tbl_collections: response.data})
	      }
	    catch(error) {
	      console.log(error);
	    }
  	}

  	getCollectionResource = (name) =>{
  		this.setState({collection_name: name})
  	}
  	renderModal = () =>{
  		return <CollectionModal name={this.state.collection_name}/>
  	}
  	
	render(){
		return(
			<div id="wrapper">
	        	<SideBar />
	        	{this.renderModal()}
        
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
				
                <div className="mr-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-primary">Collections Table</h5>
                </div>
                	<table className="table">
					  <thead className="thead-light">
					    <tr>
					      <th scope="col">#</th>
					      <th scope="col">First Name</th>
					      <th scope="col">Last Name</th>
					      <th scope="col">Email Id</th>
					      <th scope="col">Collection Name</th>
					      <th scope="col">Collection Items</th>
					    </tr>
					  </thead>
					  <tbody>
					  {this.state.tbl_collections.map((item, index) => (
					  	<tr>
					      <th scope="row">{index + 1}</th>
					      <td scope="col">{item.first_name}</td>
					      <td scope="col">{item.last_name}</td>
					      <td scope="col">{item.email}</td>
					      <td scope="col">{item.collection_name}</td>
					      <td scope="col"><button onClick={this.getCollectionResource.bind(this, item.collection_name)} type="button" data-toggle="modal" data-target="#exampleModal" className="btn btn-outline-primary">View</button></td>
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

export default DashboardCollection;
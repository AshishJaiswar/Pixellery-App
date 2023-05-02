import React from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import LazyLoad from 'react-lazyload';
import API_KEY from '../API_KEY.js'
import { createClient } from 'pexels';
import '../css/gallery.css'
import '../css/my_collections.css'

class MyCollections extends React.Component {
	state = {my_collections: [], loading: true, resources: []}

	async componentDidMount(){
    try{
      const jwt = localStorage.getItem('token')
      const user = jwt_decode(jwt)
      this.setState({user}) 
      this.getCollection(user)
    }catch(ex){
      
    }
  }

  getCollection = async (user) =>{
    let collections = await axios.get(`http://localhost:3005/get-collection/${user.id}`)
    this.setState({my_collections:collections.data, loading: false})
  }

  getResource = async (name) =>{
  	try{
  		let response = await axios.get(`http://localhost:3005/my-collections-resouce/${name}`)
	  	const client = createClient(API_KEY);
	    let resources = []
	    for(let res of response.data){
	    	let media = await client.photos.show({ id: res.resource_id })
	    	resources.push(media.src.portrait)
	    }
	    console.log(resources)
	    this.setState({resources: resources})

  	}catch(err){

  	}
  	
  }

	  handleFileType = () => {

	  	return(
			<>
		      	<div className="container-fluid p-0">
		          <div className="row">{
		              this.state.resources.map((image, index) => (
		                <div className="col-lg-4 mb-lg-0 image" key={index}>
		                  <LazyLoad offset={300}>
					          <img
					            src={image}
					            className="w-100 shadow-1-strong rounded"
					            alt="not found"
					          />
					        </LazyLoad>
		            	</div>
		             
		              ))
		            }
		          </div>
		        </div>
			</>
		)
	      
	  }
	render(){
		return(
			<>
				<Navbar/>
				<h3 className="text-secondary">My Collections</h3> 
				{this.state.loading && 
		        <div>
		          <div className="spinner-border text-primary m-4" role="status">
		            <span className="sr-only">Loading...</span>
		          </div>
		          <h3 className="text-primary">Loading...</h3>
		        </div>}
		        {this.state.loading || (Boolean(this.state.my_collections.length) || <h3>No Collections to Show :(  </h3>)}
		      	<div className="container-fluid d-flex flex-wrap justify-content-center border-bottom pb-4 m-2">
		        {
		              this.state.my_collections.map((item, index) => (
		                <div className="card coll-card" key={index}>
						  <div className="card-body d-flex justify-content-center align-items-center">
						    <button type="button" onClick={this.getResource.bind(this, item.collection_name)} className="btn btn-outline-primary">View</button>
						  </div>
						  <h4>{item.collection_name}</h4>
						</div>
		             
		              ))
		            }
		        </div>
		        {this.state.resources && this.handleFileType()}
			</>
		)
		

	}
}

export default MyCollections;
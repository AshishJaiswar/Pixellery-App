import React from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import LazyLoad from 'react-lazyload';

class Liked extends React.Component {
	state = {liked: [], loading: true}

	async componentDidMount(){
    try{
      const jwt = localStorage.getItem('token')
      const user = jwt_decode(jwt)
      this.setState({user}) 
      this.get_my_liked(user)
    }catch(ex){
      
    }
  }

  get_my_liked = async (user) => {
  	try{
        let response = await axios.get(`http://localhost:3005/my-liked/${user.id}`)
        this.setState({liked: response.data})
        console.log(this.state.liked)
        this.setState({loading: false})  
      }
      catch(error) {
        console.log(error);
      }
  }	

  handleFileType = (item) => {
  		return (
        <>
        <LazyLoad offset={300}>
          <img
            src={item.resource_link}
            className="w-100 shadow-1-strong rounded"
            alt="not found"
          />
        </LazyLoad>
        </>)
      
  }

	render(){
		return(
			<>
				<Navbar/>
				<h3 className="text-secondary">My Liked</h3> 
				{this.state.loading && 
		        <div>
		          <div className="spinner-border text-primary m-4" role="status">
		            <span className="sr-only">Loading...</span>
		          </div>
		          <h3 className="text-primary">Loading...</h3>
		        </div>}
		        {this.state.loading || (Boolean(this.state.liked.length) || <h3>No Liked Image :(</h3>)}
		      	<div className="container-fluid p-0">
		          <div className="row">{
		              this.state.liked.map((item, index) => (
		                <div className="col-lg-4 mb-lg-0 image" key={index}>
		                  {this.handleFileType(item)}
		            </div>
		             
		              ))
		            }
		          </div>
		        </div>
			</>
		)
		

	}
}

export default Liked;
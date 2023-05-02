import React from 'react'
import '../css/search.css'
import API_KEY from '../API_KEY.js'
import { createClient } from 'pexels';
import ReactPlayer from 'react-player'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

class SearchBar extends React.Component {

  state = {keyword: '', type: ''};

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
  async componentDidMount(){
    const type = this.props.type
    if (type === "image"){
      this.setState({type: "Images"})
    }
   if (type === "video"){
      this.setState({type: "Videos"})
    }  

    try{
      const jwt = localStorage.getItem('token')
      const user = jwt_decode(jwt)
      this.setState({user}) 
      }catch(ex){
      // Pass
      }
  }

  handleType = () => {
    if (this.state.type === "Images"){
      return <img src="https://picsum.photos/1920/1080?random=1" alt="" />
    }
    if (this.state.type === "Videos"){
      return (<ReactPlayer className="background-video" url="https://static.pexels.com/lib/videos/free-videos.mp4" playing={true} loop={true} muted={true}/>)
      return
   
    }
  }

  render() {
    
    return (
      <div className="container-fluid p-0">
      <div className="image-container">
        {this.handleType()}
        <span className="overlay"></span>
        <div className="search-container">
          <div className="heading">
            <h1 className="heading-title">Pixellry</h1>
            <p className="heading-desc">
              Explore the world of {this.state.type}&nbsp;<i
                className="fas fa-camera-retro"
              ></i
              >.
            </p>
          </div>
          <form onSubmit={this.onFormSubmit} className="search-form">
            <input
              className="form-control"
              type="search"
              placeholder="Search free high-resolution images"
              aria-label="Search"
              value={this.state.keyword}
              onChange={(e)=>this.setState({keyword: e.target.value})}
              required
            />
            <button className="btn btn-primary my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
    );
  }
}

export default SearchBar;
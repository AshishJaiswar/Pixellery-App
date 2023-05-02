import React from 'react';
import Navbar from './navbar.js'
import List from './curated.js';
import SearchBar from './search.js'

class Home extends React.Component {
	  render(){
	  	return (
		<div className='home'>
			<Navbar type="image"/>
			<SearchBar type="image"/>
			<List type="images"/>
		</div>
		)
	  }
	
}

export default Home;


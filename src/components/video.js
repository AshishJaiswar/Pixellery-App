import React from 'react'
import Navbar from './navbar.js'
import List from './curated.js';
import SearchBar from './search.js'

class Video extends React.Component {

  state = {};

  render() {
    return (
      <>
      <Navbar type="video"/>
      <SearchBar type="video" />
      <List type="videos"/>
      </>)
  }
}

export default Video;
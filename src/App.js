import React from 'react'
import './App.css';
import { Route, Redirect, Switch} from 'react-router-dom'
import Home from './components/home'
import SearchResult from './components/search-result'
import Explore from './components/explore'
import Discover from './components/discover'
import Video from './components/video'
import Account from './components/account'
import Join from './components/join'
import Login from './components/login'
import NotFound from './components/not-found'
import Logout from './components/logout'
import Liked from './components/liked'
import MyCollections from './components/my_collections'
import Dashboard from './components/admin/dashboard'
import DashboardSearch from './components/admin/dashboard_search'
import DashboardDownload from './components/admin/dashboard_downloads'
import DashboardCollection from './components/admin/dashboard_collection'
import DashboardUser from './components/admin/dashboard_user'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/@fortawesome/fontawesome-free/js/all.js'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'


class App extends React.Component {

  render(){
    return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home}  />
        <Route path="/search-result/:query?" component={ SearchResult } />
        <Route path="/explore/" component={ Explore } />
        <Route path="/discover/:id?" component={ Discover } />
        <Route path="/videos/" component={ Video } />
        <Route path="/account/" component={ Account } />
        <Route path="/join/" component={ Join } />
        <Route path="/login/" component={ Login } />
        <Route path="/not-found" component={ NotFound } />
        <Route path="/logout" component={ Logout } />
        <Route path="/liked" component={ Liked } />
        <Route path="/my-collections" component={ MyCollections } />
        <Route path="/dashboard" component={ Dashboard } />
        <Route path="/dashboard-search" component={ DashboardSearch } />
        <Route path="/dashboard-download" component={ DashboardDownload } />
        <Route path="/dashboard-collection" component={ DashboardCollection } />
        <Route path="/dashboard-user" component={ DashboardUser } />
        <Redirect to='/not-found' />
      </Switch>
    </div>
  )
  }
  
}

export default App;

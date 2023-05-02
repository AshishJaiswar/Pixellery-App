import React from 'react'
import {Link} from 'react-router-dom'
class SideBar extends React.Component{

	render(){
		return(
				<ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion " id="accordionSidebar">
	            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
	                <div className="sidebar-brand-icon rotate-n-15">
	                    <i className="fas fa-laugh-wink"></i>
	                </div>
	                <div className="sidebar-brand-text mx-3">Pixellry</div>
	            </Link>

	            <li className="nav-item">
	                <Link className="nav-link collapsed" to="/" >
	                    <i className="fas fa-home mr-1"></i>
	                    <span>Pixellry HomePage</span>
	                </Link>
	            </li>

	             <li className="nav-item">
	                <Link className="nav-link" to="/dashboard" >
	                    <i className="fas fa-fw fa-tachometer-alt mr-1"></i>
	                    <span>Dashboard</span></Link>
	            </li>

	            <li className="nav-item">
	                <Link className="nav-link collapsed" to="/dashboard-search">
	                    <i className="fas fa-search mr-1"></i>
	                    <span>Latest Searches</span>
	                </Link>
	            </li>

	            <li className="nav-item">
	                <Link className="nav-link collapsed" to="/dashboard-download" >
	                    <i className="fas fa-angle-double-down mr-1"></i>
	                    <span>Downloads</span>
	                </Link>
	            </li>
	            <li className="nav-item">
	                <Link className="nav-link collapsed" to="/dashboard-collection" >
	                    <i className="fas fa-plus-circle mr-1"></i>
	                    <span>Collections</span>
	                </Link>
	            </li>

	            <li className="nav-item">
	                <Link className="nav-link collapsed" to="/dashboard-user" >
	                    <i className="fas fa-users mr-1"></i>
	                    <span>Users</span>
	                </Link>
	            </li>
	            <li className="nav-item">
	                <Link to="/logout" className="btn  btn-outline-danger">Logout</Link>
	            </li>
	        </ul>
	        
			)
	}
}

export default SideBar;
import React from 'react'
import './css/sb-admin-2.css'
import {Link} from 'react-router-dom'
import {Chart, registerables } from 'chart.js'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import SideBar from './sidebar.js'


class Dashboard extends React.Component {

	state = {data: []}

	async componentDidMount(){
	    try{
	      const jwt = localStorage.getItem('token')
	      const user = jwt_decode(jwt)
	      if (user.email !== "admin@gmail.com"){
	      	window.location = "/not-found"
	      }else{
	      	this.fetch_data()
	      }
	    }catch(ex){
	      
	    }
  	}

  	number_format = (number, decimals, dec_point, thousands_sep) => {
		  // *     example: number_format(1234.56, 2, ',', ' ');
		  // *     return: '1 234,56'
		  number = (number + '').replace(',', '').replace(' ', '');
		  var n = !isFinite(+number) ? 0 : +number,
		    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		    s = '',
		    toFixedFix = function(n, prec) {
		      var k = Math.pow(10, prec);
		      return '' + Math.round(n * k) / k;
		    };
		  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
		  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
		  if (s[0].length > 3) {
		    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		  }
		  if ((s[1] || '').length < prec) {
		    s[1] = s[1] || '';
		    s[1] += new Array(prec - s[1].length + 1).join('0');
		  }
		  return s.join(dec);
		}

  	user_chart = async (xAxes, yAxes) =>{
  		Chart.register(...registerables)
  		var ctx = document.getElementById("myBarChart");
		var myBarChart = new Chart(ctx, {
		  type: 'bar',
		  data: {
		    labels:  xAxes,
		    datasets: [{
		      label: "Users Joined",
		      backgroundColor: "#4e73df",
		      hoverBackgroundColor: "#2e59d9",
		      borderColor: "#4e73df",
		      data:  yAxes,
		    }],
		  },
		  options: {
		    maintainAspectRatio: false,
		    layout: {
		      padding: {
		        left: 10,
		        right: 25,
		        top: 25,
		        bottom: 0
		      }
		    },
		    scales: {
		      xAxes: [{
		        time: {
		          unit: 'month'
		        },
		        gridLines: {
		          display: false,
		          drawBorder: false
		        },
		        ticks: {
		          maxTicksLimit: 6
		        },
		        maxBarThickness: 25,
		      }],
		      yAxes: [{
		        ticks: {
		          min: 0,
		          max: 100,
		          maxTicksLimit: 5,
		          padding: 10,
		          // Include a dollar sign in the ticks
		          callback: function(value, index, values) {
		            return this.number_format(value);
		          }
		        },
		        gridLines: {
		          color: "rgb(234, 236, 244)",
		          zeroLineColor: "rgb(234, 236, 244)",
		          drawBorder: false,
		          borderDash: [2],
		          zeroLineBorderDash: [2]
		        }
		      }],
		    },
		    legend: {
		      display: false
		    },
		    tooltips: {
		      titleMarginBottom: 10,
		      titleFontColor: '#6e707e',
		      titleFontSize: 14,
		      backgroundColor: "rgb(255,255,255)",
		      bodyFontColor: "#858796",
		      borderColor: '#dddfeb',
		      borderWidth: 1,
		      xPadding: 15,
		      yPadding: 15,
		      displayColors: false,
		      caretPadding: 10,
		      callbacks: {
		        label: function(tooltipItem, chart) {
		          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
		          return datasetLabel + " " + this.number_format(tooltipItem.yLabel);
		        }
		      }
		    },
		  }
		});
  	}

  	fetch_data = async () =>{
	      try{
	        let response = await axios.get('http://localhost:3005/dashboard')
	        console.log(response) 
	        this.setState({data: response.data[0]})
	      }
	    catch(error) {
	      console.log(error);
	    }
	    // User Chart
	    try{
	        let response = await axios.get('http://localhost:3005/user-chart')
	        // console.log(response) 
	        let xAxes = []
	        let yAxes = []
	        let user_data = response.data
	        for(let i of user_data){
	        	xAxes.push(i.date)
	        	yAxes.push(i.no_of_user)
	        }
	        this.user_chart(xAxes, yAxes)
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
                

                
                <div className="container-fluid">
                    
                    <div className="row">

                        
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Users</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.data.total_users}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Total Searches</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.data.total_searches}</div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-warning shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Total Collections</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.data.total_collections}</div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-warning shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Total Downloads</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.data.total_downloads}</div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
				</div>

			{/*User Chart*/}
				<div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Users Chart</h6>
                                </div>
                                <div className="card-body">
                                    <div class="chart-bar"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                        <canvas id="myBarChart" className="chartjs-render-monitor" width="668" height="320"></canvas>
                                    </div>
                                </div>
                            </div>

			</div>
		</div>
	</div>
			)
	}
}

export default Dashboard;
import React, { useState, useEffect, Suspense } from 'react';
import API_KEY from '../API_KEY.js'
import { createClient } from 'pexels';
import '../css/gallery.css'
import ImageFeatures from './image-features'
import response from './res.js'
import videoresponse from './videores.js'
import LazyLoad from 'react-lazyload';
import Modal from './modal.js';

const List = (props) => {
	const [listItems, setListItems] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [page, setPage] = useState(1);


	useEffect(() => {
		fetchData();
		setTimeout(() => {
			window.addEventListener('scroll', handleScroll);
		}, 2000)
		
	}, []);

	const handleScroll = () => {
		if (window.location.pathname === '/explore' || window.location.pathname === '/account' ||
			window.location.pathname === '/liked'){
				return
		}else{
			if((window.innerHeight + window.scrollY) === document.documentElement.offsetHeight){
			window.scrollTo(0, document.documentElement.offsetHeight / 2)
			setIsFetching(true);
			}
		}
		
	};


	const fetchData = async () => {
		setTimeout(async () => {
			if (props.type === "images"){
				const client = createClient(API_KEY);
	    		const res = await client.photos.curated({page:page, per_page: 40})
	   			// const res = response
   			
				setPage(page + 1);
				setListItems(() => {
					return [...listItems, ...res.photos];
				});
				console.log("called api")
			}
			if (props.type === "videos"){
				const client = createClient(API_KEY);
	    		const res = await client.videos.popular({ per_page: page,  per_page: 20 })
	   			// const res = videoresponse
	   			console.log(res)
				setPage(page + 1);
				setListItems(() => {
					return [...listItems, ...res.videos];
				});
				console.log("called api")
			}
		}, 10);
	};

	useEffect(()=>{
		if(isFetching){
			fetchMoreListItems();	
		}else return;
	},[isFetching])

	const fetchMoreListItems = () => {
		fetchData();
		setIsFetching(false);
	};

	const handleFileType = (item) => {
		if(props.type === "images"){
			return (
				<>
				<LazyLoad offset={300}>
					<img
						src={item.src.portrait}
						className="w-100 shadow-1-strong rounded"
						alt="not found"
					/>
				</LazyLoad>
				<ImageFeatures type="image" downloadLink={item.src.portrait} item={item}/>
				</>)
		}
		if(props.type === "videos"){
			return (<>
				<LazyLoad offset={300}>
					<video 
					className="video-item w-100 shadow-1-strong rounded" data-toggle="tooltip" data-placement="top" title="Click to Play"
					muted
					loop 
					poster={item.image}
					onClick={event => event.target.play()}
	  				onMouseLeave={event => event.target.pause()}>
					  <source src={item.video_files[3].link} type="video/mp4" />
					</video>
	  			</LazyLoad>
	
				<ImageFeatures type="video" downloadLink={item.video_files[1].link} item={item}/>
				</>)
		}
	}
	return (
		<div className="container-fluid p-0">
    		<div className="row" >{
	        	listItems.map((item, index) => (
	        		<div className="col-lg-4 mb-lg-0 image"
        			key={index}>
						{handleFileType(item)}	
					</div>
					 
	        	))
	        }
	    	</div>
	    	<Modal/>
	    </div>
	);
};

export default List;

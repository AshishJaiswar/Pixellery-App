import React, { useState, useEffect, Suspense } from 'react';
import API_KEY from '../API_KEY.js'
import { createClient } from 'pexels';
import '../css/gallery.css'
import '../css/loading.css'
import response from './res.js'
import queryString from 'query-string'
import ImageFeatures from './image-features'
import Navbar from './navbar'
import LazyLoad from 'react-lazyload';
import Modal from './modal.js';

const SearchResult = (props) =>{
  const { query, type } = queryString.parse(props.location.search)
  const [keyword, setKeyword] = useState("")
  const [listItems, setListItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    validate();
    fetchData();
    setTimeout(() => {
      window.addEventListener('scroll', handleScroll);
    }, 2000)
    
  }, []);

  const validate = () => {
    if (type == "image" || type == "video"){
      //pass
    }else{
      alert("Invalid type")
      window.location.pathname = 'not-found'
    }
    let link = window.location.href
    if (link.includes("query") !== true || query === ""){
      window.location.pathname = 'not-found'
      return 
    }
    else{
      let keyword = trimString();
      setKeyword(keyword)
    }
  }

  const handleScroll = () => {
    if((window.innerHeight + window.scrollY) === document.documentElement.offsetHeight){
      window.scrollTo(0, document.documentElement.offsetHeight / 2)
      setIsFetching(true);
    }
  };


  const fetchData = async () => {
    setTimeout(async () => {
      if (type === "image"){
        const client = createClient(API_KEY);
        const res = await client.photos.search({ query, page, per_page: 30 })
        console.log(res)
        // const res = response
        setPage(page + 1);
        setListItems(() => {
          return [...listItems, ...res.photos];
        });
        console.log("called api: " + page)
        setLoading(false)
      }
      if (type === "video"){
        const client = createClient(API_KEY);
          const res = await client.videos.search({ query, page, per_page: 40 })
          // const res = videoresponse
          console.log(res)
        setPage(page + 1);
        setListItems(() => {
          return [...listItems, ...res.videos];
        });
        console.log("called api")
        setLoading(false)
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

  const trimString = () => {
    return query.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
  }

  const handleFileType = (item) => {
    if(type === "image"){
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
    if(type === "video"){
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
    <React.Fragment>
      <Navbar type={type}/>
      <h3 className="text-secondary">{keyword}</h3> 
      {loading && 
        <div>
          <div className="spinner-border text-primary m-4" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <h3 className="text-primary">Loading...</h3>
        </div>}
        {loading || (Boolean(listItems.length) || <h3>Image not Found</h3>)}
      <div className="container-fluid p-0">
          <div className="row">{
              listItems.map((item, index) => (
                <div className="col-lg-4 mb-lg-0 image" key={index}>
                  {handleFileType(item)}
            </div>
             
              ))
            }
          </div>
        </div>
        <Modal/>
      </React.Fragment>
  );
}

export default SearchResult;
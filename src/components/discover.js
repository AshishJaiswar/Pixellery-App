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

const Discover = (props) =>{
  const { id, title, type, count } = queryString.parse(props.location.search)
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    validate();
    fetchData();
    }, []);

  const validate = () => {
    let link = window.location.href
    if (link.includes("id") !== true || id === ""){
      window.location.pathname = 'not-found'
      return 
    }
  }


  const fetchData = async () => {
    setTimeout(async () => {
        const client = createClient(API_KEY);
        const res = await client.collections.media({ id:id, type: "photos", per_page:count })
        setListItems(() => {
          return [...listItems, ...res.media];
        });
        setLoading(false)
    }, 1000)
  };


  const handleFileType = (item) => {
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

  return (
    <React.Fragment>
      <Navbar type={type}/>
      <h3 className="text-secondary">{title}</h3> 
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

export default Discover;
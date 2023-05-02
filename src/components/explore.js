import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './navbar.js'
import Footer from './footer.js'
import API_KEY from '../API_KEY.js'
import { createClient } from 'pexels';
import '../css/explore.css'
import LazyLoad from 'react-lazyload';

class Explore extends React.Component {

  state = {itemList: [], collectionData: [], loading: true};

  async componentDidMount(){
    const client = createClient(API_KEY);
    const collectionsObj = await client.collections.featured({per_page: 40})
    console.log(collectionsObj)
    let dataArray = []
    const collections = collectionsObj.collections
    for (let i = 0; i < collections.length; i++){
      if(collections[i].photos_count > 10){
        dataArray.push(collections[i])
      }
    }
    this.setState({collectionData: [...dataArray]})
    try{
      let collection1 = await client.collections.media({ id:dataArray[0].id, type: "photos", per_page: 5 })
      let collection2 = await client.collections.media({ id:dataArray[1].id, type: "photos", per_page: 5 })
      let collection3 = await client.collections.media({ id:dataArray[2].id, type: "photos", per_page: 5 })
      let collection4 = await client.collections.media({ id:dataArray[3].id, type: "photos", per_page: 5 })
      let collection5 = await client.collections.media({ id:dataArray[4].id, type: "photos", per_page: 5 })
      let collection6 = await client.collections.media({ id:dataArray[5].id, type: "photos", per_page: 5 })
      let collection7 = await client.collections.media({ id:dataArray[6].id, type: "photos", per_page: 5 })
      let collection8 = await client.collections.media({ id:dataArray[7].id, type: "photos", per_page: 5 })
      let collection9 = await client.collections.media({ id:dataArray[8].id, type: "photos", per_page: 5 })
      let collection10 = await client.collections.media({ id:dataArray[9].id, type: "photos", per_page: 5 })
      let collection11 = await client.collections.media({ id:dataArray[10].id, type: "photos", per_page: 5 })
      let collection12 = await client.collections.media({ id:dataArray[11].id, type: "photos", per_page: 5 })
      this.setState({itemList: [collection1, collection2, collection3, collection4,
        collection5, collection6, collection7, collection8,
        collection9, collection10, collection11, collection12]})
      this.setState({loading:false})
    }catch(err){
      console.log(err)
    }
    
  }

  viewCollection = async (link) =>{
    window.location = link
  }
   renderCollection = (collection, index) =>{
    // console.log(collection)
    const currentCollectionData = this.state.collectionData[index]
    console.log(currentCollectionData)
    let imageArray = []
    for (let item of collection.media){
      imageArray.push(item.src.tiny)
    }
    let link = `/discover?id=${currentCollectionData.id}&title=${currentCollectionData.title}&count=${currentCollectionData.photos_count}&type=image`
      return (
              <Link to={link} className="col-lg-4 mb-lg-0 column" key={index}>
                    <div className="main-img-box">
                      <LazyLoad>
                        <img
                          src={imageArray[0]}
                          alt="not found"
                        />
                      </LazyLoad>
                    </div>
                    <div className="sec-img-box">
                      <div className="img-box">
                        <LazyLoad>
                        <img
                          src={imageArray[1]}
                          alt="not found"
                        />
                      </LazyLoad>
                      </div>
                      <div className="img-box">
                        <LazyLoad>
                        <img
                          src={imageArray[2]}
                          alt="not found"
                        />
                      </LazyLoad>
                      </div>
                      <div className="img-box">
                        <LazyLoad>
                        <img
                          src={imageArray[3]}
                          alt="not found"
                        />
                      </LazyLoad>
                      </div>
                      <div className="img-box">
                        <LazyLoad>
                        <img
                          src={imageArray[4]}
                          alt="not found"
                        />
                      </LazyLoad>
                      </div>
                    </div>
                    <div className="info-box">
                      <div className="title"><h4>{currentCollectionData.title}</h4></div>
                      <div className="count"><i className="far fa-images"></i><b>{currentCollectionData.media_count}</b></div>
                    </div>
              </Link>
        )
    }
  render() {

    return (
      <>
      <Navbar type="image"/>
      <h3 className="text-left pl-4 ml-1  mt-3">Popular collections</h3>
      {this.state.loading && 
        <div>
          <div className="spinner-border text-primary m-4" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <h3 className="text-primary">Loading...</h3>
        </div>}
      <div className="container-fluid">
        <div className="row">
          {this.state.itemList.map((collection, index) => (
              this.renderCollection(collection, index)
            ))}
        </div>
      </div>
      <Footer />
      </>)
}
}
export default Explore;
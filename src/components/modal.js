import React from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
class Modal extends React.Component {

  state = {data: []};

  async componentDidMount(){
    try{
      const jwt = localStorage.getItem('token')
      const user = jwt_decode(jwt)
      this.setState({user})
      this.getCollection(user)  
      }catch(ex){
    }
  
  }

  getCollection = async (user) =>{
    let collections = await axios.get(`http://localhost:3005/get-collection/${user.id}`)
    this.setState({data:collections.data})
  }
  createCollection = async () =>{
    let newName = prompt("New Collection Name")
    if (newName !== null){
      let response = await axios.post('http://localhost:3005/new-collection', {
        user_id: this.state.user.id,
        collection_name: newName
      })
      this.getCollection(this.state.user)
      alert(response.data)
    }
  }

  addToCollection = async () => {
    const resourceId = document.getElementById("image-id").value
    const e = document.getElementById("exampleFormControlSelect1")
    const selected_collection = e.options[e.selectedIndex].text
    
    let response = await axios.post('http://localhost:3005/add-to-collection', {
        resource_id: resourceId,
        collection_name: selected_collection
      })
    if(response.data){
      alert(response.data)
    }
  }
  render() {
    
    return (
      <>
        <div className="modal fade" id={this.state.user && "exampleModal"} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <input type="hidden" id="image-id" />
                    <h5 className="modal-title" id="exampleModalLabel">My Collections</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect1">Collection</label>
                      <select className="form-control" id="exampleFormControlSelect1">
                        {this.state.data.map((name, index) =>(
                            <option key={index}>{name.collection_name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button"
                    onClick={this.createCollection}
                    className="btn btn-primary">Create New</button>
                    <button type="button" className="btn btn-primary"
                    onClick={this.addToCollection}>Add to Collection</button>
                  </div>
                </div>
              </div>
            </div>
      </>
      )
  }
}

export default Modal;
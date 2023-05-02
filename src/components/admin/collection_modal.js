import React from 'react'
import axios from 'axios'

class CollectionModal extends React.Component {
    state = {}
  
    getCollection = async () =>{
      if (this.props.name !== ""){
        let collections = await axios.get(`http://localhost:3005/table-collection-resource/${this.props.name}`)
        this.setState({data:collections.data})
      }
    }

    render() {
    this.getCollection()
    return (
      <>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <input type="hidden" id="image-id" />
                    <h5 className="modal-title" id="exampleModalLabel">{this.props.name}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect1" className="font-weight-bold">Resource Id</label>
                        {this.state.data && this.state.data.map((item, index) =>(
                            <h6 key={index} className="border-bottom pb-2">{item.resource_id}</h6>
                          ))
                        }
                    </div>
                  </div>
              </div>
            </div>
          </div>
      </>
      )
  }
}

export default CollectionModal;
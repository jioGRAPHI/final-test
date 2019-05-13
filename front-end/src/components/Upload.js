import React, { Component } from 'react';
import axios from 'axios'

class Upload extends Component {
  constructor() {
    super()
    this.state = {
      photos: null,
      status: '',
      photoList: [],
      beforeUpload: true
    }
    this.changeFiles = this.changeFiles.bind(this)
    this.handlePhotoUpload = this.handlePhotoUpload.bind(this)
  }

  changeFiles(e) {
    const fileData = e.target.files
    let toBeUploaded = []
    for(let y = 0; y < fileData.length; y++) {
      toBeUploaded.push(fileData[y].name)
    }
    this.setState({
      photos: fileData,
      photoList: toBeUploaded,
      rest_id: 100
    })
  }

  handlePhotoUpload(e){
    // const { photos } = this.state;
    e.preventDefault();
    const formData = new FormData();
    for(let x = 0; x<this.state.photos.length; x++) {
      formData.append('photos', this.state.photos[x])
    }
    formData.append('rest_id', this.state.rest_id)
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, ':', value);
    // }
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    }
    axios.post("/upload-restaurant-photos", formData,config)
        .then((response) => {
            console.log(response.data.message)
            this.setState({
              status: response.data.message,
              beforeUpload: false
            })
        })
        .catch((error) => {})
  }

  render() {
    return (
      <div>
        {this.state.status}

        {this.state.beforeUpload && this.state.photoList.map((photo, index) => {
          return <div key={index}>{photo}</div>
        })}
        <form onSubmit={this.handlePhotoUpload} enctype="multipart/form-data" method="POST">
          <input type="file" name="photos" multiple onChange={this.changeFiles} required />
          <input type="submit" value="Upload" />
        </form>
      </div>
    );
  }
}

export default Upload;

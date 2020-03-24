
import React, { Component } from 'react';
import axios from 'axios';
import "./style.css";
import {Redirect} from 'react-router-dom';
import Loading from '../../components/Loading'
//import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class RequestReset extends Component {
  render() {
    return <Register/>
  }
}


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      resetMessage: null
    };
  }
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    

    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
      const user = {
        email: this.state.email
      }
      axios.post('/auth/reset', user)
        .then(res => {
          if(res.data.message){
            this.setState({resetMessage: res.data.message})
          }
        })
    }



  render() {
    return (
      <div id="outer-container">
      <h1>StaySafe</h1>
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Reset Password</h2>
          <form onSubmit={this.handleSubmit}>
            <div className='email'>
              <label htmlFor="email">Email</label>
              <input type='email' name='email' onChange={this.handleChange} />
              <button className="reset-btn">Request Reset</button>
              <p id="reset-error">{this.state.resetMessage}</p>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}
          
          
                 
    export default RequestReset;
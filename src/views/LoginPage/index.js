
import React, { Component } from 'react';
import axios from 'axios';
import "./style.css"
//import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class FormPage extends Component {
  render() {
    return (
      <Register/>
      
    );
  }
}


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      errors: {
        email: '',
        password: '',
      }
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
        email: this.state.email,
        password: this.state.password
      }
      console.log(user);
      axios.post(`/auth/login`, user)
      .then(res => {
        window.location = '/home';
      })
    }



  render() {
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Sign In</h2>
          <form onSubmit={this.handleSubmit}>
            <div className='email'>
              <label htmlFor="email">Email</label>
              <input type='email' name='email' onChange={this.handleChange} />
            </div>
            <div className='password'>
              <label htmlFor="password">Password</label>
              <input type='password' name='password' onChange={this.handleChange} />
            
            </div>
            <div className='submit'>
              <button>Log In</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
          
          
                 
    export default FormPage;
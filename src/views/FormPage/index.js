
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
const validPhoneRegex=RegExp(/^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/i)
const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      password: null,
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber:'',
        password: '',
      }
    };
  }
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'firstName': 
        errors.firstName = 
          value.length < 2
            ? 'First Name must be 2 characters long!'
            : '';
        break;
        case 'lastName': 
        errors.lastName = 
          value.length < 2
            ? 'Last Name must be 2 characters long!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'phoneNumber':
        errors.phoneNumber=
        validPhoneRegex.test(value)  
        ? ''
        : 'Must Be A Valid Phone Number';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be at least 8 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      const user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        password: this.state.password
      }
      axios.post(`/auth/signup`, user)

      .then(res => {
        window.location = '/home';
      });
      console.info('Valid Form')
    }else{
      console.error('Invalid Form')
    }
  }

  render() {
    const {errors} = this.state;
    return (
      <div className='wrapper'>
      <div className='form-wrapper'>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='firstName'>
            <label htmlFor="firstName">First Name</label>
            <input type='text' name='firstName' onChange={this.handleChange} />
            {errors.firstName.length > 0 &&
              <span className='error'>{errors.firstName}</span>}
              <br/>
            <label htmlFor="lastName">Last Name</label>
            <input type='text' name='lastName' onChange={this.handleChange} />
            {errors.lastName.length > 0 &&
              <span className='error'>{errors.lastName}</span>}
              <br/>
            <label htmlFor="email">Email</label>
            <input type='email' name='email' onChange={this.handleChange} />
            {errors.email.length > 0 &&
              <span className='error'>{errors.email}</span>}
              <br/>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type='phoneNumber' name='phoneNumber' onChange={this.handleChange} />
            {errors.phoneNumber.length > 0 &&
              <span className='error'>{errors.phoneNumber}</span>}
              <br/>
            <label htmlFor="password">Password</label>
            <br/>
            <input type='password' name='password' onChange={this.handleChange} />
            {errors.password.length > 0 &&
              <span className='error'>{errors.password}</span>}
              <br/>
            <small>Password must be at least eight characters in length.</small>
            <button className="sign-up-button">Sign Up</button>
          </div>
        </form>
      </div>
    </div>

  );
}
}
          
          
                 
export default FormPage;
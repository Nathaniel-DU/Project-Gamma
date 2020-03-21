import React, { Component } from 'react';
import axios from 'axios';
import "./style.css"
import profileData from "../../utils/profileData";
import Hamburger from "../../components/Hamburger";
//import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class EditProfile extends Component {
  render() {
    return (
      <Edit/>
      
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

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber:'',
      }
    };
  }

  componentDidMount(){
    profileData()
      .then(data => this.setState({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber
      }));
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
      }
      axios.put(`/user/profile`, user)

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
      <div id="outer-container">
      <Hamburger />
      <h1>StaySafe</h1>
      <br/>
      <main id="page-wrap">
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Edit Profile</h2>
          <form onSubmit={this.handleSubmit}>
            <div className='firstName'>
              <label htmlFor="firstName">First Name</label>
              <input value={this.state.firstName} type='text' name='firstName' onChange={this.handleChange} />
              {errors.firstName.length > 0 && 
                <span className='error'>{errors.firstName}</span>}
              <br/>
              <label htmlFor="lastName">Last Name</label>
              <input value={this.state.lastName} type='text' name='lastName' onChange={this.handleChange} />
              {errors.lastName.length > 0 && 
                <span className='error'>{errors.lastName}</span>}
                <br/>
              <label htmlFor="email">Email</label>
              <input value={this.state.email} type='email' name='email' onChange={this.handleChange} />
              {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
                <br/>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input value={this.state.phoneNumber} type='phoneNumber' name='phoneNumber' onChange={this.handleChange} />
              {errors.phoneNumber.length > 0 && 
                <span className='error'>{errors.phoneNumber}</span>}
                <br/>
                <button className="save-changes-btn">Save Changes</button>
                <button to="/home" className="cancel-profile-changes-btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      </main>
      </div>
    );
  }
}
          
          
                 
export default EditProfile;
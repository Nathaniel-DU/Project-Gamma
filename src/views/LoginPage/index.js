import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./style.css";

class LoginPage extends Component {
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
      email: '',
      password: null,
      loginError: ''
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
        email: this.state.email.toLowerCase(),
        password: this.state.password
      }
      axios.post(`/auth/login`, user)
        .then(res => {
          if(res.data.status === 401){
            this.setState({loginError: res.data.message})
          }else{
            window.location = '/home';
          }
        })
        .catch(err => {
          console.log(err);
        })
    }

  render() {
    return (
      <div id="outer-container">
      <h1>StaySafe</h1>
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
              <p id="login-error">{this.state.loginError}</p>
              <button className="login-btn">Log In</button>
            </div>
          </form>
          <Link to="/auth/password-reset">Forgot Password?</Link>
        </div>
      </div>
      </div>
    );
  }
}
        
export default LoginPage;

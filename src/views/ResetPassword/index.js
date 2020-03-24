import React, { Component } from 'react';
import axios from 'axios';
import "./style.css";
import {Redirect} from 'react-router-dom';
import Loading from '../../components/Loading'

class ResetPassword extends Component {
  state = {
    isValidReset: false,
    loading: true
  }

  componentDidMount(){
    axios.get(`/auth/reset/${this.props.match.params.resetid}`)
      .then(res => {
        console.log(res.status);
        if(res.status === 200){
          this.setState({
            isValidReset: true, 
            loading: false})
        }else{
          this.setState({loading: false})
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        })
      });
  }

  render() {
    if(this.state.loading === false && this.state.isValidReset === true){
      return <Register resetid={this.props.match.params.resetid}/>
    }else if(this.state.loading === false && this.state.isValidReset === false){
      return <Redirect to="/"/>
    }
    return (
      <Loading/>
    );
  }
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmPassword: null,
      password: null,
      resetError: ''
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
        confirmPassword: this.state.confirmPassword,
        password: this.state.password
      }
      axios.post(`/auth/reset/${this.props.resetid}`, user)
        .then(res => {
          if(res.data.status === 422){
            this.setState({resetError: res.data.message})
          }else{
            window.location = '/auth/login';
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
            <h2>Reset Password</h2>
            <form onSubmit={this.handleSubmit}>
              <div className='password'>
                <label htmlFor="password">Password</label>
                <input type='password' name='password' onChange={this.handleChange} />
              </div>
              <div className='password'>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type='password' name='confirmPassword' onChange={this.handleChange} />
                <button className="login-btn">Reset Password</button>
                <p id="reset-error">{this.state.resetError}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
              
export default ResetPassword;
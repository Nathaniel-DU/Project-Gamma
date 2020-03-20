import React from 'react';
import axios from 'axios';
import './style.css';

const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class FriendSearch extends React.Component {

    state = {
        email: null,
        errors: {
            email: ''
        },
        inviteRes: ''
    }

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'email': 
              errors.email = 
                validEmailRegex.test(value)
                  ? ''
                  : 'Email is not valid!';
              break;
              default:
            break;
        }
        this.setState({errors, [name]: value});
        
    }

    handleSubmit = event => {
        event.preventDefault();
        if(validateForm(this.state.errors)) {
        const friend = {
            email: this.state.email,
        }
        axios.post(`/user/friendinvite`, friend)
        .then(res => {
            this.setState({inviteRes: res.data});
        });
        console.info('Valid Search')
        }else{
        console.error('Invalid Search')
        }
        event.target.reset();
    }
  
    render () {
      return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <h4>Add Friend:</h4>
                <label htmlFor="search-friend"></label>
                <input id='search-friend' name='email' type="text" placeholder="Enter email" onChange={this.handleChange}/>
                {this.state.errors.email.length > 0 && 
                <span className='error'>{this.state.errors.email}</span>}
                {this.state.inviteRes.length > 0 && 
                <span className='error'>{this.state.inviteRes}</span>}
                <button className='blue-button' type='submit'>Invite</button>
            </form>
        </div>
      );
    }
}
  
export default FriendSearch;
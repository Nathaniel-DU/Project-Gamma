import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuthenticated from '../../utils/isAuthenticated';

class ProtectedRoute extends Component {

    state = {
        authenticated: null
    }

    componentDidMount(){
        const authenticated = isAuthenticated();
        console.log(authenticated);
    }

    render() {
      const { component: Component, ...props } = this.props
  
      return (
        <Route 
          {...props} 
          render={props => (
            this.state.authenticated ?
              <Component {...props} /> :
              <Redirect to='/auth/login' />
          )} 
        />
      )
    }
  }

  export default ProtectedRoute;
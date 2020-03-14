import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import './style.css';
import StartLocation from "../../views/StartLocation";
import StartLocationButton from '../StartLocationButton';
import axios from 'axios';

class ModalPage extends Component {
  
state = {
  modal1: false,
  modal2: false,
  modal3: false,
  modal4: false
}

toggle = nr => () => {
  let modalNumber = 'modal' + nr;
  switch(modalNumber){
    case 'modal1':
      this.getMyLocation();
      axios.get('/event/excuse')
        .catch(err => console.log(err));
      break;
    case 'modal2': 
        this.getMyLocation();
        axios.get('/event/ride')
        .catch(err => console.log(err));
        break;
    case 'modal3':
      this.getMyLocation();
      axios.get('/event/emergency')
      .catch(err => console.log(err));
      break;
    case 'modal4': 
    this.getMyLocation();
    break;
    default:
      break;
  }
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}

toggleOff = nr => () => {
  let modalNumber = 'modal' + nr;
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}

  constructor() {
    super()

    this.state = {
      latitude: '',
      longitude: '',
      eventStarted: false
    }

    this.getMyLocation = this.getMyLocation.bind(this);
    this.startTrip = this.startTrip.bind(this);
    this.stopTrip = this.stopTrip.bind(this);
  }

  getMyLocation() {
    
    const location = window.navigator && window.navigator.geolocation

    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        //Axios post request goes here.
        axios.put('/event/updatelocation', {
          lat: this.state.latitude,
          long: this.state.longitude,
        })
        .catch(err => console.log(err));
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      });
      
    }
    
  }

  startTrip() {
    this.setState({ eventStarted: true });
  }

  stopTrip(){
    fetch(`/event/stop`);
    window.location.reload();
  }

 


render() {
  return (
      <MDBContainer>
        <MDBBtn className="modal-btn" onClick={this.stopTrip}>Stop Trip</MDBBtn>
        <MDBBtn className="modal-btn" color="primary" onClick={this.toggle(1)}>Excuse Call</MDBBtn>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggleOff(1)} centered>
          <MDBModalHeader toggle={this.toggleOff(1)}>Message Sent</MDBModalHeader>
          <MDBModalFooter>
            <MDBBtn className="dismiss-modal" onClick={this.toggleOff(1)}>Dismiss</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <MDBBtn className="modal-btn" color="primary" onClick={this.toggle(2)}>Request Pickup</MDBBtn>
        <MDBModal isOpen={this.state.modal2} toggle={this.toggleOff(2)} centered>
          <MDBModalHeader className="modal-header" toggle={this.toggleOff(2)}>Message sent</MDBModalHeader>
          <MDBModalFooter>
          <MDBBtn className="dismiss-modal" onClick={this.toggleOff(2)}>Dismiss</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <MDBBtn className="modal-btn" color="primary" onClick={this.toggle(3)}>Request Emergency Assistance</MDBBtn>
        <MDBModal isOpen={this.state.modal3} toggle={this.toggleOff(3)} centered>
          <MDBModalHeader toggle={this.toggleOff(3)}>Message Sent</MDBModalHeader>
          <MDBModalFooter>
          <MDBBtn className="dismiss-modal" onClick={this.toggleOff(3)}>Dismiss</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <MDBBtn className="modal-btn" color="primary" onClick={this.toggle(4)}>Update Location</MDBBtn>
        <MDBModal isOpen={this.state.modal4} toggle={this.toggleOff(4)} centered>
          <MDBModalHeader toggle={this.toggleOff(4)}>Location Updated</MDBModalHeader>
          <MDBModalFooter>
          <MDBBtn className="dismiss-modal" onClick={this.toggleOff(4)}>Dismiss</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
      
    );
  }
}

export default ModalPage;
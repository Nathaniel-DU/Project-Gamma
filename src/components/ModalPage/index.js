import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import './style.css';
import StartLocation from "../../views/StartLocation";
import StartLocationButton from '../StartLocationButton';

class ModalPage extends Component {
  
state = {
  modal1: false,
  modal2: false,
  modal3: false,
  modal4: false
}

toggle = nr => () => {
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}

render() {
  return (
      <MDBContainer>
        <StartLocationButton text="Stop Trip"></StartLocationButton>
        <MDBBtn className="modal-btn" color="primary" onClick={this.toggle(1)}>Excuse Call</MDBBtn>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
          <MDBModalHeader toggle={this.toggle(1)}>Message Sent</MDBModalHeader>
          <MDBModalFooter>
            <MDBBtn className="dismiss-modal" onClick={this.toggle(1)}>Dismiss</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <MDBBtn className="modal-btn" color="primary" onClick={this.toggle(2)}>Request Pickup</MDBBtn>
        <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} centered>
          <MDBModalHeader className="modal-header" toggle={this.toggle(2)}>Message sent</MDBModalHeader>
          <MDBModalFooter>
          <MDBBtn className="dismiss-modal" onClick={this.toggle(2)}>Dismiss</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <MDBBtn className="modal-btn" color="primary" onClick={this.toggle(3)}>Request Emergency Assistance</MDBBtn>
        <MDBModal isOpen={this.state.modal3} toggle={this.toggle(3)} centered>
          <MDBModalHeader toggle={this.toggle(3)}>Message Sent</MDBModalHeader>
          <MDBModalFooter>
          <MDBBtn className="dismiss-modal" onClick={this.toggle(3)}>Dismiss</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <MDBBtn className="modal-btn" color="primary" onClick={this.toggle(4)}>Update Location</MDBBtn>
        <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} centered>
          <MDBModalHeader toggle={this.toggle(4)}>Location Updated</MDBModalHeader>
          <MDBModalFooter>
          <MDBBtn className="dismiss-modal" onClick={this.toggle(4)}>Dismiss</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
      
    );
  }
}

export default ModalPage;
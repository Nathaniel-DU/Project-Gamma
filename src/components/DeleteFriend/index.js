import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import axios from 'axios';

export default class DeleteFriend extends Component {

    state = {
        modal1: false
    }

    deleteUser = () => {
        axios.get(`/user/remove/${this.props.userId}`);
    }

    toggle = nr => () => {
        let modalNumber = `modal` + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    toggleOff = nr => () => {
        let modalNumber = `modal` + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
        this.deleteUser();
    }

    render() {
        return (
            <MDBContainer>
                <MDBBtn size="sm" className="delete-btn" onClick={this.toggle(1)}><FontAwesomeIcon className="fa-icon delete-icon" icon={faTimes} /></MDBBtn>
                <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
                    <MDBModalHeader className="modal-header" toggle={this.toggle(1)}>Confirm Deletion</MDBModalHeader>
                    <MDBModalBody className="modal-body">
                        Are you sure you want to remove this friend from your friend&apos;s list?
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn className="close-mdl" onClick={this.toggle(1)}>Cancel</MDBBtn>
                        <MDBBtn className="confirm-delete-btn" onClick={this.toggleOff(1)}>Confirm</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

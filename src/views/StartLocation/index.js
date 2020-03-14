import React, { Fragment, Component } from "react";
import StartLocationButton from "../../components/StartLocationButton";
import UpdateView from "../UpdateView";
import Hamburger from '../../components/Hamburger';
import Header from '../../components/Header';
import './style.css';
import axios from 'axios';

export default class StartLocation extends Component {

  constructor() {
    super()

    this.state = {
      latitude: '',
      longitude: '',
      eventStarted: false
    }

    this.getMyLocation = this.getMyLocation.bind(this);
    this.startTrip = this.startTrip.bind(this);
  }

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation

    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        axios.post('/event/start', {
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

  render() {

    return (
      <div id="outer-container">
        <Hamburger />
        <main id="page-wrap">
          <Fragment>
            {!this.state.eventStarted &&
            <div>
              <h1>StaySafe</h1>
              <div className="start-location">
                <div className="container start-trip"><h2>Click to begin trip.</h2></div>
                  <StartLocationButton
                    text='Start'
                    getMyLocation={this.getMyLocation}
                    startTrip={this.startTrip} />
                </div>
                </div>
            }
            {this.state.eventStarted && <UpdateView />}
          </Fragment>
        </main>
      </div>
    )
  }
}
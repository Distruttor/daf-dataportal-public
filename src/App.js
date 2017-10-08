import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = (props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>




class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

          <MyMapComponent isMarkerShown />// Map with a Marker
          <MyMapComponent isMarkerShown={false} />// Just only Map

      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js'


    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyA0GhwCA0e8fn36hEFCS2TL8tYACKKwhu0",
      authDomain: "create-react-app-65812.firebaseapp.com",
      databaseURL: "https://create-react-app-65812.firebaseio.com",
      projectId: "create-react-app-65812",
      storageBucket: "create-react-app-65812.appspot.com",
      messagingSenderId: "1075541061306"
    };
    firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Chat Room</h1>
        </header>
        <div className="container">
          <RoomList
            firebase={firebase}
            />
        </div>
      </div>
    );
  }
}

export default App;

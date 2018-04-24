import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js'
import MessageList from './components/MessageList.js'

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
    constructor(props){
      super(props);
      this.state = {activeRoom: ''};
      this.activeRoom = this.activeRoom.bind(this);
    }

    activeRoom(room){
      this.setState({ activeRoom: room })
    }


    render() {
      const showMessages = this.state.activeRoom;

      return (
        <div className="App">
          <div className="container">
            <div className="RoomList">
            <h1>Bloc chat</h1>
                <RoomList firebase={firebase} activeRoom={this.activeRoom} />
            </div>
            <div className="MessageBar">
            <h1>
              { showMessages ?
                this.state.activeRoom.name
                : null
              }
              </h1>
              { showMessages ?
                (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key}/>)
                : null
              }
            </div>
          </div>
        </div>
      );
    }
  }

export default App;

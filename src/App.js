import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js'
import MessageList from './components/MessageList.js'
import User from './components/User.js'


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
      this.state = {
        activeRoom: null,
        user: null
      };
    }

  activeRoom(room){
    this.setState({activeRoom: room});
  }

  setUser(user){
    this.setState({user: user});
  }

    render() {
      const showRoom = this.state.activeRoom;

      return (
        <div className="App">
          <div className="container">
            <header className="header">
              <h1>

              <User 
                firebase={firebase} 
                setUser={this.setUser.bind(this)}
                user={this.state.user} 
              />

              </h1>
            </header>

            <div className="RoomList">
              <h2>Bloc chat</h2>

              <RoomList 
                firebase={firebase} 
                activeRoom={this.activeRoom.bind(this)} 
                user={this.state.user}
              />
            </div>

            <div className="MessageBar">
              <h2>
                { showRoom ?
                  this.state.activeRoom.name
                  : null
                }
              </h2>
              { showRoom ?

                (<MessageList 
                  firebase={firebase} 
                  activeRoom={this.state.activeRoom.key} 
                  user={this.state.user} />)
                : null
              }

            </div>
          </div>
        </div>
      );
    }
  }

export default App;

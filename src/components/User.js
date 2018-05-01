import React, { Component } from 'react';

class User extends Component {

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn(e){
    this.props.firebase.auth().signInWithPopup( new this.props.firebase.auth.GoogleAuthProvider() );
  }

  signOut(e){
    this.props.firebase.auth().signOut();
  }

  render(){

    return (
      <div className="userDisplay">
        <div>{this.props.user ? this.props.user.displayName : "Guest"}</div>
        <button onClick={this.props.user ? this.signOut.bind(this): this.signIn.bind(this)} type="button">
          <span>Sign { this.props.user ? 'out':'in' }</span>
        </button>
      </div>
    );
  }

}

export default User;
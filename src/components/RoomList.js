import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {rooms: [],name:''};
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  createRoom(e){
    e.preventDefault();
    this.roomsRef.push({ name: this.state.name });
    this.setState({ name: '' });
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  render(){
    const roomList = this.state.rooms.map((room) =>
      <li key={room.key} onClick={(e) => this.selectRoom(room, e)}>{room.name}</li>
      );

    const roomForm = (
      <form onSubmit = {this.createRoom}>
        <input type="text" value={this.state.title} onChange={this.handleChange}/>
        <input type="submit" value="Create"/>
      </form>
    );

    return(
      <div>
        <ul>{roomList}</ul>
        <div>{roomForm}</div>
      </div>
    );
  }
}



 export default RoomList;

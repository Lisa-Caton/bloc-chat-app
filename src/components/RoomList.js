import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {rooms: [], name:''};
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  createRoom(e){
    e.preventDefault();
    this.roomsRef.push({ name: this.state.name });
    this.setState({ name: '' });
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  selectRoom(room) {
    this.props.activeRoom(room);
  }


  render(){
    const roomForm = (
      <form onSubmit = {(e) => this.createRoom(e)}>
        <input type="text" value={this.state.name} onChange={(e) => this.handleChange(e)}/>
        <input type="submit" value="New Room"/>
      </form>
    );

    const roomList = this.state.rooms.map((room) =>
      <li key={room.key} placeholder="Enter Room Name" onClick={(e) => this.selectRoom(room, e)}>{ room.name }</li>
    );



    return(
      <div>
        <div>{roomForm}</div>
        <ul>{roomList}</ul>
      </div>
    );
  }
}



 export default RoomList;

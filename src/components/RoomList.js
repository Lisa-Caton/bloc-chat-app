import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      name:''
    };
    this.roomsRef = this.props.firebase.database().ref('Rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({
        rooms: this.state.rooms.concat(room)
      });
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({name: e.target.value});
  }

  createRoom(e){
    e.preventDefault();
    this.roomsRef.push({ name: this.state.name});
    this.setState({name: '' });
  }

  selectRoom(room) {
    this.props.activeRoom(room);
  }

  render(){
    const roomForm = (
      <form 
        onSubmit = {this.createRoom.bind(this)}>

      <input 
        type="text" 
        name="name" 
        value={this.state.name} 
        placeholder="Enter Room Name" 
        onChange={this.handleChange.bind(this)}
      />

      <input 
        type="submit" 
        value="New Room"
      />

      </form>
    );

    const roomList = this.state.rooms.map((room) =>
      <li key={room.key} onClick={(e) => this.selectRoom(room, e)}>{ room.name }</li>
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

import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {username:'', content: '', sentAt: '', roomId: '', messages: []};
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  handleChange(e) {
    e.PreventDefault();
    this.setState({
      username: 'user',
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }

  createMessage(e){
    e.PreventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }


  render(){
    const activeRoom = this.props.activeRoom;

    const messageBar = (
      <form onSubmit= {(e) => this.createMessage(e)}>
        <input type="text" value={this.state.content} placeholder="Enter Message" onChange={(e) => this.handleChange(e)} />
        <input type="submit" value="Send" />
      </form>
      );

    const messageList = (
      this.state.messages.map((message) => {
        if (message.roomId === activeRoom) {
          return <li key={message.key}>{message.content}</li>
        }
        return null;
      })
    );

    return(
      <div>
        <div>{messageBar}</div>
        <ul>{messageList}</ul>
      </div>
    );
  }
}



export default MessageList;
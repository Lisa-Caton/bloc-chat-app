import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      content: '',
      sentAt: '',
      roomId: '',
      messages: []
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ 
        messages: this.state.messages.concat(message)
      });
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.props.user.displayName,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }

  createMessage(e){
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      roomId: this.state.roomId,
      sentAt: this.state.sentAt,
    });
    this.setState({
      username:'',
      content: '',
      roomId: '',
      sentAt: '',
    });
  }

  render(){
    const activeRoom = this.props.activeRoom;

    const messageBar = (
      <form onSubmit= {this.createMessage.bind(this)}>
        <input type="text" value={this.state.content} placeholder="Enter Message" onChange={this.handleChange.bind(this)} />
        <input type="submit" value="Send" />
      </form>
      );

    const messageList = (
      this.state.messages.map((messages) => {
        if (messages.roomId === activeRoom) {
          return <li key={messages.key}>{messages.username}: {messages.content}</li>
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
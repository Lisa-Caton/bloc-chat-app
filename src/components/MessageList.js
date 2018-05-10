import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.setState({content: e.target.value,});
  }

  createMessage(e){
    e.preventDefault();
    this.messagesRef.push({
      content: this.state.content,
      roomId: this.props.activeRoom,
      creator: this.props.user ? {username: this.props.user.displayName} : {username:'Guest'}
    });
    this.setState({
      content: '',
      roomId: '',
      creator: ''
    });
  }

  render(){
    const activeRoom = this.props.activeRoom;

    const messageBar = (
      <form 
        onSubmit= {this.createMessage.bind(this)}>

      <input 
        type="text" 
        value={this.state.content} 
        placeholder="Enter Message" 
        onChange={this.handleChange.bind(this)} 
      />

      <input type="submit" value="Send" 
      />

      </form>
      );

    const messageList = (
      this.state.messages.map((messages) => {
        if (messages.roomId === activeRoom) {
          return <li key={messages.key}>{ messages.creator ? messages.creator.username : 'Guest'} : {messages.content}</li>
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
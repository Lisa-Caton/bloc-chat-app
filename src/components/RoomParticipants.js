import React, {Component} from 'react';

class RoomParticipants extends Component {  
	constructor(props) {
    super(props);
    this.state = {participants: [], isOpen: true};
  }

  componentDidMount() {
    const userRef = this.props.firebase.database().ref("presence/");
    userRef.orderByChild("currentRoom").equalTo(this.props.activeRoom).on('value', snapshot => {
      const participantChanges = [];
        if (snapshot.val()) {
          snapshot.forEach((participant) => {
            participantChanges.push({
              key: participant.key,
              username: participant.val().username,
              isTyping: participant.val().isTyping
            });
          });
        }
      this.setState({ participants: participantChanges});
    });
  }


  render() {
    const roomParticipants = (
      this.state.participants.map((participant) =>
        <div key={participant.key}>
          <h4 className="participant-name">
            {participant.username}
            <span><small>{participant.isTyping ? " is typing..." : null}</small></span>
          </h4>
        </div>
      )
    );

    return(
      <div>
        <p className="participants-heading">
          Room Participants |
          <span className="cursor-color-change" onClick={this.toggleList}>
            {this.state.isOpen ? " Hide" : " Show"}
          </span>
        </p>
        {this.state.isOpen ? roomParticipants : null }
      </div>
    );
  }
}

export default RoomParticipants;
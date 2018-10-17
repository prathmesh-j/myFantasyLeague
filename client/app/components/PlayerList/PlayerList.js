import React from "react";
import { connect } from "react-redux";
import { addContact, loadContacts, deleteContact } from "../../../../server/actions";
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import  Player  from '../Player/Player'

class PlayerList extends React.Component {
  static defaultProps = {
    contacts: []
  };

  componentDidMount() {
    loadContacts(this.props.teamId, this.props.dispatch);
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.teamId !== nextProps.teamId) {
      loadContacts(nextProps.teamId, nextProps.dispatch);
    }
  }

  createContact(contact) {
    this.props.dispatch(addContact(contact));
  }

  deleteContact(contact) {
    deleteContact(contact.id, this.props.dispatch);
  }

  addPlayer(player) {
    fetch('/api/players', { method: 'POST' , headers: {'Content-Type': 'application/json'}, body: JSON.stringify(player)})
      .then(res => res.json())
      .then(json => {
        console.log('Success'. json);
      });
  }

  render() {
    const {
      contacts,
      contactsWithErrors,
      contactsBeingDeleted
    } = this.props;

    return (
      <div className='photo-grid'>
        {contacts.map(contact => (
          <Player contact={contact} 
                  contactsWithErrors={contactsWithErrors}
                  contactsBeingDeleted={contactsWithErrors}
          >
          </Player>
        ))}
      </div>
    );
  }
}

PlayerList.defaultProps = {
   teamId: PropTypes.number
}

export default connect(state => state)(PlayerList);

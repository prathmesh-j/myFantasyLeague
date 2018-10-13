import React from "react";
import { connect } from "react-redux";
import { addContact, loadContacts, deleteContact } from "../../../../server/actions";
import PropTypes from 'prop-types';
import 'whatwg-fetch';

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
      <div className="wrapper">
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {contacts.map(contact => (
          <li
            key={contact.id}
            style={{
              background: contactsWithErrors[contact.id] ? "red" : "",
              opacity: contactsBeingDeleted[contact.id] ? "0.25" : ""
            }}
          >
            <img
              src={"https://iplstatic.s3.amazonaws.com/players/210/" + contact.id + ".png"}
              height={contactsWithErrors[contact.id] ? "400" : "150"}
            />{" "}
            {contact.fullName}{" "}
            {contactsWithErrors[contact.id] ? (
              <p>{contactsWithErrors[contact.id]}</p>
            ) : (
              <button onClick={() => this.addPlayer(contact)}>
                Select
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
    );
  }
}

PlayerList.defaultProps = {
   teamId: PropTypes.number
}

export default connect(state => state)(PlayerList);

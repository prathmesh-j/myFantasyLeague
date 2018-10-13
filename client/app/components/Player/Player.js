import React from "react";
import { connect } from "react-redux";
import { addContact, loadContacts, deleteContact } from "../actions";
import CreateContactForm from "./CreateContactForm";
import PropTypes from 'prop-types';


class Player extends React.Component {
  render() {
    console.log(this.props);

     return (
      <img
        src={"https://iplstatic.s3.amazonaws.com/players/210/" + this.props.contact.id + ".png"}
        height={contactsWithErrors[this.props.contact.id] ? "300" : "150"}
      />
    );
  }
}

Player.defaultProps = {
contact : React.PropTypes.object
}

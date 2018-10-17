import React from "react";
import { connect } from "react-redux";
import { addContact, loadContacts, deleteContact } from "../../../../server/actions";
import PropTypes from 'prop-types';


class Player extends React.Component {
  render() {
    console.log(this.props);
     return (
      <div class='photo-grid-item' style={{backgroundColor:'aliceblue',
      borderRadius:'20px', borderStyle:'outset'}}>
        <div class="row">
          <div class="column">
            <img
              src={"https://iplstatic.s3.amazonaws.com/players/210/" + this.props.contact.id + ".png"}
              height={this.props.contactsWithErrors[this.props.contact.id] ? "300" : "150"}
            />
          </div>
          <div class="column">
            {this.props.contact.fullName}
            {this.props.contact.shortName}<br/>
            {this.props.contact.nationality}<br/>
            {this.props.contact.dateOfBirth}<br/>
            <button >
              {/* onClick={() => this.addPlayer(contact)}> */}
                Select
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Player.defaultProps = {
  contact : PropTypes.object,
  contactsWithErrors : PropTypes.func,
  contactsBeingDeleted : PropTypes.func
}

export default Player;

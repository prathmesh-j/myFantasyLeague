import { deleteJSON, getAddressFromCoords } from "./xhr";

// const serverURL = "http://addressbook-api.herokuapp.com";

const teamUrl = "https://cricketapi.platform.iplt20.com/tournaments/7749/squads/";
const teamUrl1 = "?matchTypes=ALL"

export function fetchContacts(teamId, cb) {
  console.log('teamId :', teamId);
  getAddressFromCoords(`${teamUrl}/${teamId}/${teamUrl1}`).then((address, error) => {
    cb(error, address.ALL.players);
  });
}

export function deleteContactById(contactId, cb) {
  deleteJSON(`${teamUrl}/contacts/${contactId}`, cb);
}
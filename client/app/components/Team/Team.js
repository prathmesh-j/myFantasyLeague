import React, { Component } from 'react';
import PlayerList from "../PlayerList/PlayerList";

class Team extends Component {
  constructor(props) {
    super(props);
  }
    state = {
        selectedId : 0
    };

    selectTeam = (event) => {
        this.setState({selectedId: event.target.value});

        if(event.target.value === 0){
            this.setState({selectedId: 0});
        }
}

  render() {
    this.countryData = [
        { name: 'Select a team', id: 0 },
        { name: 'Chennai', id: 1 },
        { name: 'Mumbai', id: 6 },
        { name: 'Delhi', id: 3 },
        { name: 'Kings XI', id: 4 },
        { name: 'KKR', id: 5 },
        { name: 'Rajasthan', id: 8 },
        { name: 'RCB', id: 9 },
        { name: 'SRH', id: 62 }
      ];

    let optionItems = this.countryData.map((team) =>
      <option key={team.id} value={team.id}>{team.name}</option>
    );
    return (
        <div>
            <h1>My Fantasy Game!</h1>
            <select
                name="country"
                value={this.props.teamId}
                onChange={this.selectTeam}
            >
            { optionItems }
            </select>
            { this.state.selectedId !== 0 ? <PlayerList teamId={this.state.selectedId}/> : <div/> }
        </div>
    );
  }
}

export default Team;

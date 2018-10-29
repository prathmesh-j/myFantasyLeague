import React from 'react';
import Team from '../Team/Team';
import PropTypes from 'prop-types';

class League extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            isNew: false,
            isLoaded: false,
            isExisting: false,
            showTeam: false
        };
      
        this.findLeague = this.findLeague.bind(this);      
        this.handleChange = this.handleChange.bind(this);
        this.createLeague = this.createLeague.bind(this);
        this.handleCreateNewLeague = this.handleCreateNewLeague.bind(this);
        this.handleJoinLeague = this.handleJoinLeague.bind(this);
    }

    handleChange(e) {
        this.setState({input: e.target.value});
    }

    handleCreateNewLeague() {
        this.setState({
            isNew: true,

        });
    }

    handleJoinLeague() {
        this.setState({
            isExisting: true,

        })
    }

    findLeague() {
        fetch('api/league/search?name=' + this.state.input)
        .then(res => res.json())
        .then(json => {
            if(json.success) {
            this.setState({
                isLoaded: true,
            });
            } else {
                this.setState({
                    isLoaded: false
                });
            }
        })
    }

    createLeague() {
        fetch('api/league/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.state.input,
              createdBy: this.props.currentUserId,
              createdOn: new Date()
            }),
        }).then(res => res.json())
          .then(json => {
            if(json.success) {
              this.setState({
                isLoaded: true,
              });
            } else {
              this.setState({
                isLoaded: false
              });
            }
        });
    }

    render() {

        if(!this.state.isNew && !this.state.isExisting) {
            return(
                <div>
                    <input className='new-league'
                           type='button'
                           value='Create New League'
                           onClick={this.handleCreateNewLeague}
                    />
                    <input className='join-league'
                           type='button'
                           value='Join League'
                           onClick={this.handleJoinLeague}
                    />
                </div>
            )
        }

        if(this.state.isNew && !this.state.isLoaded) {
            // Create a new league
            return (
                <div>
                    <span>This is a new League</span>
                    <div>
                        <input className='league-name'
                               type='text'
                               placeholder='Name your league'
                               onChange={this.handleChange}/>
                        <input type="button" 
                               value="Create" 
                               onClick={this.createLeague}/>
                    </div>
                </div>
            );
        } else if(this.state.isExisting && !this.state.isLoaded) {
            // Join an existing League
            return (
                <div>
                    <input placeholder='League...' 
                           className='search-league' 
                           type="text"
                           onChange={this.handleChange}/>
                    <input type="button" 
                           value="Search" 
                           onClick={this.findLeague}/>
                </div>
            );
        }

        return (<Team />);
    }
}

League.defaultProps = {
    currentUserId : PropTypes.string,
  }

export default League;
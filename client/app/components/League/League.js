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
        };
      
        this.findLeague = this.findLeague.bind(this);      
        this.handleChange = this.handleChange.bind(this);
        this.createLeague = this.createLeague.bind(this);
    }

    handleChange(e) {
        this.setState({input: e.target.value});
    }  

    findLeague() {
        fetch('api/league/search?id=' + this.state.input)
        .then(res => res.json())
        .then(json => {
            if(json.success) {
            this.setState({
                isLoaded: true,
                isNew: true,
                input: ''
            });
            } else {
                this.setState({
                    isLoaded: false,
                    isNew: false,
                    input:''
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
                isNew: true,
                isLoaded: true,
                input: ''
              });
            } else {
              this.setState({
                isNew: false,
                isLoaded: false
              });
            }
        });
    }

    render() {
        if(this.state.isLoaded){
            return (<Team />);
        } else {
            if(!this.state.isNew) {
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
            } else {
                // Join an existing League
                return (
                    <div>
                        <input placeholder='League...' 
                               className='js-search' 
                               type="text"
                               onChange={this.handleChange}/>
                        <input type="button" 
                               value="Search" 
                               onClick={this.findLeague}/>
                    </div>
                );
            }
        }
    }

}

League.defaultProps = {
    currentUserId : PropTypes.string,
  }

export default League;
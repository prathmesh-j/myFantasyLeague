import React from 'react';
import Team from '../Team/Team';


class League extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            isNew: false,
            isLoaded: false
        };
      
        this.findLeague = this.findLeague.bind(this);      
        this.handleChange = this.handleChange.bind(this);
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
                    isNew: false
                });
            }
        })
    }

    render() {
        if(this.state.isLoaded){
            return (<Team />);
        } else {
            if(this.state.isNew) {
                // Create a new league
                return (
                    <div>
                        This is a new League
                    </div>
                );
            } else {
                // Join an existing League
                return (
                    <div>
                        <input placeholder='League...' 
                               class='js-search' 
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

export default League;
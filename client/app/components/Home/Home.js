import React, { Component } from 'react';
import Team from '../Team/Team';
import League from '../League/League';
import 'whatwg-fetch';
import  {
  getFromStorage,
  setInStorage,
} from '../utils/storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token:'',
      signUperror: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: '',
      currentUserId: ''
    };

    this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(this);
    this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this);
    this.onTextBoxChangeSignUpEmail = this.onTextBoxChangeSignUpEmail.bind(this);
    this.onTextBoxChangeSignUpFirstName = this.onTextBoxChangeSignUpFirstName.bind(this);
    this.onTextBoxChangeSignUpLastName = this.onTextBoxChangeSignUpLastName.bind(this);
    this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this);
    
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token) {
      const { token } = obj;
      // verify  token
      fetch('api/account/verify?token=' + token)
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          this.setState({
            token, 
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      })
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextBoxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextBoxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextBoxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextBoxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }

  onTextBoxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }

  onTextBoxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp() {
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    })

    fetch('api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
    .then(json => {
      if(json.success) {
        this.setState({
          signUperror: json.message, 
          isLoading: false,
          signUpEmail: '',
          signUpFirstName: '',
          signUpLastName: '',
          signUpPassword: '',
        });
      } else {
        this.setState({
          signUperror: json.message, 
          isLoading: false,
        });
      }
    });
  }

  onSignIn() {
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    })

    fetch('api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
    .then(json => {
      if(json.success) {
        setInStorage('the_main_app', { token: json.token })
        this.setState({
          signInError: json.message, 
          isLoading: false,
          signInEmail: '',
          signInPassword: '',
          token: json.token,
          currentUserId: json.currentUserId
        });
      } else {
        this.setState({
          signUperror: json.message, 
          isLoading: false,
        });
      }
    });
  }

  onLogout() {
    this.setState({
      isLoading: true,
    })
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token) {
      console.log(obj.token);

      const { token } = obj;
      // verify  token
      fetch('api/account/logout?token=' + token)
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          this.setState({
            token: '', 
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }


  componentWillMount() {
   
  }

  render() {
    const {
      isLoading,
      token,
      signInEmail,
      signInError,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUperror
    } = this.state;

    if(isLoading) {
      return (<div>Loading...</div>);
    }
    if(!token) {
      return (
        <div class="container">
          <input type="radio" name="tab" id="signin" checked="checked"/>
          <input type="radio" name="tab" id="register"/>
              <div class="pages">
                <div class="page">
                  <div class="input">
                    <div class="title"> USERNAME</div>
                    <input type='email' 
                          className='text'
                                placeholder='Email' 
                                value={signInEmail}
                                onChange={this.onTextBoxChangeSignInEmail}
                    />
                  </div>
                  <div class="input">
                    <div class="title"> PASSWORD</div>
                    <input type='password'
                          className='text' 
                                placeholder='Password' 
                                value={signInPassword}
                                onChange={this.onTextBoxChangeSignInPassword}
                          />
                  </div>
                  <div class="input">
                    {/* <input type="submit" value="ENTER"/> */}
                    <input type='button' className='btn_signin' onClick={this.onSignIn} value='Sign In'/>
                  </div>
                </div>
                <div class="page signup">
                  <div class="input">
                    <div class="title"> NAME</div>
                    <input type='text' 
                          className='text'
                                placeholder='First Name' 
                                value={signUpFirstName}
                                onChange={this.onTextBoxChangeSignUpFirstName}
                    />
                  </div>
                  <div class="input">
                    <div class="title"> EMAIL</div>
                    <input type='email' 
                          className='text'
                                placeholder='Email' 
                                value={signUpEmail}
                                onChange={this.onTextBoxChangeSignUpEmail}
                          />
                  </div>
                  <div class="input">
                    {/* <input type="submit" value="SIGN ME UP!"/> */}
                    <button className='btn_signup' onClick={this.onSignUp}>Sign Up</button>
                  </div>
                </div>
              </div>
              <div class="tabs">
                <label class="tab" for="signin">
                  <div class="text">Sign In</div>
                </label>
                <label class="tab" for="register">
                  <div class="text">Register</div>
                </label>
              </div>
            </div>
      )
    }

    return (
      <div>
        <button onClick={this.onLogout}> Logout</button>
        <p>Account</p>
        {/* <Team /> */}
        < League currentUserId={this.state.currentUserId}/>
      </div>
    );
  }
}

export default Home;

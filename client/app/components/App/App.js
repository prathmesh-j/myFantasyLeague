import React from "react";
import { Provider } from "react-redux";
import store from "../../store";
import Header from '../Header/Header';
import Login from '../Login/Login';
import Team from '../Team/Team';
import Home from '../Home/Home';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="start">
          {/* <Header /> */}
          <Home />
        </div>
      </Provider>
    );
  }
}

export default App;

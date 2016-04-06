import React from 'react';
import ReactDOM from 'react-dom';

import Nav from './components/Nav';
import Body from './components/Body';

const appContainer = document.getElementById('app');

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      body: {},
      active: 'user',
      //default username
      username: 'tochytskyi'
    };

    this.fetchData('user');

  }

  /**
   * Set user name from input in nav block
   * @param  {string} value data from input 
   */
  updateUsername(value) {
    this.state.username = value;
    this.fetchData(this.state.active);
  }

  /**
   * Fetch from GitHub user info and repositories
   * @param  {string} active Indicates active nav
   */
  fetchData(active) {
    //render github api url to user fetch data
    let url = "";
    switch (active) {
      case 'user': 
        url = `https://api.github.com/users/${this.state.username}`; 
        break;  
      case 'repos': 
        url = `https://api.github.com/users/${this.state.username}/repos`;
        break;        
    }

    //show empty data if no username or url is provided
    if (!url || !this.state.username) {
      this.setState({
        body: {},
        active: active
      });
      return;
    }    

    //fetch user data
    let request = $.get(url);
    
    request.success(function (result) {
      this.setState({
        body: result,
        active: active
      });
    }.bind(this));

    request.error(function (jqXHR, textStatus, errorThrown) {
      if (textStatus == 'timeout')
        alert('The server is not responding');

      if (textStatus == 'error')
        alert(`User ${this.state.username} does not exist`);

      this.setState({
        body: {},
        active: active
      });
    }.bind(this));

  }

  render() {
    return (
      <div>
        <Nav data={this} fetchData={this.fetchData.bind(this)} onUsernameChange={this.updateUsername.bind(this)} />
        <Body data={this.state}/>
      </div>
    );
  }

};

// Render the main app block with navigation and content
ReactDOM.render(
  <App/>,
  appContainer
);




import React from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {

	constructor() {
		super();
		this.state = {active : 'user'};
	}

	/**
	 * Set User active nav and start fetching data from GitHub
	 */
	showUser() {
        this.setState({active: 'user'});
		this.props.fetchData('user');
    }

    /**
	 * Set Repositories active nav and start fetching data from GitHub
	 */
    showRepos() {
        this.setState({active: 'repos'});
		this.props.fetchData('repos');
    }

    /**
	 * Set About active nav
	 */
    showAbout() {
        this.setState({active: 'about'});
        this.props.fetchData('about');
    }

    /**
     * Set username in App on input change
     */
    updateUsername() {
    	var input = document.getElementById('username')
    	this.props.onUsernameChange(input.value);
    }

	render() {
		return (
			<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		        <div class="container">
		            <div class="collapse navbar-collapse">
		                <ul class="nav navbar-nav">
		                	<li>
		                        <a onClick={this.showUser.bind(this)} className={(this.state.active == 'user' ? 'active' : '')}>User</a>
		                    </li>
		                    <li>
		                        <a onClick={this.showRepos.bind(this)} className={(this.state.active == 'repos' ? 'active' : '')}>Repositories</a>
		                    </li>
		                    <li>
		                        <a onClick={this.showAbout.bind(this)} className={(this.state.active == 'about' ? 'active' : '')}>About</a>
		                    </li>

							<div class="input-group">						      
								<input type="text" class="form-control" id="username" placeholder="GitHub username (e.g. tochytskyi)" aria-describedby="basic-addon1"/>
								<span class="input-group-btn">
									<button class="btn btn-default" type="button" onClick={this.updateUsername.bind(this)} >Go!</button>
								</span>
						    </div>

		                </ul>

		            </div>
		        </div>
		    </nav>
		);
	}
}
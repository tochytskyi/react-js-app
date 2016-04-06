import React from 'react';
import ReactDOM from 'react-dom';

export default class Body extends React.Component {
	constructor() {
		super();
	}

	/**
	 * Factory function for rendering certain page
	 * @return rendered block
	 */
	renderPage() {		
		switch (this.props.data.active) {
			case 'user': 
				return this.renderUserInfo(this.props.data.body);			
			case 'repos': 
				return this.renderRepos(this.props.data.body);
			case 'about': 
				return this.renderAbout();					
		}
	}

	/**
	 * Show page with all info about user
	 * @param  {object} data fetched data from GitHub
	 */
	renderUserInfo(data) {
		let rows = [];
		for (let item in data) {
			let row = data[item];
			if (row) {
				rows.push(<tr><td><i>{item}</i></td><td>{row}</td></tr>);
			}			
		};

		return (
			<table class="table table-striped">
				<thead>
					<tr>
						<th>User property</th>
						<th>Value</th>
					</tr>
				</thead>
			    <tbody>
					{rows}
			    </tbody>
			</table>
		);		
	}

	/**
	 * Show page with all user repositories
	 * @param  {object} data fetched data from GitHub
	 */
	renderRepos(data) {
		let rows = [];
		for (let item in data) {
			let row = data[item];
			if (row) {
				rows.push(<tr><td>{row['full_name']}</td><td>{row['description']}</td></tr>);
			}			
		};

		return (
			<table class="table table-striped">
				<thead>
					<tr>
						<th>Repository name</th>
						<th>Description</th>
					</tr>
				</thead>
			    <tbody>
					{rows}
			    </tbody>
			</table>
		);			
	}

	/**
	 * Show static page with general app info
	 */
	renderAbout() {
		return (
			<div>
				<p>This simple web-app developed for test purpose. It allows to fetch some user data from <b>GitHub</b> account: all profile info and repository list</p>
				<p>Used technologies:  
					<b>React.js</b>, 
					<b>Bable.js</b>, 
					<b>Webpack</b>
				</p>
				<br/>
				<p><i>Developed by Volodymyr Tochytskyi, 2016</i></p>
			</div>
		);		
	}

	render() {
		return (
		    <div class="container">
		        <div class="row">
		            <div class="col-lg-12">
			            {this.renderPage()}
		            </div>
		        </div>
		    </div>
		);
	}
}
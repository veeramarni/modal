import Container from 'react-container';
import React from 'react';
import Tappable from 'react-tappable';
import Timers from 'react-timers';
import { Link, UI } from 'touchstonejs';

module.exports = React.createClass({
	mixins: [Timers],
	statics: {
		navigationBar: 'main',
		getNavigation () {
			return {
				title: 'Controls'
			}
		}
	},
	getInitialState () {
		return {
		}
	},
	render () {
		return (
			<Container scrollable>
				<div style={{display: 'flex', justifyContent: 'center', textAlign: 'center', backgroundColor: 'grey', marginBottom: '5vh', padding: '1vh'}}>
					<div style={{flexGrow: 1}}>
						<span className="Tabs-Icon Tabs-Icon--lists" />
						<h3>Balance</h3>
					</div>
					<div  style={{flexGrow: 1}}>
						<span className="Tabs-Icon Tabs-Icon--lists" />
						<h3>Bank Cards</h3>
					</div>
				</div>
				<div style={{display: 'flex', justifyContent: 'center', textAlign: 'center', padding: '1vh'}}>
					<div style={{width: '33%'}}>
						<span className="Tabs-Icon Tabs-Icon--lists" />
						<h3>Simple Pay</h3>
					</div>
					<div style={{width: '33%'}}>
						<span className="Tabs-Icon Tabs-Icon--lists" />
						<h3>Window Shop</h3>
					</div>
					<div style={{width: '33%'}}>
						<span className="Tabs-Icon Tabs-Icon--lists" />
						<h3>Simple Pay</h3>
					</div>
				</div>
			</Container>
		);
	}
});

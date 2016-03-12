import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';
import SlideOut from 'slideout';
import {
	Container,
	createApp,
	UI,
	View,
	ViewManager
} from 'touchstonejs';

// App Config
// ------------------------------

const PeopleStore = require('./stores/people')
const peopleStore = new PeopleStore()

var App = React.createClass({
	mixins: [createApp()],

	childContextTypes: {
		peopleStore: React.PropTypes.object
	},

	getChildContext () {
		return {
			peopleStore: peopleStore
		};
	},
	componentDidMount () {
		// Hide the splash screen when the app is mounted
		if (navigator.splashscreen) {
			navigator.splashscreen.hide();
		}
	},
	render () {
		let appWrapperClassName = 'app-wrapper device--' + (window.device || {}).platform

		return (
			<div className={appWrapperClassName}>
				<div className="device-silhouette">
					<ViewManager name="app" defaultView="main">
						<View name="main" component={MainViewController} />
						<View name="transitions-target-over" component={require('./views/transitions-target-over')} />
					</ViewManager>
				</div>
			</div>
		);
	}
});

// Main Controller
// ------------------------------

var MainViewController = React.createClass({
	componentDidMount() {
		this.slideout = new SlideOut({
			'panel': this.refs.panel,
			'menu': this.refs.menu,
			'padding': 256,
			'tolerance': 70
		});
	},
	slideToggle: function(e) {
		this.slideout.toggle();
		return;
	},
	render () {
		return (
			<Container>
				<div ref="menu">
					<UI.Item>
						<UI.ItemInner>
							<UI.ItemTitle>SriKanth</UI.ItemTitle>
						</UI.ItemInner>
					</UI.Item>
					<UI.Item>
						<UI.ItemInner>
							<UI.ItemTitle>Nikhil</UI.ItemTitle>
						</UI.ItemInner>
					</UI.Item>

				</div>
				<div ref="panel">
					<UI.Tabs.Navigator>
						<UI.Tabs.Tab onTap={this.slideToggle}>
							<span className="Tabs-Icon Tabs-Icon--lists" />
						</UI.Tabs.Tab>
					</UI.Tabs.Navigator>
					<ViewManager name="main" defaultView="tabs">
						<View name="tabs" component={TabViewController} />
					</ViewManager>
				</div>
			</Container>
		);
	}
});

// Tab Controller
// ------------------------------

var lastSelectedTab = 'lists'
var TabViewController = React.createClass({
	getInitialState () {
		return {
			selectedTab: lastSelectedTab
		};
	},

	onViewChange (nextView) {
		lastSelectedTab = nextView

		this.setState({
			selectedTab: nextView
		});
	},

	selectTab (value) {
		let viewProps;

		this.refs.vm.transitionTo(value, {
			transition: 'instant',
			viewProps: viewProps
		});

		this.setState({
			selectedTab: value
		})
	},

	render () {
		let selectedTab = this.state.selectedTab
		let selectedTabSpan = selectedTab

		if (selectedTab === 'lists' || selectedTab === 'list-simple' || selectedTab === 'list-complex' || selectedTab === 'list-details') {
			selectedTabSpan = 'lists';
		}

		if (selectedTab === 'transitions' || selectedTab === 'transitions-target') {
			selectedTabSpan = 'transitions';
		}

		return (
			<Container>
				<ViewManager ref="vm" name="tabs" defaultView={selectedTab} onViewChange={this.onViewChange}>
					<View name="lists" component={require('./views/lists')} />
					<View name="list-simple" component={require('./views/list-simple')} />
					<View name="list-complex" component={require('./views/list-complex')} />
					<View name="list-details" component={require('./views/list-details')} />
					<View name="form" component={require('./views/form')} />
					<View name="controls" component={require('./views/controls')} />
					<View name="transitions" component={require('./views/transitions')} />
					<View name="transitions-target" component={require('./views/transitions-target')} />
				</ViewManager>
				<UI.Tabs.Navigator>
					<UI.Tabs.Tab onTap={this.selectTab.bind(this, 'lists')} selected={selectedTabSpan === 'lists'}>
						<span className="Tabs-Icon Tabs-Icon--lists" />
						<UI.Tabs.Label>Lists</UI.Tabs.Label>
					</UI.Tabs.Tab>
					<UI.Tabs.Tab onTap={this.selectTab.bind(this, 'form')} selected={selectedTabSpan === 'form'}>
						<span className="Tabs-Icon Tabs-Icon--forms" />
						<UI.Tabs.Label>Forms</UI.Tabs.Label>
					</UI.Tabs.Tab>
					<UI.Tabs.Tab onTap={this.selectTab.bind(this, 'controls')} selected={selectedTabSpan === 'controls'}>
						<span className="Tabs-Icon Tabs-Icon--controls" />
						<UI.Tabs.Label>Controls</UI.Tabs.Label>
					</UI.Tabs.Tab>
					<UI.Tabs.Tab onTap={this.selectTab.bind(this, 'transitions')} selected={selectedTabSpan === 'transitions'}>
						<span className="Tabs-Icon Tabs-Icon--transitions" />
						<UI.Tabs.Label>Transitions</UI.Tabs.Label>
					</UI.Tabs.Tab>
				</UI.Tabs.Navigator>
			</Container>
		);
	}
});

function startApp () {
	if (window.StatusBar) {
		window.StatusBar.styleDefault();
	}
	ReactDOM.render(<App />, document.getElementById('app'));
}

if (!window.cordova) {
	startApp();
} else {
	document.addEventListener('deviceready', startApp, false);
}

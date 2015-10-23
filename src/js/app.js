

import React from 'react/addons';
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

const WebSiteStore = require('./stores/website');
const websiteStore = new WebSiteStore();

const tabs = [
    { name: 'information'   , label: '資訊', icon: 'lists'},
    { name: 'management'    , label: '管理', icon: 'forms'},
    { name: 'settings'      , label: '設定', icon: 'controls'},
];
const views = [
    { name: 'information'       , tab: 'information'        , component: require('./views/information') },
    { name: 'management'        , tab: 'management'         , component: require('./views/management') },
    { name: 'settings'          , tab: 'settings'           , component: require('./views/settings') },
    { name: 'settings-website'  , tab: 'settings'   , component: require('./views/settings-website') },
];
var App = React.createClass({
    mixins: [createApp()],

    childContextTypes: {
        peopleStore: React.PropTypes.object,
        websiteStore: React.PropTypes.object,
    },

    getChildContext () {
        return {
            peopleStore: peopleStore,
            websiteStore: websiteStore,
        };
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
    render () {
        return (
            <Container>
                <UI.NavigationBar name="main" />
                <ViewManager name="main" defaultView="tabs">
                    <View name="tabs" component={TabViewController} />
                </ViewManager>
            </Container>
        );
    }
});


// Tab Controller
// ------------------------------

/* 預設頁面 */


var TabViewController = React.createClass({

    getInitialState () {
        return {
            selectedName: tabs[0].name,
        }
    },

    /* 頁面切換時 */
    onViewChange (name) {

        let tabName;
        views.map(function (view) {
            tabName = (view.name === name) ? view.tab : tabName;
        });

        this.setState({
            selectedName: tabName
        });

    },
    
    handlerSelectTab (name) {

        let viewProps;

        this.refs.vm.transitionTo(name, {
            transition: 'instant',
            viewProps
        });

        this.setState({ 
            selectedName: name 
        });
    },

    render () {
        let { selectedName } = this.state;
        let _this = this;
        return (
            <Container>
                <ViewManager ref="vm" name="tabs" defaultView={selectedName} onViewChange={this.onViewChange}>
                    {views.map((view, i) => (
                        <View name={view.name} component={view.component} />
                    ))}
                    {/*
                        <View name="list-simple" component={require('./views/list-simple')} />
                        <View name="list-complex" component={require('./views/list-complex')} />
                        <View name="list-details" component={require('./views/list-details')} />
                        <View name="form" component={require('./views/form')} />
                        <View name="controls" component={require('./views/controls')} />
                        <View name="transitions" component={require('./views/transitions')} />
                        <View name="transitions-target" component={require('./views/transitions-target')} />
                    */}
                </ViewManager>
                <UI.Tabs.Navigator>
                    {/*}
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
                    */}
                   {tabs.map(function(tab, i) {
                        return (
                            <UI.Tabs.Tab 
                                onTap={_this.handlerSelectTab.bind(_this, tab.name)} 
                                selected={selectedName === tab.name}>
                                <span className={"Tabs-Icon Tabs-Icon--" + tab.icon} />
                                <UI.Tabs.Label>{tab.label}</UI.Tabs.Label>
                            </UI.Tabs.Tab>
                        );
                   })}
                    {/*<UI.Tabs.Tab onTap={this.selectTab.bind(this, 'settings')} selected={selectedTabSpan === 'settings'}>
                        <span className="Tabs-Icon Tabs-Icon--controls" />
                        <UI.Tabs.Label>站台設定</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                    <UI.Tabs.Tab onTap={this.selectTab.bind(this, 'settings')} selected={selectedTabSpan === 'settings'}>
                        <span className="Tabs-Icon Tabs-Icon--controls" />
                        <UI.Tabs.Label>站台設定</UI.Tabs.Label>
                    </UI.Tabs.Tab>*/}
                </UI.Tabs.Navigator>
            </Container>
        );
    }
});

function startApp () {
    if (window.StatusBar) {
        window.StatusBar.styleDefault();
    }

    React.render(<App />, document.getElementById('app'));
}

if (!window.cordova) {
    startApp();
} else {
    document.addEventListener('deviceready', startApp, false);
}

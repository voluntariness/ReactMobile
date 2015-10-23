import Container from 'react-container';
import dialogs from 'cordova-dialogs';
import React from 'react';
import Tappable from 'react-tappable';
import { UI, Mixins } from 'touchstonejs';

const scrollable = Container.initScrollable();
console.log(Mixins);
// html5 input types for testing
// omitted: button, checkbox, radio, image, hidden, reset, submit
const HTML5_INPUT_TYPES = ['color', 'date', 'datetime', 'datetime-local', 'email', 'file', 'month', 'number', 'password', 'range', 'search', 'tel', 'text', 'time', 'url', 'week'];
const WEBSITES = [
    { label: 'DATA-88', value: 'DATA-88' },
    { label: 'DATA-77', value: 'DATA-77' },
    { label: 'DATA-66', value: 'DATA-66' },
    { label: 'DATA-55', value: 'DATA-55' }
];

module.exports = React.createClass({
    mixins: [Mixins.Transitions],
    propTypes: {
        website: React.PropTypes.object,
    },
    statics: {
        navigationBar: 'main',
        getNavigation (props, app) {
            return {
                leftArrow: true,
                leftLabel: '設定',
                leftAction: () => { app.transitionTo('tabs:settings', {transition: 'reveal-from-right'}) },
                title: '新增'
            }
        }
    },
    
    getInitialState () {
        return {
            websiteSelected: 'chocolate',
            memberAccount: '',
            memberPassword: '',
            switchValue: true
        }
    },
    
    handleWebsiteSelectChange (key, event) {

        this.setState({key: event.target.value});

    },

    handleChangeState (key, event) {

        this.setState({key: event.target.value});

    },

    handleSave () {
        alert('saved');
        this.transitionTo(
            'tabs:settings', {
                transition: 'reveal-from-right'
            }
        );
    },

    
    handleSwitch (key, event) {
        let newState = {};
        newState[key] = !this.state[key];

        this.setState(newState);
    },
    
    // used for testing
    renderInputTypes () {
        return HTML5_INPUT_TYPES.map(type => {
            return <UI.LabelInput key={type} type={type} label={type} placeholder={type} />;
        });
    },

    showDatePicker () {
        this.setState({datePicker: true});
    },

    handleDatePickerChange (d) {
        this.setState({datePicker: false, date: d});
    },

    formatDate (date) {
        if (date) {
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
    },
    
    render () {

        return (
            <Container fill>
                <Container scrollable={scrollable}>
                    {/*<UI.Group>
                        <UI.GroupHeader>Input Type Experiment</UI.GroupHeader>
                        <UI.GroupBody>
                            {this.renderInputTypes()}
                        </UI.GroupBody>
                    </UI.Group>*/}
                    <UI.Group>
                        <UI.GroupHeader>站台設定</UI.GroupHeader>
                        <UI.GroupBody>
                            <UI.LabelSelect
                                label="選擇資料"
                                value={this.state.websiteSelected}
                                onChange={this.handleChangeState.bind(this, 'websiteSelected')}
                                options={WEBSITES} />
                            <UI.LabelInput type="text" 
                                label="會員帳號" 
                                onChange={this.handleChangeState.bind(this, 'memberAccount')}
                                placeholder="Account"/>
                            <UI.LabelInput type="password" 
                                label="會員密碼" 
                                onChange={this.handleChangeState.bind(this, 'memberPassword')}
                                placeholder="Password"/>
                        </UI.GroupBody>
                    </UI.Group>
                    <UI.Button type="primary" onTap={this.handleSave.bind(this)}>
                        儲存設定
                    </UI.Button>
                </Container>
                <UI.DatePickerPopup visible={this.state.datePicker} date={this.state.date} onChange={this.handleDatePickerChange}/>
            </Container>
        );
    }
});

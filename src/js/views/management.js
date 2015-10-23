import Container from 'react-container';
import React from 'react';
import { Link, UI } from 'touchstonejs';


module.exports = React.createClass({
    statics: {
        navigationBar: 'main',
        getNavigation (props, app) {
            return {
                title: '站台管理'
            }
        }
    },
    render () {
        return (
            <div> 本頁為管理頁面 </div>
        )
    }
});
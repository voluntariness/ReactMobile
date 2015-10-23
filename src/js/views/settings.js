import Container from 'react-container';
import React from 'react';
import { Link, UI } from 'touchstonejs';


var SimpleLinktItem = React.createClass({
    propTypes: {
        website: React.PropTypes.object.isRequired
    },
    render () {
        return (
            <Link to="tabs:settings-website" 
                transition="show-from-right" 
                viewProps={{ website: this.props.website}} >
                <UI.Item showDisclosureArrow>
                    <UI.ItemInner>
                        <UI.ItemTitle>{this.props.website.name}</UI.ItemTitle>
                    </UI.ItemInner>
                </UI.Item>
            </Link>
        );
    }
});

var EmptyItem = React.createClass({
    render () {
        return (
            <UI.Item >
                <UI.ItemInner>
                    <UI.ItemTitle>未設定任何資料</UI.ItemTitle>
                </UI.ItemInner>
            </UI.Item>
        );
    }
});

module.exports = React.createClass({
    contextTypes: { websiteStore: React.PropTypes.object.isRequired },
    statics: {
        navigationBar: 'main',
        getNavigation () {
            return {
                title: '設定'
            }
        }
    },
    getInitialState () {
        return {
            searchString: '',
            websites: this.context.websiteStore.getWebsite(),
        }
    },

    render: function () {
        let websites = this.state.websites;
        let list = [];
        if (websites.length) {
            list = websites.map((website, i) => {
                return <SimpleLinktItem viewProps={{website}} />
            });
        } else {
            list = [ <EmptyItem /> ]
        }
        return (
            <Container scrollable>
                <UI.Group>
                    <UI.GroupHeader>站台名稱</UI.GroupHeader>
                    <UI.GroupBody>
                        {list}
                    </UI.GroupBody>
                </UI.Group>
                <UI.Group>
                    <UI.GroupHeader>選項</UI.GroupHeader>
                    <UI.GroupBody>
                        <Link to="tabs:settings-website" 
                            transition="show-from-right">
                            <UI.Item showDisclosureArrow>
                                <UI.ItemInner>
                                    新增設定
                                </UI.ItemInner>
                            </UI.Item>
                        </Link>
                    </UI.GroupBody>
                </UI.Group>
            </Container>
        );
    }
});

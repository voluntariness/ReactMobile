import Container from 'react-container';
import React from 'react';
import { Link, UI } from 'touchstonejs';


module.exports = React.createClass({
    statics: {
        navigationBar: 'main',
        getNavigation (props, app) {
            return {
                title: '資訊'
            }
        }
    },
    render () {
        return (
            <Container scrollable>
                <UI.Group>
                    <UI.GroupHeader>最新消息</UI.GroupHeader>
                    <UI.GroupBody>
                        <UI.Item>
                            <UI.ItemInner>
                                (跑馬燈) 123 Hello ~~
                            </UI.ItemInner>
                        </UI.Item>
                    </UI.GroupBody>
                </UI.Group>
                <UI.Group>
                    <UI.GroupHeader>直播</UI.GroupHeader>
                    <UI.GroupBody>
                        <UI.Item>
                            <UI.ItemInner>
                                ~~ 影片空間 ~~
                            </UI.ItemInner>
                        </UI.Item>
                    </UI.GroupBody>
                </UI.Group>
                <UI.Group>
                    <UI.GroupHeader>熱門討論</UI.GroupHeader>
                    <UI.GroupBody>
                        <UI.Item>
                            <UI.ItemInner>
                                ABCD
                            </UI.ItemInner>
                        </UI.Item>
                        <UI.Item>
                            <UI.ItemInner>
                                DEFG
                            </UI.ItemInner>
                        </UI.Item>
                        <UI.Item>
                            <UI.ItemInner>
                                HUIJK
                            </UI.ItemInner>
                        </UI.Item>
                    </UI.GroupBody>
                </UI.Group>
            </Container>
        )
    }
});
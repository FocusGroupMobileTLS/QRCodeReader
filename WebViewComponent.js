import React from 'react';
import { Button, View, WebView } from 'react-native';

export default class WebViewComponent extends React.Component {
    render() {
        return (
                <WebView
                    source={{ uri: this.props.link}}
                    style={{ marginTop: 25 }}
                />
        );
    }
}
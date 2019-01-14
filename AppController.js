import React from 'react';
import QReader from './QReader';
import WebViewComponent from './WebViewComponent';

export default class AppController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            webViewDisplay: false,
            webViewLink: null
        };
    }

    toggleWebView = (state, link) => {
        this.setState({webViewDisplay: !this.state.webViewDisplay, webViewLink: link});
    }

    render() {
        return (this.state.webViewDisplay ? 
            <WebViewComponent {...this.props} link={this.state.webViewLink} toggleWebView={this.toggleWebView}/> :
            <QReader {...this.props} toggleWebView={this.toggleWebView}/>
        );
    }
}
import React from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class QReader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasCameraPersmission: null,
            lastScannerdUrl: null,}
    }

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPersmission: status === 'granted',
        });
    };

    _handleBarCodeRead = result => {
        if (result.data !== this.state.lastScannerdUrl) {
            LayoutAnimation.spring();
            this.setState({ lastScannerdUrl: result.data });
        }
    };

    render() {
        return (
            <View style={this.props.styles.container}>
            { this.state.hasCameraPersmission === null ?
                <Text>Requesting for camera permission</Text> :
                this.state.hasCameraPersmission === false ?
                    <Text style={{ color: '#fff' }}>Camera permission is not granted</Text> :
                    <BarCodeScanner onBarCodeRead={this._handleBarCodeRead}
                    style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width,}}
            

            />}

            {this._maybeRenderUrl()}

            <StatusBar hidden />
            </View>
        );
    }

    _handlePressUrl = () => {
        Alert.alert(
            'Open this URL?',
            this.state.lastScannerdUrl,
            [
            {
                text: 'Yes',
                onPress: () => this.props.toggleWebView(true, this.state.lastScannerdUrl)
            },
            {
                text: 'No',
                onPress: () => {}
            },
            ],
            {cancellable: false}
        );
    };

    _handlePressCancel = () => {
        this.setState({ lastScannerdUrl: null });
    };

    _maybeRenderUrl = () => {
        if (!this.state.lastScannerdUrl) {
            return;
        }
        return (
            <View style={this.props.styles.bottomBar}>
                <TouchableOpacity style={this.props.styles.url} onPress={this._handlePressUrl}>
                <Text numberOfLines={1} style={this.props.styles.urlText}>
                    {this.state.lastScannerdUrl}
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={this.props.styles.cancelButton}
                onPress={this._handlePressCancel}>
                <Text style={this.props.styles.cancelButtonText}>
                    Cancel
                </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
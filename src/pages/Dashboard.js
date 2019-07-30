import React, { Component } from 'react';

import { StyleSheet, Text, View, DeviceEventEmitter } from 'react-native';

import { RNSerialport, definitions, actions } from 'react-native-serialport';

export default class Dashboard extends Component {
	static navigationOptions = {
		title: 'Dashboard'
	};

	state = {
		serviceStarted: false,
		connected: false,
		usbAttached: false,
		data: ''
	};

	onUsbAttached() {
		this.setState({ usbAttached: true });
	}

	onUsbDetached() {
		this.setState({ usbAttached: false });
	}

	onServiceStarted(response) {
		this.setState({ serviceStarted: true });
		if (response.deviceAttached) {
			this.onUsbAttached();
		}
	}
	onServiceStopped() {
		this.setState({ serviceStarted: false });
	}

	onConnectedDevice() {
		this.setState({ connected: true });
		alert('Device Connected');
	}
	onDisconnectedDevice() {
		this.setState({ connected: false });
		alert('Device Disconnected');
	}

	onError(error) {
		alert('Code: ' + error.errorCode + ' Message: ' + error.errorMessage);
	}

	parsedToJSON = data => {
		const dataSet = [
			'button',
			'accelerometer',
			'altimeter',
			'barometer',
			'temperature',
			'rpm',
			'voltage',
			'current'
		];

		return Object.assign(
			{},
			...dataSet.map((n, index) => ({ [n]: data[index] }))
		);
	};

	onReadData(data) {
		const payload = RNSerialport.hexToUtf16(data.payload);

		var parsed = payload
			.match('<([^>]+)>')
			.split(',')
			.map(Number);

		this.setState({ output: this.parsedToJSON(parsed) });
	}

	componentDidMount() {
		DeviceEventEmitter.addListener(
			actions.ON_SERVICE_STARTED,
			this.onServiceStarted,
			this
		);
		DeviceEventEmitter.addListener(
			actions.ON_SERVICE_STOPPED,
			this.onServiceStopped,
			this
		);
		DeviceEventEmitter.addListener(
			actions.ON_DEVICE_ATTACHED,
			this.onUsbAttached,
			this
		);
		DeviceEventEmitter.addListener(
			actions.ON_DEVICE_DETACHED,
			this.onUsbDetached,
			this
		);
		DeviceEventEmitter.addListener(actions.ON_ERROR, this.onError, this);
		DeviceEventEmitter.addListener(
			actions.ON_CONNECTED,
			this.onConnectedDevice,
			this
		);
		DeviceEventEmitter.addListener(
			actions.ON_DISCONNECTED,
			this.onDisconnectedDevice,
			this
		);
		DeviceEventEmitter.addListener(
			actions.ON_READ_DATA,
			this.onReadData,
			this
		);
		RNSerialport.setReturnedDataType(
			definitions.RETURNED_DATA_TYPES.HEXSTRING
		);
		RNSerialport.setAutoConnectBaudRate(9600);
		RNSerialport.setInterface(-1);
		RNSerialport.setAutoConnect(true);
		RNSerialport.startUsbService();
	}

	componentWillUnmount() {
		this.stopUsbListener();
	}

	stopUsbListener = async () => {
		DeviceEventEmitter.removeAllListeners();
		const isOpen = await RNSerialport.isOpen();
		if (isOpen) {
			RNSerialport.disconnect();
		}
		RNSerialport.stopUsbService();
	};

	render() {
		console.disableYellowBox = true;
		return (
			<View style={styles.container}>
				<Text style={styles.paragraph}>
					Connection:{' '}
					{this.state.connected ? 'Connected' : 'Not Connected'}
				</Text>

				<Text style={styles.paragraph}>
					{this.state.output === ''
						? 'No Content'
						: this.state.output}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#ecf0f1',
		padding: 8
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center'
	}
});

import React, { Component } from 'react';
import api from '../services/api';

import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	DeviceEventEmitter
} from 'react-native';

import { RNSerialport, definitions, actions } from 'react-native-serialport';

export default class Dashboard extends Component {
	static navigationOptions = {
		title: 'Dashboard'
	};

	state = {
		serviceStarted: false,
		connected: false,
		usbAttached: false,
		data: {},
		config: this.props.navigation.getParam('config', 'Null')
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
		// alert('Device Connected');
	}
	onDisconnectedDevice() {
		this.setState({ connected: false });
		// alert('Device Disconnected');
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

	async onReadData(data) {
		const payload = RNSerialport.hexToUtf16(data.payload);
		var re = new RegExp('<([^>]+)>');
		var parsed = '';

		if (re.test(payload)) {
			var parsed = payload
				.match(re)[1]
				.split(',')
				.map(Number);

			this.setState({ data: this.parsedToJSON(parsed) });

			await api.post(
				`/data/${this.state.config.dataset}`,
				this.state.data
			);
		}
	}

	componentDidMount() {
		StatusBar.setHidden(true);
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

		console.log();
		return (
			<View style={styles.container}>
				<Text style={styles.text}>
					{this.state.data.accelerometer === undefined
						? '0'
						: this.state.data.accelerometer}{' '}
					Km/h
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		fontWeight: 'bold',
		fontSize: 20,
		color: '#FFFFFF'
	}
});

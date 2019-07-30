/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
	PermissionsAndroid,
	StyleSheet,
	Text,
	Button,
	ScrollView,
	DeviceEventEmitter,
	TextInput
} from 'react-native';
import RNFS from 'react-native-fs';
import moment from 'moment';
import { RNSerialport, actions, definitions } from 'react-native-serialport';
export default class App extends Component {
	state = {
		payload: '',
		position: null,
		showText: false,
		gpsOk: false
	};
	async requestLocationPermission() {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'Cool App location Permission',
					message:
						'This cool App needs access to your location ' +
						'so you can get your current location.',
					buttonNeutral: 'Ask Me Later',
					buttonNegative: 'Cancel',
					buttonPositive: 'OK'
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('You can use the location');
			} else {
				console.log('Location permission denied');
			}
		} catch (err) {
			console.warn(err);
		}
	}

	onUsbAttached() {
		alert('Usb Conectado');
	}
	onUsbDetached() {
		alert('Usb Detached');
	}
	onUsbNotSupperted() {
		alert('Usb not supported');
	}
	onError(error) {
		alert('Code: ' + error.errorCode + ' Message: ' + error.errorMessage);
	}
	onConnectedDevice() {
		alert('Connected');
	}
	onDisconnectedDevice() {
		alert('Disconnected');
	}
	onServiceStarted() {
		alert('Service started');
	}
	onServiceStopped() {
		alert('Service stopped');
	}
	onReadData(data) {
		let hex = data.payload;
		let str = '';
		let radix = 16;
		for (var i = 0; i < hex.length && hex.substr(i, 2) !== '00'; i += 2) {
			str += String.fromCharCode(parseInt(hex.substr(i, 2), radix));
		}
		if (this.state.gpsOk) {
			const newPayload = ` ${
				this.state.payload
			} Moment: ${moment.now()} # ${JSON.stringify(
				this.state.position
			)} # Wifi: ${str}`;
			this.setState({ payload: newPayload });
		}

		//console.log(JSON.stringify(this.state));
	}
	onWriteData(data) {
		const path = RNFS.DocumentDirectoryPath + '/test.txt';
		RNFS.writeFile(path, data, 'utf8')
			.then(success => {
				console.log('FILE WRITTEN!', path);
			})
			.catch(err => {
				console.log(err.message);
			});
	}
	readInternalStorage() {
		RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
			.then(result => {
				alert('GOT RESULT', result);

				// stat the first file
				return Promise.all([RNFS.stat(result[0].path), result[0].path]);
			})
			// .then(statResult => {
			//   if (statResult[0].isFile()) {
			//     // if we have a file, read it
			//     return RNFS.readFile(statResult[1], "utf8");
			//   }

			//   return "no file";
			// })
			// .then(contents => {
			//   // log the file contents
			//   alert(contents);
			// })
			.catch(err => {
				alert(err.message, err.code);
			});
	}
	// teste pra testar o método de gravar
	testeState() {
		const num = 1000;
		for (let index = 0; index < num; index++) {
			const newPayload =
				this.state.payload + moment.now() + ' NOVO DADO\n';
			this.setState({ payload: newPayload });
		}
	}

	saveFile() {
		this.onWriteData(this.state.payload);
		this.readInternalStorage();
	}

	async componentDidMount() {
		await this.requestLocationPermission();
		this.setupGps();
		// this.testeState();
		//Para pegar o arquivo, deve-se ir no
		// Android Studio --> View --> Tool Windows --> Device File Explorer --> data/data/com.ozio/file/texte.txt
		//Escrever no arquivo depois de 10 segundos capturando informação

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
		DeviceEventEmitter.addListener(
			actions.ON_DEVICE_NOT_SUPPORTED,
			this.onUsbNotSupported,
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

		//Added listeners
		RNSerialport.setInterface(-1); //default -1
		// RNSerialport.setReturnedDataType(definitions.RETURNED_DATA_TYPES.INTARRAY); // default INT ARRAY
		RNSerialport.setReturnedDataType(
			definitions.RETURNED_DATA_TYPES.HEXSTRING
		);

		RNSerialport.setAutoConnectBaudRate(115200);
		RNSerialport.setAutoConnect(true);
		RNSerialport.startUsbService();
	}

	componentWillMount() {
		DeviceEventEmitter.removeAllListeners();
	}

	setupGps = () => {
		this.watchID = navigator.geolocation.watchPosition(position => {
			alert('GPS OK, CAPTURANDO...');
			this.setState({
				position: position,
				gpsOk: true
			});
		});
	};

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<Button
					title={'show payload'}
					onPress={() =>
						this.setState({ showText: !this.state.showText })
					}
				/>
				<Button title={'save'} onPress={() => this.saveFile()} />
				{this.state.showText ? (
					<TextInput
						editable={true}
						multiline={true}
						numberOfLines={10}
						value={this.state.payload}
					/>
				) : null}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});

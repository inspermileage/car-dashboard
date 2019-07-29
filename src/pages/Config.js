import React, { Component } from 'react';

import { View, StyleSheet, Text } from 'react-native';

export default class Config extends Component {
	static navigationOptions = {
		title: 'Config'
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.paragraph}>Página Config</Text>
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

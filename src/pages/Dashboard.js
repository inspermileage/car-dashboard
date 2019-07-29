import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';

export default class Dashboard extends Component {
	static navigationOptions = {
		title: 'Dashboard'
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.paragraph}>Página Dashboard</Text>
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

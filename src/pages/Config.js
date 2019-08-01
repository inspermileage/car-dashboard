import React, { Component } from 'react';

import { StatusBar, StyleSheet } from 'react-native';
import {
	Container,
	Header,
	FooterTab,
	Body,
	Right,
	Button,
	Icon,
	Title,
	Footer,
	Content,
	Input,
	H3,
	InputGroup
} from 'native-base';

export default class Config extends Component {
	static navigationOptions = {
		title: 'Configurações'
	};

	state = {
		selected2: undefined
	};

	onValueChange2(value) {
		this.setState({
			selected2: value
		});
	}
	componentDidMount() {
		StatusBar.setHidden(true);
	}
	render() {
		console.disableYellowBox = true;
		return (
			<Container>
				<Header noLeft style={styles.header}>
					<Body>
						<Title>Configurações</Title>
					</Body>
					<Right>
						<Icon
							type="MaterialCommunityIcons"
							name="flash"
							style={{ color: '#ffffff' }}
						/>
					</Right>
				</Header>

				<Content padder>
					<InputGroup>
						<Icon
							type="MaterialCommunityIcons"
							name="speedometer"
							style={{ color: '#3e3e3e' }}
						/>
						<Input placeholder="Velocidade média mínima (km/h)" />
					</InputGroup>

					<InputGroup>
						<Icon
							type="MaterialIcons"
							name="timer"
							style={{ color: '#3e3e3e' }}
						/>
						<Input placeholder="Tempo de competição (minutos)" />
					</InputGroup>
					<InputGroup>
						<Icon
							type="MaterialCommunityIcons"
							name="database"
							style={{ color: '#3e3e3e' }}
						/>
						<Input placeholder="nome_para_dataset" />
					</InputGroup>
					<InputGroup>
						<Icon
							type="MaterialIcons"
							name="phone"
							style={{ color: '#3e3e3e' }}
						/>
						<Input placeholder="11 999217548" />
					</InputGroup>
				</Content>

				<Footer>
					<FooterTab>
						<Button full success>
							<H3 style={{ color: '#ffffff' }}>
								Iniciar telemetria
							</H3>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#ff450d'
	}
});

// https://stackoverflow.com/questions/50098376/pass-data-between-pages-in-react-native

// Velocidade média
// Tempo máximo
// Logo
// Nome do banco de dados
//... Numero de telefone

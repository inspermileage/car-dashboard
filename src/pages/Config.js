import React, { Component, useState } from "react";

import { Alert, StatusBar, StyleSheet } from "react-native";
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
} from "native-base";

export default class Config extends Component {
    static navigationOptions = {
        title: "Settings"
    };

    state = {
        running: false,
        speed: undefined,
        time: undefined,
        dataset: undefined,
        pilot: undefined
    };

    componentDidMount() {
        // Esconde a barra superior do aplicativo
        StatusBar.setHidden(true);
    }

    handleStart = () => {
        // Realiza a sanitização do input dado pelo usuário, impossibilitando a inserção de valores nulos

        if (this.state.speed == undefined || this.state.speed == "") {
            Alert.alert("Information is nedeed", "Circuit minimum speed can not be empty",
                [{ text: "Ok", onPress: () => console.log("Yes Pressed") }], { cancelable: false });
        }
        else if (this.state.time == undefined || this.state.time == "") {
            Alert.alert("Information is nedeed", "Circuit maximum completion time can not be empty",
                [{ text: "Ok", onPress: () => console.log("Yes Pressed") }], { cancelable: false });
        }
        else if (this.state.dataset == undefined || this.state.dataset == "") {
            Alert.alert("Information is nedeed", "Telemetry round name (dataset name) can not be empty",
                [{ text: "Ok", onPress: () => console.log("Yes Pressed") }], { cancelable: false });
        }
        else if (this.state.pilot == undefined || this.state.pilot == "") {
            Alert.alert("Information is nedeed", "Pilot name can not be empty",
                [{ text: "Ok", onPress: () => console.log("Yes Pressed") }], { cancelable: false });
        }
        else {
            this.setState({ running: true })
            // Navega para a página Dashboard, enviando o estado como argumento
            this.props.navigation.navigate("Dashboard", {
                config: {
                    running: this.state.running,
                    speed: this.state.speed,
                    time: this.state.time,
                    dataset: this.state.dataset,
                    pilot: this.state.pilot
                }
            });
        }
    };

    // Quando a telemetria é parada, o estado é resetado
    handleStop = () => {
        this.setState({
            running: false,
            speed: undefined,
            time: undefined,
            dataset: undefined,
            pilot: undefined
        })
    }

    render() {
        console.disableYellowBox = true;
        return (
            <Container>
                <Header noLeft style={styles.header}>
                    <Body>
                        <Title>Settings</Title>
                    </Body>
                    <Right>
                        <Icon
                            type="MaterialCommunityIcons"
                            name="flash"
                            style={{ color: "#ffffff" }}
                        />
                    </Right>
                </Header>

                <Content padder>
                    <InputGroup>
                        <Icon
                            type="MaterialCommunityIcons"
                            name="speedometer"
                            style={{ color: "#3e3e3e" }}
                        />
                        <Input
                            placeholder="Minimum average speed (km/h)"
                            keyboardType="numeric"
                            placeholderTextColor="#999"
                            onChangeText={speed => this.setState({ speed })}
                            value={this.state.speed}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Icon
                            type="MaterialIcons"
                            name="timer"
                            style={{ color: "#3e3e3e" }}
                        />
                        <Input
                            placeholder="Competition time (minutes)"
                            keyboardType="numeric"
                            placeholderTextColor="#999"
                            onChangeText={time => this.setState({ time })}
                            value={this.state.time}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Icon
                            type="MaterialCommunityIcons"
                            name="database"
                            style={{ color: "#3e3e3e" }}
                        />
                        <Input
                            placeholder="Telemetry round name"
                            autoCorrect={false}
                            placeholderTextColor="#999"
                            onChangeText={dataset => this.setState({ dataset })}
                            value={this.state.dataset}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Icon
                            type="MaterialIcons"
                            name="face"
                            style={{ color: "#3e3e3e" }}
                        />
                        <Input
                            placeholder="Pilot name"
                            placeholderTextColor="#999"
                            autoCorrect={false}
                            onChangeText={pilot =>
                                this.setState({ pilot })
                            }
                            value={this.state.pilot}
                        />
                    </InputGroup>
                </Content>

                <Footer>
                    <FooterTab>
                        {/* Dado o estado do aplicativo, é renderizado determinado botão */}
                        {this.state.running == false
                            ? <Button full success onPress={this.handleStart}>
                                <H3 style={{ color: "#ffffff" }}> Start telemetry </H3>
                            </Button>
                            : <Button full danger onPress={this.handleStop}>
                                <H3 style={{ color: "#ffffff" }}> Stop telemetry </H3>
                            </Button>
                        }
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#ff450d"
    }
});

// https://stackoverflow.com/questions/50098376/pass-data-between-pages-in-react-native

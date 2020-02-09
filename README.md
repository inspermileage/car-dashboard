# Car dashboard

Este repositório contém o código do aplicativo dashboard do projeto, que foi desenvolvido utilizando o framework React Native.

## Desenvolvimento

Essas instruções vão fazer com que você tenha uma cópia do projeto rodando em sua máquina local para desevolvimento.

### Pré-Requisitos

Para executar o projeto, você precisa ter instalado em sua máquina: NodeJS, Yarn e React Native. Que podem ser instaladas pelos métodos a seguir:

#### NodeJS (v12.x.x)

- Ubuntu

  ```bash
  $ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
  $ sudo apt-get install -y nodejs
  ```

- Windows
  ```
  https://nodejs.org/dist/v12.13.1/node-v12.13.1-x86.msi
  ```

#### Yarn (v1.16.0)

- Ubuntu

  ```bash
  $ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  $ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  $ sudo apt-get update && sudo apt-get install yarn
  ```

- Windows
  ```
  https://yarnpkg.com/latest.msi
  ```

#### React Native CLI

- Para instalar o ambiente de desenvolvimento React Native, siga as instruções apresentadas [aqui](https://docs.rocketseat.dev/ambiente-react-native/introducao).

### Instalação e execução

- Na pasta do projeto, execute o comando `$ yarn install`, ele instalará todas as dependências do projeto descritas no `package.json`.
- Conecte um dispositivo celular na porta USB, ative o modo de Debug. Cheque se o sistema o identificou, com o comando `$ adb devices`.
- Com o comando `$ react-native run-android` ou `$ react-native run-ios` inicie o simulador do aplicativo dentro do seu dispositivo.
- Em outro terminal (a pasta do projeto), execute o comando `yarn start`. Isso iniciará o Metro Bundler, que compila o aplicativo toda hora que é salvo.
- Com isso, o aplicativo será aberto no seu dispositivo.
- Para facilitar o desenvolvimento, você pode ativar o **Live Reload** e o **Remove JS Debugging** chacoalhando o celular.
- O debugging pode ser feito pela página: `http://localhost:8081/debugger-ui/`, acessando o console de desenvolvedor.


## Contribuindo

Por favor leia [CONTRIBUTING](https://gist.github.com/PurpleBooth/b24679402957c63ec426) para mais detalhes sobre o nosso código de conduta e processo para submeter um _Pull Request_.

## Licença

Esse projeto está licenciado sobre a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.

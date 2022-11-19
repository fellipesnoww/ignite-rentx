# Rentx 🚘

Projeto criado no bootcamp Ignite 🔥 oferecido pela Rocketseat 🚀 da trilha de React Native.

A aplicação permite alugar veiculos consumindo uma api.

## Como executar o projeto?
- Clone o repositório em sua máquina;
- Abra o diretório do projeto através do terminal;
- Instale todas as dependências com:

npm
```bash
    npm install
```
ou utilizando o yarn
```bash
    yarn
```

Abra uma nova janela do seu terminal e execute o seguinte comando para disponibilizar  a api para o app:

**Você precisa alterar o IP da api para seu IP local no _package.json_ e em _./src/services/api.ts_**

Exemplo:

_package.json_
``` json
...
    "api": "json-server ./src/services/server.json --host **Seu IP** --port 3333 --delay 700"
...
```

_api.ts_
``` js
const api = axios.create({
    baseURL: "**Seu IP**:3333",
});
```

```bash
 npm run api
```

ou utilizando o yarn

```bash
    yarn api
```

- Após instalada todas as depedências do projeto será necessário ter o Expo instalado em sua máquina, [cheque aqui a documentação do Expo 😎](https://docs.expo.io/);
- Agora com todas as dependências do projeto e o Expo instalados em sua máquina, execute o comando:
```bash
    expo start
```
- O Expo irá disponibilizar para você um QR Code para que você possa utilizar seu dispositivo físico, ou você pode selecionar uma das opções para abrir a aplicação com um emulador.

## Figma
- [Veja o layout 📲](https://www.figma.com/file/0rnv2It0c8luzmluwYMksh/RentX-Ignite-(Copy)?node-id=0%3A1)

## Aprendizado
- Utilização de React Native com Typescript;
- Utilização do Expo (Bare Workflow);
- Utilização de Styled Components;
    - Criação de temas;
    - Acesso a propriedades;
    - Criação de componentes dinâmicos;
- Navegação:
    - Stack;
    - Bottom Tabs;
    - Mix de Bottom Tabs com Stack Navigation; 
- Utilização de SVG;
- Utilização da lib _calendars_ para criar componente de calendário;
- Utilização da lib json-server para criar uma api;
- Utilização da lib axios para realização de requisições a uma api;
- Criação de splash screen;
- Criação de animações utilizando o _react reanimated_;
- Criação de slider de imagens;
- Animação com Lottie;
- Aplicação de conceitos de UX/UI;
- Utilização de worklet;
- Validação de formulário com o Yup;
- Planejamento de aplicações com funções offline;
- Utilização do WatermelonDB para armazenamentos de dados:
    - Criação de banco;
    - Criação de models;
    - Criação de schemas;
    - Busca, adição, atualização e remoção de dados
    - Sincronismo de dados
- Utilização do ImagePicker para seleção de imagens do dispositivo do usuario;
- Utilização da FastImage para realização de cache de imagens;
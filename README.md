<p align="center" style="display: flex; align-items: center; justify-content: space-evenly; align-content: center; line-height: 10px;">
    <img src="https://img.shields.io/badge/NODE-%3E%3D18.17.1-brightgreen?style=for-the-badge">
    <img src="https://img.shields.io/badge/NPM-%3E%3D7.20.5-orange?style=for-the-badge">
    <img src="https://img.shields.io/badge/Android-v10-yellowgreen?style=for-the-badge">
    <img src="https://img.shields.io/badge/iOS-v13-lightgrey?style=for-the-badge">
    <img src="https://img.shields.io/badge/STATUS-EM%20DESENVOLVIMENTO-blue?style=for-the-badge">
    <img src="https://img.shields.io/badge/java-v11-red?style=for-the-badge">
    <img src="https://img.shields.io/badge/xcode-%3E=10-lightgrey?style=for-the-badge">
</p>

<h1 align="center">
    <img alt="Cante Uma Nova Canção" title="Cante Uma Nova Canção" src="src/assets/images_readme/banner-cunc-1.png" style="border-radius: 15px"/>
    <p style="display: flex; align-items: center; justify-content: center;line-height: 22px; margin-top: 15px">
        Cante Uma Nova Canção
        <img src="src/assets/note_logo.png" width="25" style="border-radius: 5px; margin-left: 10px;" alt="Logo">
    </P>
</h1>

<p align="center">
    <a href="#computer-sobre-o-projeto">Sobre</a> &nbsp | &nbsp  
    <a href="#open_file_folder-estrutura-do-projeto">Estrutura do projeto</a> &nbsp | &nbsp  
    <a href="#art-layout">Layout</a> &nbsp  | &nbsp 
    <a href="#wrench-tecnologias-utilizadas">Tecnologias utilizadas</a> &nbsp  | &nbsp 
    <a href="#pushpin-pré-requisitos">Pré-requisitos</a> &nbsp  | &nbsp 
    <a href="#zap-rodando-a-aplicação">Rodando a aplicação</a> &nbsp  | &nbsp 
    <a href="#construction_worker-autor">Autor</a>
</p>

### :computer: **Sobre o projeto**

<p align="center">
    Um app de música criado com <a href="https://reactnative.dev/" target="_blank">🔗 React Native</a> para ter as músicas da Igreja de Cristo Internacional
    na palma da mão e poder acompanhar, ouvir e cantar onde estiver.
</p>

### :open_file_folder: **Estrutura do Projeto**

``` text
├── App.js
├── app.json
├── babel.config.js
├── eas.json
├── index.js
├── metro.config.js
├── package.json
├── src
│   ├── assets
│   │   ├── images_readme
│   │   ├── music
│   ├── components
│   │   ├── ErrorScreen
│   │   ├── Filter
│   │   ├── Loading
│   │   ├── Music
│   │   ├── MusicCipher
│   │   ├── PrivacyPolicy
│   │   ├── RecentSearches
│   │   ├── SpecialPage
│   │   └── TermsOfUse
│   ├── contexts
│   │   ├── connection.js
│   │   ├── music.js
│   │   └── search.js
│   ├── pages
│   │   ├── About
│   │   ├── Cipher
│   │   ├── Lyrics
│   │   └── Search
│   ├── routes
│   │   └── router.js
│   ├── service
│   │   ├── api.js
│   │   └── http.js
│   ├── style
│   │   ├── AboutStyle.js
│   │   ├── CipherStyle.js
│   │   ├── ErrorScreenStyle.js
│   │   ├── FilterStyle.js
│   │   ├── LoaderScreenStyle.js
│   │   ├── LoadingIndicatorStyle.js
│   │   ├── LyricsStyle.js
│   │   ├── MusicStyle.js
│   │   ├── RecentSearchesStyles.js
│   │   ├── SearchStyle.js
│   │   ├── SpecialEditionStyle.js
│   │   ├── TermsAndPrivacyStyle.js
│   │   └── themes
│   └── utils
│       ├── index.js
│       └── mockMusicData.json
└── style.js
```

### :art: **Layout**
<br>

<p align="center">
    <img src="src/assets/images_readme/cunc_home.jpeg" width="350" style="border-radius: 15px" height="740" alt="print musica">
    <img src="src/assets/images_readme/cunc_music.jpeg" width="350" style="border-radius: 15px" height="740" alt="print musica">
    <img src="src/assets/images_readme/cunc_cipher.jpeg" width="350" style="border-radius: 15px" height="740" alt="print musica">
    <img src="src/assets/images_readme/cunc_cipher_ex.jpeg" width="350" style="border-radius: 15px" height="740" alt="print musica">
    <img src="src/assets/images_readme/cunc_search.jpeg" width="350" style="border-radius: 15px" height="740" alt="print busca">
    <img src="src/assets/images_readme/cunc_about.jpeg" width="350" style="border-radius: 15px" height="740" alt="print sobre">
</p>

### :wrench: **Tecnologias utilizadas**
- ``Expo``
- ``React Native``
- ``JavaScript``
- ``Node.JS``
- ``Visual Studio Code``

<h2 align="center">🚀 Como executar o projeto</h2>

### :pushpin: **Pré-requisitos**

<p>
    Antes de começar, é necessário ter algumas ferramentas instaladas no seu PC:
</p>

- [Node.JS](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)<br>

💡 (Seguir todos os passos de instalação do Expo CLI)

**Build Android**
- Java 11 ou posterior **
- Android Studio
- Dispositivo Android ou Emulador *

**Build iOS**
- MacOS
- Xcode
- Dispositivos iOS ou Emulador *

<h6 style="color:#ff0000">** Expo SDK 53 - versão atual</h6>

*&nbsp;(Necessário ter o APP <b>Expo Go</b> instalado em  dispositivos Android ou iOS).

## :zap: **Rodando a aplicação**

```bash
  npm install 
  npm start
```
ou

```bash
  yarn
  yarn start
```
ou 

```bash
    expo start
```

## :construction_worker: **Autor**

| [<img src="https://avatars.githubusercontent.com/u/52784300?s=400&u=f312e0d7a4b762d664aab3f48393bdb32d3065b8&v=4" width=115><br><sub>Anthony Oliveira 🚀</sub>](https://github.com/anthonyoliver1) 
| :---: |

Feito com ❤️ por Anthony Oliveira! 

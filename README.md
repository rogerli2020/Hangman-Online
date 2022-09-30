# Hangman Online

## Project Description
Project deployed at http://rogerli2024.com/.
This is a full-stack project that, when deployed, allows users to play Hangman game with each other interactiely through websocket connections over the Internet. If a user wishes to save their game statistics information, they can choose to sign up and log in using either their email or Google account.
The authentication system is modified based on the auth_system project found at https://github.com/linkedweb/auth_system. The dictionary database utilized in this project is developed by Ayesh Jayasekara and is found at https://github.com/AyeshJayasekara/English-Dictionary-SQLite.

## Technologies Used
- **React.js**
    - Frontend design and development.
- **Django**
    - Backend authentication system.
    - Web API.
- **Python3**
    - Websocket game server.
- **SQLite3/SQL**
    - Updates/retrievals of game data.
- **AWS EC2**
    - Server deployment.
- **Nginx**
    - Production environment web deployment.

## Installation Directions

Follow these steps:
-   Follow the directions on https://github.com/linkedweb/auth_system
-   For the game server, go to the parent directory of folder "gameserver", set up a virtual python environment, and install dependencies listed in requirements.txt.
-   The game server is a separate program from the web server. Both server needs to be running.

## Installation Directions

Future updates/bug fixes:
-   Game UI redesign/optimization.
-   Better support for mobile platforms.
# Hangman Online

## Project Description
Project is deployed at https://hangman.rogerli.net/ (currently down).
This is a full-stack project that, when deployed, allows users to play a real-time Hangman game with each other interactively through websocket connections over the Internet. If a user wishes to save their game statistics information, they can choose to sign up and log in using their email.
The authentication system is modified based on the auth_system project found at https://github.com/linkedweb/auth_system. The dictionary database utilized in this project is developed by Ayesh Jayasekara and is found at https://github.com/AyeshJayasekara/English-Dictionary-SQLite.

## Technologies Used
- **React.js**
    - Frontend design and development.
- **Django**
    - Backend.
    - Web API.
    - User authentication.
- **Python3**
    - Websocket game server.
- **Flickr API**
    - Provides relevant .jpg images for given keyword.
- **SQLite3/SQL**
    - Database for user information and English dictionary.
- **AWS EC2**
    - Server deployment.
- **Nginx**
    - Production environment web deployment.

## Installation Directions

Follow these steps:
-   Follow the directions on https://github.com/linkedweb/auth_system
-   For the game server, go to the parent directory of folder "gameserver", set up a virtual python environment, and install dependencies listed in requirements.txt.
-   The game server is a separate program from the web server. Both server needs to be running at the same time.

## Future Updates

Future updates/bug fixes:
-   Game UI redesign/optimization.
-   Better support for mobile platforms.
-   Friends system.
-   Blog system.
-   Game mechanics improvements.
-   OAuth.

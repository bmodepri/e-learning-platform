# Proffy - React application to allow students to connect with teachers for several topics



## :rocket: Thanks to RocketSeat for providing this [amazing](https://rocketseat.com.br/) 1 week bootcamp :clap:




:one: The first version includes tree solutions:


:iphone: mobile: 

The mobile version of the Proffy application containing a landing page, a page forstudentsto search for proffys and contact them directly via whatsapp.

## :package: Stack: 
* react-native
* axios
* typescript
* expo
    
:information_source: How to run the mobile application at your local machine:
:wrench: First, install the required tools:

* [NodeJs](https://nodejs.org/en/download/)  
* [yarn](https://yarnpkg.com/getting-started/install): npm install -g yarn
* [expo-cli](https://expo.io/tools#cli): yarn global add expo-cli

:white_check_mark: Prepare your environment:

* :one: clone the repository from git
* :two: run:  yarn install
* :tree: run: yarn start 

:earth_africa: expo will automatically open the metro bundler at your defaultbrowser.
![](./readme/img/expo_metro_bundler.png)

you can select the suimulators or scan the QR code with your mobile phone, 
for that you will need to install expo at your mobile phone from the app store.
- server:
    -- An api that allow us to record classes, connections, schedules and users and queryproffys by filtering their time availability.
    # Stack:
        -- knex
        -- typescript 
        -- express
        -- postgresql (on the rocketseat original class they used sqlite)

- web: 
    -- The web version of the proffy app, here we can access a beautiful landing page, apage for "proffys" to record the classes they are offering, a page for students tosearch for proffys and contact them directly via whatsapp.
    # Stack:
        -- typescript
        -- react
        -- axios
        
## Thanks to RocketSeat: the version 2 will be created as a challenge: details are here: https://www.notion.so/Vers-o-2-0-Proffy-eefca1b981694cd0a895613bc6235970



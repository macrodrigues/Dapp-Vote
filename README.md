# Description

Blockchain based E-Vote to improve transparency in the voting system.

The app was built around the portuguese voting system, however it can be easily implemented in any order system.

It is a simple app, which was developed mainly to improve my programming skills.

There are still some adjustments to be made, but for begginers propose it works properly.

# How to run

Note: Everything was developed using Windows, in this case, I advise to install Virtual Studio 15, Python 2.7.15 and Node.js v10.

These are the commands I used:

-	npm install -g truffle //development environment, testing framework and deployment pipeline for Ethereum dapps

- npm install ganache-cli //local blockchain 

- truffle init //create project folders

- npm init //create JSON file

Next I used the commands of the article: https://www.valentinog.com/blog/babel/. And i mixed them with some other commands:

- npm i -S @babel/core @babel/preset-env @babel/preset-react babel-loader @babel/polyfill @babel/plugin-proposal-class-properties

- npm i -S style-loader css-loader

- npm i html-webpack-plugin html-loader --save-dev

- npm i webpack-dev-server --save-dev

-	npm i web3 

After having all the dependencies needed in the node_modules file, I performed the following commands:

- truffle compile

- truffle migrate //migrate .sol to .json files

- npm start //runs app









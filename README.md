# BrowserFileManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Application description
The application is designed to show and to navigate a directory structure by reading the following json file:

`src/assets/content-tree.json`

It is possible to add and remove content inside this file, respecting the structure designed for the json, and the application will show the relative content inside the brower.

## Application features

* navigation via mouse;
* navigation via keyboard: (`shift+w` to go up, `shift+s` to go down, `enter` to move inside a folder, `shift+b` to move one level back);
* display of current directory full path;
* search of file and folders inside the full directories tree;

## Prerequisites
In order to run the application, npm command is required in the operative system. The application is tested with the following version of npm: `8.3.0`

## Development server

For the first go in the root directory of the application and install the required dependencies with the following command:

`npm i`

Then, run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

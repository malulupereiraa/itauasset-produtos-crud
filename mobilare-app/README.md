# MOBILARE-APP

## Requirements

- Node (v 20.9.0)
- Angular CLI 17.3.4

## Quick Start
Clone this repo and run the content locally:
```bash
$ npm install
$ ng s
```
In your browser, access:
```bash
http://localhost:4200
```

## Folder Structure

The folder structure is somewhat simplified and flatter compared to John Papa's [Gulp Patterns](https://github.com/johnpapa/gulp-patterns) project. The description below includes reasons for some of my customizations.

### Source Folder Structure

```
/src
    /app
      /@core
        /components
          /default-layout
        /models
      /@theme
        /default-layout
      /views
        /home
        /produtos
          /produto-ce
          /produto-list
    /assets
    /index.html
```

The `src` folder contains only the source for the AngularJS client application. 

Below this level you will find various folders that arrange the application's functionality into logical modules.

- `app:` Contains all of the folders with the project structure. Below this level you will find the following folders:

- `@core:` Contains functionality that is shared across the application and will probably need customization for a specific application. This includes models to the entire application.

- `@theme:` Contains all the custom styles of the application.

- `views:` Contains all the components of the application. 

## Credits
This project was developed by Maria Luiza Pereira

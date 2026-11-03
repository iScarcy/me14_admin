# Me14Admin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Configurazione runtime

Gli URL delle API e delle immagini sono caricati da `src/assets/config.json` all'avvio. Dopo il build, il file viene pubblicato come `assets/config.json` nella cartella dell'app; per cambiare gli URL in un ambiente già distribuito, modifica quel JSON sul server senza ricompilare l'applicazione. L'app attende il caricamento della configurazione prima di avviarsi.

Il server dovrebbe servire `assets/config.json` senza una cache lunga, oppure invalidarne la cache quando viene aggiornato. Mantieni gli slash finali sugli URL base usati come prefissi. Aggiorna `baseUsersApiUrl` all'indirizzo raggiungibile dall'ambiente di destinazione: il valore iniziale `http://localhost:5251/api/Users/` funziona solo quando l'API è raggiungibile sul computer dell'utente che apre il browser.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

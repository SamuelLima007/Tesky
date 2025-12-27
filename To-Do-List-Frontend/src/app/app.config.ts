import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/Aura';
import { routes } from './app.routes';
import { MessageService } from 'primeng/api';


export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
     providePrimeNG({

            theme: {
               preset: Aura
            }
            
        })
  ]
};

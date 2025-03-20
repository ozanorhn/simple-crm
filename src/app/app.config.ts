import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Firebase Imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

// Animations
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    
    // Firebase Initialisierung
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyCi5P2HlpOVhhzMfdbV8z2RpRBQaSFE3sM",
        authDomain: "simple-crm-6ccef.firebaseapp.com",
        projectId: "simple-crm-6ccef",
        storageBucket: "simple-crm-6ccef.appspot.com", // ✅ Korrigierte URL
        messagingSenderId: "184390183622",
        appId: "1:184390183622:web:f571f0b210a409f34145c7"
      })
    ),
    
    // Firestore bereitstellen
    provideFirestore(() => getFirestore()),

    // Realtime Database bereitstellen (falls benötigt)
    provideDatabase(() => getDatabase()),
  ],
};

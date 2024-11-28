import { Routes } from '@angular/router';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';

export const routes: Routes = [
  { path: '', component: RestaurantListComponent },
  { path: 'reserve/:id', component: ReservationFormComponent },
  { path: '**', redirectTo: '' } // Redirection vers la page d'accueil si la route n'existe pas
];
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <h2>Faire une réservation</h2>
      <form (ngSubmit)="onSubmit()" #reservationForm="ngForm">
        <div class="mb-3">
          <label for="customerName" class="form-label">Nom</label>
          <input type="text" class="form-control" id="customerName" 
                 [(ngModel)]="reservation.customerName" name="customerName" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" 
                 [(ngModel)]="reservation.email" name="email" required>
        </div>
        <div class="mb-3">
          <label for="phoneNumber" class="form-label">Téléphone</label>
          <input type="tel" class="form-control" id="phoneNumber" 
                 [(ngModel)]="reservation.phoneNumber" name="phoneNumber" required>
        </div>
        <div class="mb-3">
          <label for="date" class="form-label">Date</label>
          <input type="date" class="form-control" id="date" 
                 [(ngModel)]="reservation.date" name="date" required>
        </div>
        <div class="mb-3">
          <label for="time" class="form-label">Heure</label>
          <input type="time" class="form-control" id="time" 
                 [(ngModel)]="reservation.time" name="time" required>
        </div>
        <div class="mb-3">
          <label for="numberOfGuests" class="form-label">Nombre de personnes</label>
          <input type="number" class="form-control" id="numberOfGuests" 
                 [(ngModel)]="reservation.numberOfGuests" name="numberOfGuests" required>
        </div>
        <button type="submit" class="btn btn-primary">Réserver</button>
      </form>
    </div>
  `
})
export class ReservationFormComponent implements OnInit {
  restaurantId: number | null = null;
  reservation = {
    customerName: '',
    email: '',
    phoneNumber: '',
    date: '',
    time: '',
    numberOfGuests: 1,
    restaurantId: null as number | null
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute  // Ajout de ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du restaurant depuis l'URL
    this.route.params.subscribe(params => {
      this.restaurantId = +params['id']; // Le + convertit la chaîne en nombre
      this.reservation.restaurantId = this.restaurantId;
    });
  }

  onSubmit() {
    if (!this.restaurantId) {
      Swal.fire({
        title: 'Erreur!',
        text: 'Restaurant non spécifié',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const dateTime = new Date(`${this.reservation.date}T${this.reservation.time}`);

    const reservationData = {
      customerName: this.reservation.customerName,
      email: this.reservation.email,
      phoneNumber: this.reservation.phoneNumber,
      dateTime: dateTime.toISOString(),
      numberOfGuests: this.reservation.numberOfGuests,
      restaurantId: this.restaurantId  // Ajout de l'ID du restaurant
    };

    this.http.post('http://localhost:8080/reservations', reservationData)
    .subscribe({
      next: (response) => {
        console.log('Réservation créée:', response);  // Ajouter ce log
        Swal.fire({
          title: 'Succès!',
          text: 'Votre demande de réservation a été enregistrée avec succès',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erreur détaillée:', error);  // Ajouter ce log
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur est survenue lors de la réservation: ' + error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
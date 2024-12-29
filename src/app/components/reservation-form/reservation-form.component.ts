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
  styleUrls: ['./reservation-form.component.css'],
  template: `
  <div class="reservation-container">
    <h2>Réservation de Table</h2>
    <form (ngSubmit)="onSubmit()" #reservationForm="ngForm">
      <div class="form-group">
        <label for="customerName" class="form-label">Nom complet</label>
        <input type="text" class="form-control" id="customerName" 
               [(ngModel)]="reservation.customerName" name="customerName" required>
      </div>
      
      <div class="form-group">
        <label for="email" class="form-label">Adresse email</label>
        <input type="email" class="form-control" id="email" 
               [(ngModel)]="reservation.email" name="email" required>
      </div>
      
      <div class="form-group">
        <label for="phoneNumber" class="form-label">Numéro de téléphone</label>
        <input type="tel" class="form-control" id="phoneNumber" 
               [(ngModel)]="reservation.phoneNumber" name="phoneNumber" required>
      </div>
      
      <div class="date-time-grid">
        <div class="form-group">
          <label for="date" class="form-label">Date</label>
          <input type="date" class="form-control" id="date" 
                 [(ngModel)]="reservation.date" name="date" 
                 [min]="minDate" required>
        </div>
        
        <div class="form-group">
          <label for="time" class="form-label">Heure</label>
          <input type="time" class="form-control" id="time" 
                 [(ngModel)]="reservation.time" name="time" required>
        </div>
      </div>
      
      <div class="form-group">
        <label for="numberOfGuests" class="form-label">Nombre de personnes</label>
        <input type="number" class="form-control" id="numberOfGuests" 
               [(ngModel)]="reservation.numberOfGuests" name="numberOfGuests" 
               min="1" max="20" required>
      </div>
      
      <button type="submit" class="btn btn-reserve">
        Confirmer la réservation
      </button>
    </form>
  </div>
  `
})
export class ReservationFormComponent implements OnInit {
  restaurantId: number | null = null;
  minDate: string;

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
    private route: ActivatedRoute
  ) {
    // Définir la date minimum comme aujourd'hui
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.restaurantId = +params['id'];
      this.reservation.restaurantId = this.restaurantId;
    });
  }

  private isValidDate(dateStr: string, timeStr: string): boolean {
    const now = new Date();
    const reservationDate = new Date(`${dateStr}T${timeStr}`);
    
    // Réinitialiser les secondes et millisecondes pour une comparaison plus précise
    now.setSeconds(0);
    now.setMilliseconds(0);
    reservationDate.setSeconds(0);
    reservationDate.setMilliseconds(0);
    
    return reservationDate > now;
  }

  validateFields(): { isValid: boolean, message: string } {
    // Validation du restaurant
    if (!this.restaurantId) {
      return { isValid: false, message: 'Restaurant non spécifié' };
    }

    // Validation du nom
    if (!this.reservation.customerName.trim()) {
      return { isValid: false, message: 'Le nom est obligatoire' };
    }

    // Validation de l'email
    if (!this.reservation.email.trim()) {
      return { isValid: false, message: 'L\'email est obligatoire' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.reservation.email)) {
      return { isValid: false, message: 'Format d\'email invalide' };
    }

    // Validation du téléphone
    if (!this.reservation.phoneNumber.trim()) {
      return { isValid: false, message: 'Le numéro de téléphone est obligatoire' };
    }
    const phoneRegex = /^[0-9+\s-]{8,}$/;
    if (!phoneRegex.test(this.reservation.phoneNumber)) {
      return { isValid: false, message: 'Format de numéro de téléphone invalide' };
    }

    // Validation de la date et l'heure
    if (!this.reservation.date || !this.reservation.time) {
      return { isValid: false, message: 'La date et l\'heure sont obligatoires' };
    }

    // Vérification si la date est valide
    if (!this.isValidDate(this.reservation.date, this.reservation.time)) {
      return { isValid: false, message: 'La réservation doit être pour une date et heure futures' };
    }

    // Validation du nombre de convives
    if (!this.reservation.numberOfGuests || this.reservation.numberOfGuests < 1) {
      return { isValid: false, message: 'Le nombre de personnes doit être au moins 1' };
    }
    if (this.reservation.numberOfGuests > 20) {
      return { isValid: false, message: 'Le nombre maximum de personnes est 20' };
    }

    return { isValid: true, message: '' };
  }

  onSubmit() {
    const validation = this.validateFields();
    if (!validation.isValid) {
      Swal.fire({
        title: 'Erreur!',
        text: validation.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const reservationData = {
      customerName: this.reservation.customerName,
      email: this.reservation.email,
      phoneNumber: this.reservation.phoneNumber,
      reservationTime: new Date(`${this.reservation.date}T${this.reservation.time}`).toISOString(),
      numberOfGuests: this.reservation.numberOfGuests,
      restaurantId: this.restaurantId
    };
    
    this.http.post('http://localhost:8080/reservations', reservationData)
    .subscribe({
      next: (response) => {
        console.log('Réservation créée:', response);
        Swal.fire({
          title: 'Succès!',
          text: 'Votre demande de réservation a été enregistrée avec succès',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erreur détaillée:', error);
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
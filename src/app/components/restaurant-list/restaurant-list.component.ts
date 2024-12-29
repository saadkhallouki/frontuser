import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Restaurant {
  restaurantID: number;
  name: string;
  location: string;
  imgUrl: string;
}

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="restaurant-container">
      <h2 class="restaurant-title">Découvrez Nos Restaurants</h2>
      <div class="restaurant-grid">
        <div class="restaurant-card" *ngFor="let restaurant of restaurants">
          <div class="card-image-container">
            <img [src]="restaurant.imgUrl" [alt]="restaurant.name">
          </div>
          <div class="card-content">
            <h3 class="restaurant-name">{{restaurant.name}}</h3>
            <p class="restaurant-location">
              <i class="fas fa-map-marker-alt"></i> {{restaurant.location}}
            </p>
            <a [routerLink]="['/reserve', restaurant.restaurantID]" 
               class="reserve-button">
               Réserver une table
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.http.get<Restaurant[]>('http://localhost:8080/restaurants')
      .subscribe({
        next: (data) => {
          this.restaurants = data;
          // Pas besoin de mapper l'URL car elle est déjà correcte depuis le backend
        },
        error: (error) => {
          console.error('Erreur lors du chargement des restaurants:', error);
        }
      });
  }
}
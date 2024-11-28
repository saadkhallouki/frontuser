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
    <div class="container mt-4">
      <h2 class="text-center mb-4">Nos Restaurants</h2>
      <div class="row">
        <div class="col-md-4 mb-4" *ngFor="let restaurant of restaurants">
          <div class="card h-100 shadow-sm">
            <img 
              [src]="restaurant.imgUrl" 
              class="card-img-top" 
              alt="{{restaurant.name}}"
              style="height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{restaurant.name}}</h5>
              <p class="card-text">{{restaurant.location}}</p>
              <a [routerLink]="['/reserve', restaurant.restaurantID]" 
                 class="btn btn-primary mt-auto">
                 Réserver une table
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
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
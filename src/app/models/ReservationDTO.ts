export interface ReservationDTO {
  email: string;
  people: number;
  date: string;
  reservationTime: string; // Use ISO 8601 format for date-time
  restaurantId: number;
}

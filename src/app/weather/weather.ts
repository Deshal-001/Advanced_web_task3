import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../services/weather.service';
import { OpenMeteoResponse, CurrentWeather } from '../services/weather.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="weather-section">
      <h2>Weather</h2>
      <p>Current weather data from Open-Meteo API (Berlin).</p>

      <div *ngIf="loading" class="loading">Loading...</div>
      <div *ngIf="error" class="error">{{ error }}</div>

      <div *ngIf="weather && !loading" class="weather-card">
        <div class="temperature">{{ weather.current_weather?.temperature }}°</div>
        <div class="weather-info">
          <div class="location"><strong>Location:</strong> Latitude {{ weather.latitude }}, Longitude {{ weather.longitude }}</div>
          <div class="timezone"><strong>Timezone:</strong> {{ weather.timezone }}</div>
          <div class="time"><strong>Time:</strong> {{ weather.current_weather?.time }}</div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `.weather-section { max-width: 600px; margin: 0 auto; }`,
    `.weather-section h2 { color: #111827; margin-bottom: 0.5rem; }`,
    `.weather-section p { color: #6B7280; margin-bottom: 1.5rem; }`,
    `.weather-card { background: white; padding: 2.5rem; border-radius: 12px; border: 1px solid #E5E7EB; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }`,
    `.weather-info { display: grid; gap: 1rem; }`,
    `.temperature { font-size: 3.5rem; font-weight: 700; color: #F59E0B; text-align: center; }`,
    `.location, .timezone, .time { color: #4B5563; font-size: 1rem; padding: 0.75rem; background: #F9FAFB; border-radius: 8px; border-left: 4px solid #2563EB; }`,
    `.location strong, .timezone strong, .time strong { color: #111827; font-weight: 600; }`,
    `.loading { color: #6B7280; text-align: center; font-size: 1.1rem; padding: 2rem; }`,
    `.error { color: #EF4444; font-weight: 600; padding: 1rem; background: #FEE2E2; border: 1px solid #FECACA; border-radius: 8px; }`
  ]
})
export class Weather implements OnInit, OnDestroy {
    weather?: OpenMeteoResponse | null;
    loading = false;
    error: string | null = null;
    private sub?: Subscription;

    constructor(private svc: WeatherService) {}

    ngOnInit() {
      this.loading = true;
      this.sub = this.svc.getCurrentWeather(52.52, 13.405).subscribe({
        next: (w) => {
          this.weather = w;
          this.loading = false;
        },
        error: (err) => {
          this.error = String(err);
          this.loading = false;
        }
      });
    }

    ngOnDestroy() {
      this.sub?.unsubscribe();
    }
  }
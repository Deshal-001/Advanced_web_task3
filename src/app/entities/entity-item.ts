import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Entity } from '../services/entities.service';

@Component({
  selector: 'app-entity-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="entity" (click)="onClick()" role="button" tabindex="0">
      <div *ngIf="entity.type === 'book'" class="book">
        <div class="book-head">
          <strong>{{ entity.title }}</strong>
          <span class="year">{{ entity.publishYear }}</span>
        </div>
        <div class="author">by {{ entity.author }}</div>
        <div class="isbn">ISBN: {{ entity.isbn }}</div>
        <div class="meta">Genres:</div>
        <ul class="tag-list">
          <li *ngFor="let g of entity.genres">{{ g }}</li>
        </ul>
      </div>

      <div *ngIf="entity.type === 'product'" class="product">
        <div class="product-head">
          <strong>{{ entity.name }}</strong>
          <span class="price">\${{ entity.price }}</span>
        </div>
        <div class="category">{{ entity.category }}</div>
        <div class="stock" [class.in-stock]="entity.inStock" [class.out-stock]="!entity.inStock">
          {{ entity.inStock ? 'In Stock' : 'Out of Stock' }}
        </div>
        <div class="meta">Tags:</div>
        <ul class="tag-list">
          <li *ngFor="let t of entity.tags">{{ t }}</li>
        </ul>
      </div>

      <div *ngIf="entity.type === 'pet'" class="pet">
        <div class="pet-head">
          <strong>{{ entity.name }}</strong>
          <span class="age">{{ entity.age }} years</span>
        </div>
        <div class="species">{{ entity.species }} - {{ entity.breed }}</div>
        <div class="meta">Vaccinations:</div>
        <ul class="tag-list">
          <li *ngFor="let v of entity.vaccinations">{{ v }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `.entity { padding: 1rem; border-radius: 12px; background: white; border: 1px solid #E5E7EB; cursor: pointer; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); transition: all 0.2s ease; }`,
    `.entity:hover { border-color: #2563EB; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15); transform: translateY(-2px); }`,
    `.vehicle-head, .book-head, .product-head, .pet-head { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }`,
    `.vehicle-head strong, .book-head strong, .product-head strong, .pet-head strong { color: #111827; font-weight: 600; }`,
    `.year, .age { font-size: 0.85rem; color: #9CA3AF; background: #F3F4F6; padding: 0.25rem 0.5rem; border-radius: 4px; }`,
    `.price { font-size: 0.9rem; color: #10B981; background: #D1FAE5; padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: 600; }`,
    `.author, .category, .species, .isbn { color: #6B7280; font-size: 0.9rem; margin: 0.25rem 0; }`,
    `.stock { font-size: 0.85rem; font-weight: 600; margin: 0.5rem 0; padding: 0.35rem 0.5rem; border-radius: 4px; display: inline-block; }`,
    `.in-stock { color: #10B981; background: #D1FAE5; }`,
    `.out-stock { color: #EF4444; background: #FEE2E2; }`,
    `.meta { color: #6B7280; font-size: 0.9rem; margin: 0.5rem 0 0.5rem 0; font-weight: 500; }`,
    `.tyre-list, .tag-list { margin: 0.5rem 0 0 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 0.5rem; }`,
    `.tyre-list li { background: #2563EB; color: white; padding: 0.35rem 0.75rem; border-radius: 6px; font-weight: 600; font-size: 0.8rem; white-space: nowrap; }`,
    `.tag-list li { background: #8B5CF6; color: white; padding: 0.35rem 0.75rem; border-radius: 6px; font-weight: 600; font-size: 0.8rem; white-space: nowrap; }`
  ]
})
export class EntityItem {
  @Input() entity!: Entity;
  @Output() select = new EventEmitter<Entity>();

  onClick() {
    this.select.emit(this.entity);
  }
}

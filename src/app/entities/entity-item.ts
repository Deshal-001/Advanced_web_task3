import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Entity } from '../services/entities.service';

@Component({
  selector: 'app-entity-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="entity" (click)="onClick()" role="button" tabindex="0">
      <div class="vehicle">
        <div class="vehicle-head">
          <strong>{{ raw.make }} {{ raw.model }}</strong>
          <span class="year">{{ raw.year }}</span>
        </div>
        <div class="meta">Tyre sizes:</div>
        <ul class="tyre-list">
          <li *ngFor="let t of raw.tyreSizes">{{ t }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `.entity { padding: 1rem; border-radius: 12px; background: white; border: 1px solid #E5E7EB; cursor: pointer; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); transition: all 0.2s ease; }`,
    `.entity:hover { border-color: #2563EB; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15); transform: translateY(-2px); }`,
    `.vehicle-head { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }`,
    `.vehicle-head strong { color: #111827; font-weight: 600; }`,
    `.year { font-size: 0.85rem; color: #9CA3AF; background: #F3F4F6; padding: 0.25rem 0.5rem; border-radius: 4px; }`,
    `.meta { color: #6B7280; font-size: 0.9rem; margin: 0.5rem 0 0.5rem 0; font-weight: 500; }`,
    `.tyre-list { margin: 0.5rem 0 0 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 0.5rem; }`,
    `.tyre-list li { background: #2563EB; color: white; padding: 0.35rem 0.75rem; border-radius: 6px; font-weight: 600; font-size: 0.8rem; white-space: nowrap; }`
  ]
})
export class EntityItem {
  @Input() entity!: Entity;
  @Output() select = new EventEmitter<Entity>();
  get raw() { return this.entity as any; }

  onClick() {
    this.select.emit(this.entity);
  }
}

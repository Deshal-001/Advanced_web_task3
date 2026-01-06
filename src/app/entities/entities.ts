import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { EntitiesService, Entity } from '../services/entities.service';
import { EntityItem } from './entity-item';

@Component({
  selector: 'app-entities',
  standalone: true,
  imports: [CommonModule, EntityItem],
  template: `
    <section class="entities-section">
      <h2>Entities</h2>
      <p>List of entities (books, products, and pets). Click an entity to view details.</p>

      <div class="entities-grid">
        <app-entity-item *ngFor="let e of entities" [entity]="e" (select)="onSelect($event)"></app-entity-item>
      </div>

      <div *ngIf="selected" class="selected-panel">
        <h3>Selected</h3>
        <pre>{{ selected | json }}</pre>
      </div>
    </section>
  `,
  styles: [
    `.entities-section { max-width: 1000px; margin: 0 auto; }`,
    `.entities-section h2 { color: #111827; margin-bottom: 0.5rem; font-weight: 600; }`,
    `.entities-section p { color: #6B7280; margin-bottom: 1.5rem; }`,
    `.entities-grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); margin-bottom: 2rem; }`,
    `.selected-panel { margin-top: 2rem; padding: 2rem; border: 1px solid #E5E7EB; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }`,
    `.selected-panel h3 { color: #111827; margin-bottom: 1rem; }`,
    `.selected-panel pre { margin: 0; font-size: 0.85rem; color: #374151; background: #F9FAFB; padding: 1rem; border-radius: 8px; border-left: 4px solid #2563EB; overflow-x: auto; }`,
  ]
})
export class Entities implements OnInit, OnDestroy {
  entities: Entity[] = [];
  selected: Entity | null = null;
  private sub?: Subscription;

  constructor(private svc: EntitiesService) {}

  ngOnInit() {
    this.sub = this.svc.getEntities().subscribe(list => this.entities = list);
  }

  onSelect(e: Entity) {
    this.selected = e;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}

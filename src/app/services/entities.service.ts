import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type EntityType = 'book' | 'product' | 'pet';

export interface BaseEntity {
  id: string;
  type: EntityType;
}

export interface BookEntity extends BaseEntity {
  type: 'book';
  title: string;
  author: string;
  isbn: string;
  publishYear: number;
  genres: string[];
}

export interface ProductEntity extends BaseEntity {
  type: 'product';
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  tags: string[];
}

export interface PetEntity extends BaseEntity {
  type: 'pet';
  name: string;
  species: string;
  breed: string;
  age: number;
  vaccinations: string[];
}

export type Entity = BookEntity | ProductEntity | PetEntity;

@Injectable({ providedIn: 'root' })
export class EntitiesService {
  private _entities$ = new BehaviorSubject<Entity[]>([
    { id: 'b-1', type: 'book', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', publishYear: 1925, genres: ['Classic', 'Fiction', 'Literature'] },
    { id: 'b-2', type: 'book', title: '1984', author: 'George Orwell', isbn: '978-0451524935', publishYear: 1949, genres: ['Dystopian', 'Fiction', 'Political'] },
    { id: 'b-3', type: 'book', title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0061120084', publishYear: 1960, genres: ['Classic', 'Fiction', 'Historical'] },
    { id: 'p-1', type: 'product', name: 'Wireless Mouse', category: 'Electronics', price: 29.99, inStock: true, tags: ['Wireless', 'USB', 'Ergonomic'] },
    { id: 'p-2', type: 'product', name: 'Coffee Maker', category: 'Appliances', price: 89.99, inStock: true, tags: ['12-Cup', 'Programmable', 'Stainless Steel'] },
    { id: 'p-3', type: 'product', name: 'Running Shoes', category: 'Sports', price: 119.99, inStock: false, tags: ['Lightweight', 'Breathable', 'Size 10'] },
    { id: 'pet-1', type: 'pet', name: 'Max', species: 'Dog', breed: 'Golden Retriever', age: 3, vaccinations: ['Rabies', 'Distemper', 'Parvovirus'] },
    { id: 'pet-2', type: 'pet', name: 'Whiskers', species: 'Cat', breed: 'Siamese', age: 2, vaccinations: ['Rabies', 'FVRCP'] },
    { id: 'pet-3', type: 'pet', name: 'Charlie', species: 'Dog', breed: 'Beagle', age: 5, vaccinations: ['Rabies', 'Distemper', 'Bordetella'] },
  ]);

  readonly entities$ = this._entities$.asObservable();

  getEntities(): Observable<Entity[]> {
    return this.entities$;
  }

  add(entity: Entity) {
    const current = this._entities$.value;
    this._entities$.next([...current, entity]);
  }

  update(updated: Entity) {
    const current = this._entities$.value.map(e => e.id === updated.id ? updated : e);
    this._entities$.next(current);
  }

  remove(id: string) {
    const current = this._entities$.value.filter(e => e.id !== id);
    this._entities$.next(current);
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCarritoCard } from './item-carrito-card';

describe('ItemCarritoCard', () => {
  let component: ItemCarritoCard;
  let fixture: ComponentFixture<ItemCarritoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCarritoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCarritoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

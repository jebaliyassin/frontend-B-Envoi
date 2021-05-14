import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypecourrierComponent } from './list-typecourrier.component';

describe('ListTypecourrierComponent', () => {
  let component: ListTypecourrierComponent;
  let fixture: ComponentFixture<ListTypecourrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTypecourrierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypecourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

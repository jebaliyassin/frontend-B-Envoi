import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypecourrierComponent } from './add-typecourrier.component';

describe('AddTypecourrierComponent', () => {
  let component: AddTypecourrierComponent;
  let fixture: ComponentFixture<AddTypecourrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypecourrierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypecourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

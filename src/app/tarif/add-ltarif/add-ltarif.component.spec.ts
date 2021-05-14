import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLtarifComponent } from './add-ltarif.component';

describe('AddLtarifComponent', () => {
  let component: AddLtarifComponent;
  let fixture: ComponentFixture<AddLtarifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLtarifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLtarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

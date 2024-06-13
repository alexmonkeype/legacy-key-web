import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotoComponent } from './voto.component';

describe('VotoComponent', () => {
  let component: VotoComponent;
  let fixture: ComponentFixture<VotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

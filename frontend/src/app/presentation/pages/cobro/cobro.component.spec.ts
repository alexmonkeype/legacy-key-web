import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobroComponent } from './cobro.component';

describe('CobroComponent', () => {
  let component: CobroComponent;
  let fixture: ComponentFixture<CobroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

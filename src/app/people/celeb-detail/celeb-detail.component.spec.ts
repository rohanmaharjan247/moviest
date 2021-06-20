import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebDetailComponent } from './celeb-detail.component';

describe('CelebDetailComponent', () => {
  let component: CelebDetailComponent;
  let fixture: ComponentFixture<CelebDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CelebDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

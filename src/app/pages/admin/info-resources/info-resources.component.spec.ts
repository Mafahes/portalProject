import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoResourcesComponent } from './info-resources.component';

describe('InfoResourcesComponent', () => {
  let component: InfoResourcesComponent;
  let fixture: ComponentFixture<InfoResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

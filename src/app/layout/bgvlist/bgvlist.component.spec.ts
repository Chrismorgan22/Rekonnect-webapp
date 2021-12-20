import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgvlistComponent } from './bgvlist.component';

describe('BgvlistComponent', () => {
  let component: BgvlistComponent;
  let fixture: ComponentFixture<BgvlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgvlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgvlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwiWorldComponent } from './iwi-world.component';

describe('IwiWorldComponent', () => {
  let component: IwiWorldComponent;
  let fixture: ComponentFixture<IwiWorldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwiWorldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IwiWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

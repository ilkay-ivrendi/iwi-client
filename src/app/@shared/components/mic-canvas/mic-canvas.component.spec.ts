import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicCanvasComponent } from './mic-canvas.component';

describe('MicCanvasComponent', () => {
  let component: MicCanvasComponent;
  let fixture: ComponentFixture<MicCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicCanvasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MicCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

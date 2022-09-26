import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextReceivedSuccessComponent } from './text-received-success.component';

describe('TextReceivedSuccessComponent', () => {
  let component: TextReceivedSuccessComponent;
  let fixture: ComponentFixture<TextReceivedSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextReceivedSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextReceivedSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

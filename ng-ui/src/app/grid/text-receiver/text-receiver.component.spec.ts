import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextReceiverComponent } from './text-receiver.component';

describe('TextReceiverComponent', () => {
  let component: TextReceiverComponent;
  let fixture: ComponentFixture<TextReceiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextReceiverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

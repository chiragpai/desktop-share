import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReceivedSuccessComponent } from './file-received-success.component';

describe('FileReceivedSuccessComponent', () => {
  let component: FileReceivedSuccessComponent;
  let fixture: ComponentFixture<FileReceivedSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileReceivedSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileReceivedSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

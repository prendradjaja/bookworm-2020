import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReadingEntryComponent } from './edit-reading-entry.component';

describe('EditReadingEntryComponent', () => {
  let component: EditReadingEntryComponent;
  let fixture: ComponentFixture<EditReadingEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReadingEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReadingEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

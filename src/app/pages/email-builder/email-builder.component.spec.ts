import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailBuilderComponent } from './email-builder.component';

describe('EmailBuilderComponent', () => {
  let component: EmailBuilderComponent;
  let fixture: ComponentFixture<EmailBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailBuilderComponent]
    });
    fixture = TestBed.createComponent(EmailBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

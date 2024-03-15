import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateUploaderComponent } from './certificate-uploader.component';

describe('CertificateUploaderComponent', () => {
  let component: CertificateUploaderComponent;
  let fixture: ComponentFixture<CertificateUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateUploaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertificateUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

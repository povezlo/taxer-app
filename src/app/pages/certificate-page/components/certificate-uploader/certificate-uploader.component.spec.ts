import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificateUploaderComponent } from './certificate-uploader.component';
import { CertificateService } from '@services/certificate/certificate.service';
import { FileService } from '@services/certificate/file.service';
import { CertificateStorageService } from '@services/certificate/certificate-storage.service';
import { of } from 'rxjs';

describe('CertificateUploaderComponent', () => {
  let component: CertificateUploaderComponent;
  let fixture: ComponentFixture<CertificateUploaderComponent>;
  let certificateServiceSpy: jasmine.SpyObj<CertificateService>;
  let fileServiceSpy: jasmine.SpyObj<FileService>;
  let storageServiceSpy: jasmine.SpyObj<CertificateStorageService>;

  beforeEach(async () => {
    certificateServiceSpy = jasmine.createSpyObj('CertificateService', ['getCertificates']);
    fileServiceSpy = jasmine.createSpyObj('FileService', ['readFile']);
    storageServiceSpy = jasmine.createSpyObj('CertificateStorageService', ['saveCertificates']);

    await TestBed.configureTestingModule({
      declarations: [CertificateUploaderComponent],
      providers: [
        { provide: CertificateService, useValue: certificateServiceSpy },
        { provide: FileService, useValue: fileServiceSpy },
        { provide: CertificateStorageService, useValue: storageServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificateUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle file upload', () => {
    const mockFile = new File(['Hello, World!'], 'test.txt', { type: 'text/plain' });
    const mockArrayBuffer = new ArrayBuffer(13);
    const mockCertificate = { commonName: 'cert3', validFrom: '2023-01-01', validTo: '2024-01-01', issuerCN: 'issuer1', id: 3 };

    fileServiceSpy.readFile.and.returnValue(of(mockArrayBuffer));
    certificateServiceSpy.getCertificates.and.returnValue(of(mockCertificate));

    component.handleFileUpload(mockFile);

    expect(fileServiceSpy.readFile).toHaveBeenCalledWith(mockFile);
    expect(certificateServiceSpy.getCertificates).toHaveBeenCalledWith(mockArrayBuffer);
    expect(storageServiceSpy.saveCertificates).toHaveBeenCalledWith(mockCertificate);
  });
});

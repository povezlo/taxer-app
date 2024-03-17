import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificateTableComponent } from './certificate-table.component';
import { CertificateStorageService } from '@services/certificate-storage';
import { ICertificate } from '@models/certificate';
import { RouterLink } from '@angular/router';

describe('CertificateTableComponent', () => {
  let component: CertificateTableComponent;
  let fixture: ComponentFixture<CertificateTableComponent>;
  let storageServiceSpy: jasmine.SpyObj<CertificateStorageService>;

  const mockCertificates: ICertificate[] = [
    { commonName: 'cert1', validFrom: '2023-01-01', validTo: '2024-01-01', issuerCN: 'issuer1', id: 1 },
    { commonName: 'cert2', validFrom: '2023-02-01', validTo: '2024-02-01', issuerCN: 'issuer2', id: 2 },
  ];

  beforeEach(async () => {
    storageServiceSpy = jasmine.createSpyObj('CertificateStorageService', ['getCertificates']);
    storageServiceSpy.getCertificates.and.returnValue(mockCertificates);

    await TestBed.configureTestingModule({
      declarations: [CertificateTableComponent],
      imports: [RouterLink],
      providers: [
        { provide: CertificateStorageService, useValue: storageServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize certificate data', () => {
    expect(component.certificates).toEqual(mockCertificates);
    expect(component.selectedCertificate).toEqual(mockCertificates[0]);
  });

  it('should select a certificate', () => {
    const index = 1;
    component.selectCertificate(index);
    expect(component.selectedCertificate).toEqual(mockCertificates[index]);
  });

  it('should check if certificate is active', () => {
    const activeIndex = 0;
    const inactiveIndex = 1;
    expect(component.isActive(activeIndex)).toBeTrue();
    expect(component.isActive(inactiveIndex)).toBeFalse();
  });
});

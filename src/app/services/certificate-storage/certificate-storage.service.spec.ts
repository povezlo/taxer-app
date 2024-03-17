import { TestBed } from '@angular/core/testing';
import { CertificateStorageService } from './certificate-storage.service';
import { ICertificate } from '@models*';

describe('CertificateStorageService', () => {
  let service: CertificateStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CertificateStorageService]
    });
    service = TestBed.inject(CertificateStorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get certificates from localStorage', () => {
    const mockCertificates: ICertificate[] = [
      { commonName: 'cert1', validFrom: '2023-01-01', validTo: '2024-01-01', issuerCN: 'issuer1', id: 1 },
      { commonName: 'cert2', validFrom: '2023-02-01', validTo: '2024-02-01', issuerCN: 'issuer2', id: 2 }
    ];
    localStorage.setItem('certificates', JSON.stringify(mockCertificates));

    const certificates = service.getCertificates();

    expect(certificates).toEqual(mockCertificates);
  });

  it('should save certificates to localStorage', () => {
    const newCertificate = { commonName: 'cert3', validFrom: '2023-01-01', validTo: '2024-01-01', issuerCN: 'issuer1', id: 3 };

    service.saveCertificates(newCertificate);

    const storedCertificates = JSON.parse(localStorage.getItem('certificates') || '[]');
    expect(storedCertificates).toContain(newCertificate);
  });

  it('should not save duplicate certificates', () => {
    const existingCertificate = { commonName: 'cert1', validFrom: '2023-01-01', validTo: '2024-01-01', issuerCN: 'issuer1', id: 1 };
    const newCertificate = { commonName: 'cert2', validFrom: '2023-01-01', validTo: '2024-01-01', issuerCN: 'issuer1', id: 2 };

    service.saveCertificates(existingCertificate);
    service.saveCertificates(newCertificate);

    const storedCertificates = JSON.parse(localStorage.getItem('certificates') || '[]');
    expect(storedCertificates.length).toBe(1);
    expect(storedCertificates[0]).toEqual(existingCertificate);
  });
});

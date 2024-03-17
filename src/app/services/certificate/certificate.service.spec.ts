import { TestBed } from '@angular/core/testing';
import { CertificateService } from './certificate.service';
import { Certificate } from 'pkijs';
import { fromBER } from 'asn1js';

describe('CertificateService', () => {
  let service: CertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CertificateService],
    });
    service = TestBed.inject(CertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse certificate correctly', async () => {
    const certData = fromBER(Buffer.from('30820...', 'hex')).result; // Replace with actual certificate data in BER format
    const certificate = new Certificate({ schema: certData });

    const expectedCertificate = {
      commonName: certificate.subject.typesAndValues.find(
        (typeAndValue) => typeAndValue.type === '2.5.4.3'
      )?.value.valueBlock.value,
      issuerCN: certificate.issuer.typesAndValues.find(
        (typeAndValue) => typeAndValue.type === '2.5.4.3'
      )?.value.valueBlock.value,
      validFrom: certificate.notBefore.value.toISOString().substring(0, 10),
      validTo: certificate.notAfter.value.toISOString().substring(0, 10),
      id: Number(certificate.serialNumber.valueBlock.toString()),
    };

    const parsedCertificate = await service.parseCertificate(
      certData.toBER(false)
    );
    expect(parsedCertificate).toEqual(expectedCertificate);
  });

  it('should throw error for invalid certificate data', async () => {
    const invalidCertData = new ArrayBuffer(0);
    try {
      await service.parseCertificate(invalidCertData);
      fail('Expected an error to be thrown');
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Cannot decode the certificate');
      } else {
        fail('Unexpected error type');
      }
    }
  });
});

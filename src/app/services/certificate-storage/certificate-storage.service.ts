import { Injectable } from '@angular/core';
import { ICertificate } from '@models/certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateStorageService {
  private storageKey = 'certificates';
  certificates: ICertificate[] = [];

  getCertificates(): ICertificate[] {
    const data = localStorage.getItem(this.storageKey);
    this.certificates = data ? JSON.parse(data) : [];

    return this.certificates;
  }

  saveCertificates(certificate: ICertificate): void {
    if (this.checkCertificateExists(certificate)) {
      return;
    }
    this.certificates.push(certificate);
    localStorage.setItem(this.storageKey, JSON.stringify(this.certificates));
  }

  checkCertificateExists(certificate: ICertificate): boolean {
    return this.certificates.some(cert => cert.commonName === certificate.commonName);
  }
}

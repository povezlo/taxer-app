import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ICertificate } from '@models/certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateStorageService {
  private storageKey = 'certificates';
  certificates: ICertificate[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getCertificates(): ICertificate[] {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(this.storageKey);
      this.certificates = data ? JSON.parse(data) : [];
    }
    return this.certificates;
  }

  saveCertificates(certificate: ICertificate): void {
    if (this.checkCertificateExists(certificate)) {
      return;
    }
    this.certificates.push(certificate);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.certificates));
    }
  }

  checkCertificateExists(certificate: ICertificate): boolean {
    return this.certificates.some(cert => cert.commonName === certificate.commonName);
  }
}

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

    return data ? JSON.parse(data) : [];
  }

  saveCertificates(certificate: ICertificate): void {
    this.certificates.push(certificate);
    localStorage.setItem(this.storageKey, JSON.stringify(this.certificates));
  }
}

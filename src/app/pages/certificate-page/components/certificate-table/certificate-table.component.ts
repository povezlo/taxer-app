import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CertificateStorageService } from '@services/certificate-storage';
import { ICertificate } from '@models/certificate';

@Component({
  selector: 'app-certificate-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './certificate-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificateTableComponent implements OnInit {
  certificates: ICertificate[] = [];
  selectedCertificate: ICertificate | null = null;

  storageService = inject(CertificateStorageService);

  ngOnInit(): void {
    this.initCertificateData();
  }

  initCertificateData(): void {
    this.certificates = this.storageService.getCertificates();
    if (!this.certificates.length) {
      return;
    }
    this.selectCertificate(0);
  }

  selectCertificate(index: number): void {
    this.selectedCertificate = this.certificates[index];
  }

  isActive(index: number): boolean {
    return this.selectedCertificate?.commonName === this.certificates[index].commonName;
  }
}

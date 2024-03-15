import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { mergeMap } from 'rxjs/operators';

import { CertificateService, FileService, CertificateStorageService } from '@services/certificate';

@Component({
  selector: 'app-certificate-uploader',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './certificate-uploader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificateUploaderComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  certificateService = inject(CertificateService);
  fileService = inject(FileService);
  storageService = inject(CertificateStorageService);

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileUpload(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.handleFileUpload(files[0]);
    }
  }

  handleFileUpload(file: File) {
    this.fileService.readFile(file).pipe(
      mergeMap(arrayBuffer => this.certificateService.getCertificates(arrayBuffer))
    ).subscribe(certificateData => {
      this.storageService.saveCertificates(certificateData);
    });
  }
}

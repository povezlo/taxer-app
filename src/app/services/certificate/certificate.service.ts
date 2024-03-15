import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';

import { Certificate } from 'pkijs';
import { fromBER } from 'asn1js';

import { ICertificate } from '@models/certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  getCertificates(certData: ArrayBuffer): Observable<ICertificate> {
    return from(this.parseCertificate(certData));
  }

  async parseCertificate(certData: ArrayBuffer): Promise<ICertificate> {
    const asn1 = fromBER(certData);

    if (asn1.offset === -1) {
      throw new Error('Cannot decode the certificate');
    }

    const certificate = new Certificate({ schema: asn1.result });

    const commonName = certificate.subject.typesAndValues.find(
      typeAndValue => typeAndValue.type === "2.5.4.3"
    )?.value.valueBlock.value;

    const issuerCN = certificate.issuer.typesAndValues.find(
      typeAndValue => typeAndValue.type === "2.5.4.3"
    )?.value.valueBlock.value;

    const validFrom = certificate.notBefore.value.toISOString().substring(0, 10);;
    const validTo = certificate.notAfter.value.toISOString().substring(0, 10);;
    const id = Number(certificate.serialNumber.valueBlock.toString());

    return { commonName, validFrom, validTo, issuerCN, id };
  }
}

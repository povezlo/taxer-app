export interface ICertificate {
  commonName?: string;
  validFrom: string;
  validTo: string;
  issuerCN?: string;
  id: number;
}

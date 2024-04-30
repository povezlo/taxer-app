import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  readFile(file: File): Observable<ArrayBuffer> {
    return from(this.readFileAsArrayBuffer(file));
  }

  private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result as ArrayBuffer);
        } else {
          reject(new Error('Не вдалося прочитати файл'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Не вдалося прочитати файл'));
      };
      reader.readAsArrayBuffer(file);
    });
  }
}

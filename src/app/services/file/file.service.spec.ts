import { TestBed } from '@angular/core/testing';
import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileService],
    });
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should read file as ArrayBuffer', (done) => {
    const mockFile = new File(['Hello, World!'], 'test.txt', {
      type: 'text/plain',
    });
    let expectedBuffer: ArrayBuffer;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(mockFile);
    fileReader.onload = () => {
      if (fileReader.result) {
        expectedBuffer = fileReader.result as ArrayBuffer;
      }

      service.readFile(mockFile).subscribe((result) => {
        expect(result).toEqual(expectedBuffer);
        done();
      });
    };
  });

  it('should handle file read error', (done) => {
    const mockFile = new File([], 'test.txt', { type: 'text/plain' });
    service.readFile(mockFile).subscribe(
      () => {},
      (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Не вдалося прочитати файл');
        done();
      }
    );
  });
});

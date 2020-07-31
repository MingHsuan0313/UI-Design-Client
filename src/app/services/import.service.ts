import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export default class ImportService {

  files: any[] = [];

  import() {
    document.getElementById('pictures').click();
  }

  getFiles() {
    const file = <HTMLInputElement>document.getElementById('pictures');
    for (let i = 0; i < file.files.length; i++) {
      this.files.push(file.files.item(i));
    }
    return this.files;
  }
}


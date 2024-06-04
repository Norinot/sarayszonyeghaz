import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class fileUploadService {
  selectedFile: any | null = null;
  allFiles: any[] = [];
}

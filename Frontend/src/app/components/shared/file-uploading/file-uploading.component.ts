
import { Component, inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { fileUploadService } from '../../services/fileUploading/fileUpload.service';

@Component({
  selector: 'app-file-uploading',
  standalone: true,
  imports: [FileUploadModule, ToastModule, ButtonModule, CommonModule, BadgeModule, ProgressBarModule],
  templateUrl: './file-uploading.component.html',
  styleUrl: './file-uploading.component.scss',
})
export class FileUploadingComponent {
  files: any = [];

  public fileUploadService = inject(fileUploadService);

  totalSize: number = 0;

  totalSizePercent: number = 0;

  private config = inject(PrimeNGConfig);

  choose(event: Event, callback: any) {
    callback();
  }

  onRemoveTemplatingFile(event: any, file: any, index: number) {
    this.files.splice(index, 1);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;

    if (this.fileUploadService.selectedFile === file) {
      if (this.files.length > 0) {
        this.fileUploadService.selectedFile = this.files[0];
      } else {
        this.fileUploadService.selectedFile = null;
      }
    }
  }

  onClearTemplatingUpload(clear: any) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onTemplatedUpload() {
  }

  onSelectedFiles(event: any) {
    this.fileUploadService.allFiles = event.currentFiles;

    this.files = event.currentFiles;
    this.files.forEach((file: any) => {
      this.totalSize += parseInt(this.formatSize(file.size));
    });
    this.totalSizePercent = this.totalSize / 10;

    if (this.files.length > 0) {
      this.fileUploadService.selectedFile = this.files[0];
    }
  }
  setPrimaryPicture(file: File) {
    this.fileUploadService.selectedFile = file;
  }


  formatSize(bytes: any) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config?.translation?.fileSizeTypes ?? 'default value';
    if (bytes === 0 && sizes != undefined) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }
}

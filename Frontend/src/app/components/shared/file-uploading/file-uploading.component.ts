import {
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core'
import { PrimeNGConfig } from 'primeng/api'
import { FileUploadModule } from 'primeng/fileupload'
import { ButtonModule } from 'primeng/button'
import { CommonModule } from '@angular/common'
import { BadgeModule } from 'primeng/badge'
import { ProgressBarModule } from 'primeng/progressbar'
import { ToastModule } from 'primeng/toast'
import { fileUploadService } from '../../services/fileUploading/fileUpload.service'


@Component({
  selector: 'app-file-uploading',
  standalone: true,
  imports: [
    FileUploadModule,
    ToastModule,
    ButtonModule,
    CommonModule,
    BadgeModule,
    ProgressBarModule,
  ],
  templateUrl: './file-uploading.component.html',
  styleUrl: './file-uploading.component.scss',
})
export class FileUploadingComponent implements OnInit {

  @Input() existingFiles: any[] = []

  files: any[] = []
  totalSize: number = 0
  totalSizePercent: number = 0

  public fileUploadService = inject(fileUploadService)
  private config = inject(PrimeNGConfig)

  ngOnInit() {
    this.files = this.existingFiles
    this.fileUploadService.allFiles = this.files
    this.fileUploadService.selectedFile = this.files[0]
  }

  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[]

    const updatedFiles = files.map((file: File) => {
      const objectURL = URL.createObjectURL(file)
      return { file, objectURL }
    })

    const nonDuplicateFiles = updatedFiles.filter(file =>
      !this.files.some(existingFile => existingFile.file && existingFile.file.name === file.file.name));

    this.files = [...this.files, ...nonDuplicateFiles]
    this.fileUploadService.allFiles = this.files
  }

  onRemoveTemplatingFile(file: any, index: number) {
    this.files.splice(index, 1)
    this.fileUploadService.allFiles = this.files

    if (this.fileUploadService.selectedFile === file) {
      if (this.files.length > 0) {
        this.fileUploadService.selectedFile = this.files[0]
      } else {
        this.fileUploadService.selectedFile = null
      }
    }
  }

  setPrimaryPicture(file: File) {
    this.fileUploadService.selectedFile = file
  }

  formatSize(bytes: any) {
    const k = 1024
    const dm = 3
    const sizes = this.config?.translation?.fileSizeTypes ?? 'default value'
    if (bytes === 0 && sizes != undefined) {
      return `0 ${sizes[0]}`
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

    return `${formattedSize} ${sizes[i]}`
  }
}

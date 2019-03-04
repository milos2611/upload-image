import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpResponse, HttpEventType, HttpClient } from '@angular/common/http';
import { CategoryModel } from 'src/app/categoryModel';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {
  selectedFile: File;

  selectedFiles: FileList;
  selectedFilesM: FileList;

  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  category = <CategoryModel>{};
  s: string = "sda";
  private base64textString: String = "";
  

  categoryModel = <CategoryModel>{};

  constructor(private uploadService: UploadFileService, private http: HttpClient) { }

  ngOnInit() {
  }



  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.categoryModel.image_path = this.base64textString;
    this.categoryModel.id = 2;
    this.uploadService.addCategory(this.categoryModel).subscribe()
  }





  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  selectFileM(event) {
    this.selectedFilesM = event.target.files;
  }

  onFileChanged(event) {
    this.selectedFiles = event.target.files[0]
  }
  onFileChangedM(event) {
    this.selectedFilesM = event.target.files[0]
  }
  onUploads() {
    // this.http is the injected HttpClient
    const uploadData = new FormData();
    uploadData.append('user', new Blob([JSON.stringify({ "category_name": this.categoryModel.category_name = "dsad" })], { type: "application/json" }))
    uploadData.append('file', this.selectedFile, this.selectedFile.name);

    this.http.post('api/cateogry/saveCategory', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
      });
  }


  onUploadsM() {
    // this.http is the injected HttpClient
    const uploadData = new FormData();
    uploadData.append('user', new Blob([JSON.stringify({ "category_name": this.categoryModel.category_name = "dsad" })], { type: "application/json" }))
    uploadData.append('file', this.selectedFile, this.selectedFile.name);

    this.http.post('api/cateogry/saveCategory', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
      });
  }
  upload(id:number,name: string, description: string) {
    this.progress.percentage = 0;

    this.category.category_name = name;
    this.category.category_description = description;
    this.category.id = id;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.category).subscribe(event => {
      console.log(event + "dsd");
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
   

    //this.uploadService.addHero(this.currentFileUpload, new CategoryModel(1, "s", "sd")).subscribe()
    this.selectedFiles = undefined;
  }


  uploadM() {
    
   

    this.currentFileUpload = this.selectedFilesM.item(0);
    console.log(this.category);
    this.uploadService.pushFileToStorageM(this.currentFileUpload, this.category).subscribe(event => {
      console.log(event + "dsd");
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
   

    //this.uploadService.addHero(this.currentFileUpload, new CategoryModel(1, "s", "sd")).subscribe()
    this.selectedFilesM = undefined;
  }

}

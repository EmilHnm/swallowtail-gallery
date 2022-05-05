import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-upload-profile',
  templateUrl: './upload-profile.component.html',
  styleUrls: ['./upload-profile.component.css'],
})
export class UploadProfileComponent implements OnInit {
  @ViewChild('image', { static: false }) image: ElementRef;
  @ViewChild('outputImage', { static: false }) outputImage: ElementRef;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  url: any;
  file: File;
  output: any;
  uploadFileForm: FormGroup = new FormGroup({
    image: new FormControl('', [Validators.required]),
  });
  editFileForm: FormGroup;
  saveFileForm: FormGroup;

  onFileChange(e) {
    if (e.target.files.length > 0) {
      this.imageChangedEvent = event;
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        this.url = reader.result;
      };
    } else {
      this.url = null;
    }
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  onSubmit() {
    const imageBlob = this.dataURItoBlob(this.croppedImage);
    let file = new File([imageBlob], 'avatar.png');
    let fd = new FormData();
    fd.append('image', file);
    fd.append('uid', this._userService.getUserLogingIn().uid);
    console.log(fd.get('image'));
    this._userService.updateProfilePicture(fd).subscribe((resp) => {
      this.dialogRef.close();
    });
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  constructor(
    public dialogRef: MatDialogRef<UploadProfileComponent>, //@Optional() is used to prevent error if no data is passed
    private _userService: UserService
  ) {
    this.output = '';
  }

  ngOnInit(): void {}
}

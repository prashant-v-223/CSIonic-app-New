import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  NavController,
  Platform,
} from '@ionic/angular';
import {
  COPY,
  DocumentTypeEnum,
  DOCUMENT_LIST,
  VerifyTypeEnum,
} from 'src/app/shared/helper/const';
import {
  Camera,
  CameraDirection,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { AllowableExtensions } from 'src/app/shared/helper/allowableExtension';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Filesystem } from '@capacitor/filesystem';
import { UserService } from 'src/app/shared/services/user.service';
import { AndroidSettings, NativeSettings } from 'capacitor-native-settings';

interface LocalFile {
  name: string;
  path: string;
  base64: string;
  blob: Blob;
  sourceFile: any;
}

@Component({
  selector: 'app-id-verification',
  templateUrl: './id-verification.page.html',
  styleUrls: ['./id-verification.page.scss'],
})
export class IdVerificationPage implements OnInit {
  documentTypeEnum = DocumentTypeEnum;
  verifyTypeEnum = VerifyTypeEnum;

  subscriptions: any = {
    verifyType: '',
  };
  verifyType: string;

  CONSTANT: any = COPY;
  documentList = [];

  wrongAttachment: string = '';

  documentType: DocumentTypeEnum;
  attachments = {
    frontImage: {
      base64: null,
      blob: null,
      sourceFile: null,
    },
    backImage: {
      base64: null,
      blob: null,
      sourceFile: null,
    },
  };
  fileSelectionDestination = null;
  isValid: boolean = false;
  isSaving: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private allowableExtension: AllowableExtensions,
    private userService: UserService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private cdr: ChangeDetectorRef
  ) {
    this.subscriptions.verifyType = this.route.queryParams.subscribe((data) => {
      if (data && data.type) {
        this.verifyType = data.type;

        switch (this.verifyType) {
          case this.verifyTypeEnum.ID_VERIFY:
            this.documentType = this.documentTypeEnum.AADHAR_CARD;
            break;
          case this.verifyTypeEnum.PAN:
            this.documentType = this.documentTypeEnum.PAN;
            break;
        }
      }
    });
  }

  get documentDisplayName(): string {
    return this.documentType
      ? DOCUMENT_LIST.find((d) => d.value === this.documentType)?.label
      : '';
  }

  ngOnInit() {}

  checkPermission(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const permissionResult = await Filesystem.checkPermissions();

      if (!permissionResult?.publicStorage) reject();
      else if (permissionResult.publicStorage === 'granted') resolve(true);
      else if (
        permissionResult.publicStorage === 'prompt' ||
        permissionResult.publicStorage === 'prompt-with-rationale'
      ) {
        const permissionStatus = await Filesystem.requestPermissions();
        if (permissionStatus.publicStorage === 'granted') resolve(true);
      } else if (permissionResult.publicStorage === 'denied') {
        // show the message to open the app settings
        const accessInfoAlert = await this.alertCtrl.create({
          header: 'Permission denied',
          message: `To attach a photo <b>${this.CONSTANT.APP_NAME}</b> needs storage permissions for reading photo files`,
          buttons: [
            {
              text: 'Open settings',
              handler: () => {
                NativeSettings.openAndroid({
                  option: AndroidSettings.ApplicationDetails,
                });
              },
            },
            {
              text: 'Cancel',
              role: 'cancel',
            },
          ],
          backdropDismiss: false,
        });
        await accessInfoAlert.present();
        reject();
      }
    });
  }

  async getPhoto(page: 'frontPage' | 'backPage') {
    this.fileSelectionDestination =
      page === 'frontPage'
        ? this.attachments.frontImage
        : this.attachments.backImage;

    try {
      const hasPermission = await this.checkPermission();
      if (!hasPermission) return;

      let selectedSource: CameraSource = null;

      if (this.verifyType === this.verifyTypeEnum.SELFIE)
        selectedSource = CameraSource.Camera;
      else {
        const photoSourceActionSheet = await this.actionSheetCtrl.create({
          header: 'Select photo from',
          cssClass: 'custom-actionSheet',
          buttons: [
            {
              text: 'Gallery',
              icon: 'images',
              handler: () => {
                selectedSource = CameraSource.Photos;
              },
            },
            {
              text: 'Camera',
              icon: 'camera',
              handler: () => {
                selectedSource = CameraSource.Camera;
              },
            },
          ],
        });
        await photoSourceActionSheet.present();
        await photoSourceActionSheet.onDidDismiss();
      }

      if (!selectedSource) return;

      const image = await Camera.getPhoto({
        quality: 90,
        saveToGallery: false,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: selectedSource,
        direction:
          this.verifyType === this.verifyTypeEnum.SELFIE
            ? CameraDirection.Front
            : CameraDirection.Rear, // this does not work in Android
      });

      if (image) {
        this.fileSelectionDestination.sourceFile = image;
        this.setImage(image);
      }
    } catch (error) {
      console.log('Error file selection', error);
    }
  }

  // Create a new file from a capture image
  async setImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    this.fileSelectionDestination.base64 = base64Data;
    this.updateValidity();
    this.cdr.detectChanges();
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath);
    const blob = await response.blob();
    this.fileSelectionDestination.blob = blob;

    return (await this.convertBlobToBase64(blob)) as string;
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  browse(event, type) {
    const file = event.target.files[0];
    const extension = file.name.substring(file.name.lastIndexOf('.') + 1);
    const fileType = this.allowableExtension.getExtensionType(extension);
    this.wrongAttachment = '';
    if (fileType === 'image') {
      if (type === 'frontSide') {
        this.attachments.frontImage.sourceFile = file;
      } else {
        this.attachments.backImage.sourceFile = file;
      }
    } else {
      this.wrongAttachment = 'Upload only image file.';
    }
  }

  removePhoto($event, page: 'frontPage' | 'backPage') {
    $event.stopPropagation();
    const blankImage = {
      base64: null,
      blob: null,
      sourceFile: null,
    };
    page === 'frontPage'
      ? (this.attachments.frontImage = blankImage)
      : (this.attachments.backImage = blankImage);
    this.updateValidity();
  }

  onBack() {
    this.navCtrl.navigateBack('/kyc-document');
  }

  isBackPageRequired() {
    // as of now for all the documents back page is required
    return this.verifyType !== this.verifyTypeEnum.SELFIE;
    // (
    //   this.verifyType === this.verifyTypeEnum.ID_VERIFY &&
    //   this.documentType === this.documentTypeEnum.AADHAR_CARD
    // );
  }

  updateValidity() {
    this.isValid = Boolean(
      this.attachments.frontImage.blob &&
        (!this.isBackPageRequired() || this.attachments.backImage.blob) &&
        (this.verifyType === this.verifyTypeEnum.SELFIE ||
          this.verifyType === this.verifyTypeEnum.PAN ||
          this.documentType)
    );
  }

  async submit() {
    if (!this.isValid) return;

    const formData = new FormData();
    formData.append('type', this.documentType);

    if (this.verifyType === this.verifyTypeEnum.SELFIE)
      formData.append('selfie', this.attachments.frontImage.blob);
    else {
      formData.append('frontPage', this.attachments.frontImage.blob);
      formData.append('backPage', this.attachments.backImage.blob);
    }

    this.isSaving = true;
    try {
      if (this.verifyType === this.verifyTypeEnum.SELFIE)
        await this.userService.verifySelfie(formData);
      else await this.userService.verifyProof(formData);
      const userRes = await this.userService.getUser();
      this.userService.setUserToStorage(userRes.data);
      this.onBack();
    } catch (e) {
      const errorInfo = await this.alertCtrl.create({
        header: 'Verification unsuccessful',
        message: `There was some problem in verification process, please try again.`,
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
          },
        ],
      });
      await errorInfo.present();
    } finally {
      this.isSaving = false;
    }
  }

  ngOnDestroy() {
    for (const sub in this.subscriptions) {
      if (this.subscriptions[sub]) {
        this.subscriptions[sub].unsubscribe();
      }
    }
  }
}

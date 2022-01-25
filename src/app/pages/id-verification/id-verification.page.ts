import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { COPY } from 'src/app/shared/helper/const';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { AllowableExtensions } from 'src/app/shared/helper/allowableExtension';


@Component({
  selector: 'app-id-verification',
  templateUrl: './id-verification.page.html',
  styleUrls: ['./id-verification.page.scss'],
})
export class IdVerificationPage implements OnInit {

  subscriptions: any = {
    verifyType: ""
  };
  verifyType: string;
  CONSTANT: any = COPY;
  wrongAttachment: string = '';

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private allowableExtension: AllowableExtensions
  ) {
    this.subscriptions.verifyType = this.route.params.subscribe(data => {
      if (data && data.type) {
        this.verifyType = data.type;
      }
    });
  }

  ngOnInit() {
  }

  async onTakeSelfie() {

    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates);

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    let imageUrl = image.webPath;
    console.log("imageUrl", imageUrl);
  }

  browse(event, type) {
    console.log('event', type);
    const file = event.target.files[0];
    const extension = file.name.substring(file.name.lastIndexOf('.') + 1);
    const fileType = this.allowableExtension.getExtensionType(extension);
    this.wrongAttachment = '';
    if (fileType === 'image') {
      console.log('extension', extension);
    } else {
      this.wrongAttachment = 'Upload only image,pdf or doc file.';
    }
  }

  onBack() {
    this.navCtrl.navigateForward('/dashboard/kyc-document');
  }

  ngOnDestroy() {
    for (const sub in this.subscriptions) {
      if (this.subscriptions[sub]) {
        this.subscriptions[sub].unsubscribe();
      }
    }
  }
}

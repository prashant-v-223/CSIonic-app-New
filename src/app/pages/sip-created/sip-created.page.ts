import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

import { COPY } from 'src/app/shared/helper/const';
import { SIPService, SIPStatus } from 'src/app/shared/services/sip.service';
import { UserService } from 'src/app/shared/services/user.service';
import { PluginListenerHandle } from '@capacitor/core';
import { Screenshot } from 'capacitor-screenshot';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

declare var Digio: any;
@Component({
  selector: 'app-sip-created',
  templateUrl: './sip-created.page.html',
  styleUrls: ['./sip-created.page.scss'],
})
export class SipCreatedPage implements AfterViewInit {
  SIPStatus = SIPStatus;
  CONSTANT: any = COPY;
  user: any;
  @Output() coinList: any;
  @Output() packageList: any;

  @Input() newSIP;
  sipData: any = null;
  coins = [];
  screenShow: string = 'success';
  showLoader = false;
  mandateStatus: SIPStatus;
  isShowingMandateEsign = false;
  eSignURL = '';
  browserFinishHandler: PluginListenerHandle;


  constructor(
    private sipService: SIPService,
    private modalController: ModalController,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    this.user = this.userService.getUserFromStorage();
    this.sipData = this.sipService.getSIPData();
    this.coins = this.sipData.package.coins.map((coin) => coin.currencyId);
  }

  async ngAfterViewInit() {
    if (this.newSIP != '') {
      this.screenShow = 'success';
      this.updateMandateStatus();
      this.cdr.detectChanges();
    }
    else {
      this.screenShow = 'fail';
    }
  }

  updateMandateStatus() {
    // TODO: change this initialization when eSignining needs to enabled
    this.mandateStatus = SIPStatus.SIGNING_SUCCESS;
  }

  async initESign() {
    this.eSignURL = `https://ext.digio.in/#/gateway/login/${this.newSIP.mandate.id
      }/${Date.now()}/${this.user.email
      }?logo=https://prosppr.in/images/p-logo.svg`;

    this.isShowingMandateEsign = true;

    if (this.browserFinishHandler)
      this.browserFinishHandler.remove();

    this.browserFinishHandler = await Browser.addListener('browserFinished', async () => {
      const mandateDetails = await this.sipService.getMandateDetails(
        this.newSIP._id
      );
      if (
        [SIPStatus.SIGNING_SUCCESS, SIPStatus.SIGNING_FAILED].includes(
          mandateDetails?.data?.status
        ) &&
        this.mandateStatus !== mandateDetails?.data?.status
      ) {
        this.mandateStatus = mandateDetails.data.status;
        this.cdr.detectChanges();
      }
    });

    await Browser.open({ url: this.eSignURL });

    // -- using Digio SDK
    // const options = {
    //   callback: async (res) => {
    //     console.log('res: ', res);
    //     let statusChangeResult;
    //     const statusObj: any = {}
    //     if (res.error_code) {
    //       statusObj.status = SIPStatus.SIGNING_FAILED;
    //     } else {
    //       statusObj.status = SIPStatus.SIGNING_SUCCESS;
    //     }
    //     statusChangeResult = await this.sipService.changeSIPStatus(this.newSIP._id, statusObj);
    //     if (statusChangeResult?.status === this.CONSTANT.SUCCESS) {
    //       this.mandateStatus = statusObj.status === SIPStatus.SIGNING_FAILED ? SIPStatus.SIGNING_FAILED : SIPStatus.SIGNING_SUCCESS;
    //     }
    //   },
    //   logo: 'https://prosprr.in/images/p-logo.svg',
    //   is_iframe: true,
    //   dg_preferred_auth_type: 'debit'
    // }
    // const digio = new Digio(options);
    // digio.init();
    // digio.submit(
    //   this.newSIP.mandate.id, // mandate_id
    //   this.user.email // customer_identifier
    // );
  }

  /* handleFooterButtonClick() {
    if (this.mandateStatus === SIPStatus.SIGNING_SUCCESS)
      this.onBackHomeClick();
    else
      this.initESign();
  } */

  handleFooterButtonClick() {
    this.onBackHomeClick();
  }

  onBackHomeClick() {
    this.modalController.dismiss(null, '', 'SuccessModal');
  }

  shareSIP(){
    Screenshot.take().then(async (ret: { base64: string }) => {
        console.log(ret.base64); // or `data:image/png;base64,${ret.base64}`

        const writeSecretFile = await Filesystem.writeFile({
          path: 'prosppr/newSip.png',
          data: `data:image/png;base64,${ret.base64}`,
          directory: Directory.Documents,
        });
        await Share.share({
          title: 'Prosppr SIP',
          text: 'Hi I started '+this.sipData.package.name+' SIP',
          url: writeSecretFile.uri,
          dialogTitle: 'Prosppr',
        });
        //this.socialSharing.shareViaWhatsApp(this.text, writeSecretFile.uri, this.link)
    });
  }
}

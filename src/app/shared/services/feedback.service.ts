import { Injectable } from '@angular/core';
import { ApiCallService } from 'src/app/services/apis/api-call.service';
import { ApiConfiguration } from 'src/app/services/apis/configuration';

import { Auth } from 'aws-amplify';
import { NavController } from '@ionic/angular';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private api: ApiCallService,
    private apiConfig: ApiConfiguration,
    private navCtrl: NavController,
    private configurationService: ConfigurationService) { }

  async feedbackSubmit(questionAnswers: any) {
    try {
      const questionAnsData = { questionAns: questionAnswers };
      const responseData = await this.api.postData(this.apiConfig.feedback, questionAnsData);
      return responseData;
    }
    catch (e) {
      throw e;
    }

  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  isLoading: boolean = false;
  disabled : boolean = true;

  constructor(private feedbackService:FeedbackService) { }

  ngOnInit() {
  }

  feedbackForm = new FormGroup({
    question1: new FormControl('',[Validators.required]),
    question2: new FormControl('',[Validators.required]),
    question3: new FormControl('',[Validators.required]),
    question4: new FormControl('',[Validators.required]),
    question5: new FormControl('',[Validators.required]),
  });

  feedbackSubmit()
  {
    this.isLoading = true;
    var question1 = this.feedbackForm.controls['question1'].value;
    var question2 = this.feedbackForm.controls['question2'].value;
    var question3 = this.feedbackForm.controls['question3'].value;
    var question4 = this.feedbackForm.controls['question4'].value;
    var question5 = this.feedbackForm.controls['question5'].value;
    let questionAnsData = [{question:"Overall, How happy are you with the app",answer:question1},{question:"How easy (10 being the easiest) did you find starting you Crypto SIP using our app?",answer:question2},{question:"What did you like most about the app?",answer:question3},{question:"What are the 3 things you don't like about the app?",answer:question4},{question:"What did you like most about the app?",answer:question5}];

    this.feedbackService.feedbackSubmit(questionAnsData)
      .then((res) => {
      if (res.status =="SUCCESS")
      {
        this.isLoading = false;
        this.feedbackForm.reset();
      }
      else
      {
        console.error("Something went wrong");
        this.isLoading = false;
      }
    })
    .catch( async (error) => {
      console.error(error);
      this.isLoading = false;
    })
    .finally(() => {
      this.isLoading = false;
    });
  }

}

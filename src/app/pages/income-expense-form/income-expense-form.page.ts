import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { fontSizeEnterLeave } from 'src/app/shared/animations';
import { UtilService } from 'src/app/services/util.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-income-expense-form',
  templateUrl: './income-expense-form.page.html',
  styleUrls: ['./income-expense-form.page.scss'],
  animations: [
    fontSizeEnterLeave()
  ]
})
export class IncomeExpenseFormPage implements OnInit {

  incomeExpenseForm: FormGroup;
  incomeExpenseList = [
    { value: 'Expense', label: 'Expense' },
    { value: 'Income', label: 'Income' },
  ];
  typeList = [
    { value: 'One Time', label: 'One Time' },
    { value: 'Recurring', label: 'Recurring' }
  ];
  expenseCategoryList = [
    { value: 'Food', icon: 'star' },
    { value: 'Bills', icon: 'star' },
    { value: 'Transportation', icon: 'star' },
    { value: 'Car', icon: 'star' },
    { value: 'Entertainment', icon: 'star' },
    { value: 'Shopping', icon: 'star' },
    { value: 'Insurance', icon: 'star' },
    { value: 'Tax', icon: 'star' },
    { value: 'Telephone', icon: 'star' },
  ];
  incomeCategoryList = [
    { value: 'Salary', icon: 'star' },
    { value: 'Awards', icon: 'star' },
    { value: 'Grants', icon: 'star' },
    { value: 'Sale', icon: 'star' },
    { value: 'Rental', icon: 'star' },
    { value: 'Refunds', icon: 'star' },
    { value: 'Coupons', icon: 'star' },
    { value: 'Lottery', icon: 'star' },
    { value: 'Dividends', icon: 'star' },
  ];
  isSubmitionInitiated = false;

  categoryOverlay: HTMLIonActionSheetElement;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.initIncomeExpenseForm();
  }

  initIncomeExpenseForm(){
    this.incomeExpenseForm = new FormGroup({
      incomeOrExpense: new FormControl('Expense', [Validators.required]),
      type: new FormControl('One Time', [Validators.required]),
      date: new FormControl(new Date().toISOString(), [Validators.required]),
      category: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{0,2})?$')]),
      description: new FormControl('')
    });
  }

  async presentCategoryOverlay(){

    let itemList: any[] = [];
    if (this.incomeExpenseForm.get('incomeOrExpense').value === 'Income'){
      //buttons related to Income
      itemList = this.incomeCategoryList;
    } else {
      //buttons related to Expense
      itemList = this.expenseCategoryList;
    }

    let buttons: any[] = [];
    itemList.forEach(categoryItem => {
      buttons.push({
        icon: categoryItem.icon,
        text: categoryItem.value,
        cssClass: 'btn-category',
        handler: () => {
          console.log(`'${categoryItem.value}' selected`);
          this.incomeExpenseForm.get('category').patchValue(categoryItem.value);
        }
      });
    })

    this.categoryOverlay = await this.actionSheetCtrl.create({
      header: 'Select Category..',
      buttons
    });
    
    this.categoryOverlay.present();
    this.categoryOverlay.onDidDismiss().then(() => {
      this.categoryOverlay = null;
    })
  }
  
  incomeExpenseChanged($event){
    console.log('Here');
    this.incomeExpenseForm.get('category').patchValue('');
  }

  save(){
    this.isSubmitionInitiated = true;
    if (this.incomeExpenseForm.invalid) return;
    
    console.log('Valid');
  }

}

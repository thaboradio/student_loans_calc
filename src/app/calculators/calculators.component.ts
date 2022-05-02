import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Payment } from '../models/payment';

@Component({
  selector: 'app-calculators',
  templateUrl: './calculators.component.html',
  styleUrls: ['./calculators.component.css']
})

export class CalculatorsComponent implements OnInit {
  calculatorForm = new FormGroup({
    amount_borrowed: new FormControl(0),
    interest_rate: new FormControl(0),
    payment_term: new FormControl(0)
  })

  constructor() { }
  amt: number = 0;
  term: number = 0;
  rate: number = 0;
  repaymentObj = new Payment();
  

  ngOnInit(): void {
    this.amt = this.calculatorForm.controls['amount_borrowed'].value;
    this.rate = this.calculatorForm.controls['payment_term'].value;

  }

  setRangeValue(value: number) {
    this.term = value;
  }

  displayRepayment() {
    this.repaymentObj = this.calculateRepayment();
    
  } 
  validateForm(form: any){
    form.term = this.calculatorForm.controls['payment_term'].value;
    form.amount = this.calculatorForm.controls['amount_borrowed'].value;
    form.rate = this.calculatorForm.controls['interest_rate'].value;

    if((form.amount === undefined || form.amount === undefined) || (form.rate === 0 || form.rate === undefined) || (form.term === 0 || form.term === undefined)){
      alert('Fields cannot be empty');
    }
  }

  calculateRepayment() {
    this.validateForm(this.calculatorForm);
    let amount = this.calculatorForm.controls['amount_borrowed'].value;
    let rate = this.calculatorForm.controls['interest_rate'].value;
    let term = this.term;


    let rateFactor = rate / 100;
    let dailyRate = rateFactor / 365;
    let dailyRateRounded = parseFloat(dailyRate.toFixed(6));
    let dailyChargedInt = dailyRateRounded * amount;
    let monthlyChargedInt = parseFloat(dailyChargedInt.toFixed(2)) * 30;
    let calculatedTerm = this.setTermInMonths(term);
    let annualInt = monthlyChargedInt * calculatedTerm;
    let annualIntFloated = parseFloat(annualInt.toFixed(2));
    let totalAmountWithInterest: number = parseFloat(amount) + annualIntFloated;
 

    let repayObj = new Payment;
    repayObj = {
      TotalPlusInterest: totalAmountWithInterest,
      MonthlyInstallment: parseFloat((totalAmountWithInterest / calculatedTerm).toFixed(2)),
      TotalMonthlyInterest: monthlyChargedInt,
      TotalInterestPerAnnum:  annualIntFloated
    };
 
    return repayObj;
  }

  setTermInMonths(term: number) {
    return term * 12;
  }
}

export class Payment {
    TotalPlusInterest: number = 0;
    TotalMonthlyInterest: number = 0;
    TotalInterestPerAnnum: number = 0;
    MonthlyInstallment: number = 0;

    constructor() {
        this.TotalInterestPerAnnum = 0;
        this.TotalMonthlyInterest = 0;
        this.TotalPlusInterest = 0;
        this.MonthlyInstallment = 0;
    }
}

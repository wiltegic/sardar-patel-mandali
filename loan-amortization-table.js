angular.module('latApp', [])
  .controller('LoanAmortizationTableController', function() {
    var vm = this;
    vm.loanAmortTable=[];

    vm.calculate = function() {
        vm.loanAmortTable.length = 0; ;
        
        var principal=P=parseFloat(vm.amount);
        var periodicInterestRate=i=parseFloat(vm.interestRate)/100/12;
        var totalNumberOfPayments=n=parseInt(vm.numberOfMonths);

        // Formula to calculate payment 
        // https://en.wikipedia.org/wiki/Amortization_calculator
        var payment=P*(i+(i/(Math.pow(1+i,n)-1)));

        for (var i = 1; i <= totalNumberOfPayments; i++) {

          var interest=principal*periodicInterestRate;
          
          var principalPayment=payment-interest;
          
          principal=principal-principalPayment;

          var periodicPayment={
            paymentNumber:i,
            payment:payment.toFixed(2),
            principalPayment:principalPayment.toFixed(2),
            interest:interest.toFixed(2),
            principal:principal.toFixed(2)
          };

          vm.loanAmortTable.push(periodicPayment);
        };
    };
  });
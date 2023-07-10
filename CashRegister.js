function checkCashRegister(price, cash, cid) {
    let change;

    const changeDue = parseFloat(Math.abs(price - cash).toFixed(2));
    const registerTotal = cid.map(cash => cash[1])
    const cashInHand = parseFloat(registerTotal.reduce((a,b) => a+b).toFixed(2));

    const usDollarUnits = {
      "PENNY" : 0.01,
      "NICKEL" : 0.05,
      "DIME" : 0.10,
      "QUARTER" : 0.25,
      "DOLLAR" : 1,
      "FIVE" : 5,
      "TEN" : 10,
      "TWENTY" : 20,
      "ONE HUNDRED" : 100,
    }

    const registerTotals = {
      "PENNY" : cid[0][1],
      "NICKEL" : cid[1][1],
      "DIME" : cid[2][1],
      "QUARTER" : cid[3][1],
      "DOLLAR" : cid[4][1],
      "FIVE" : cid[5][1],
      "TEN" : cid[6][1],
      "TWENTY" : cid[7][1],
      "ONE HUNDRED" : cid[8][1],
    }


    if(changeDue > cashInHand) {
      return {status: "INSUFFICIENT_FUNDS", change: []};
    } else if (changeDue < cashInHand && registerTotals.NICKEL === 0 && registerTotals.DIME === 0 && registerTotals.QUARTER === 0 ) {
      return {status: "INSUFFICIENT_FUNDS", change: []};
    }else if (changeDue === cashInHand) {
      return {status: "CLOSED", change: cid}
    } else if(changeDue < 1 && changeDue % usDollarUnits.QUARTER == 0){
    const roundedChangeDue = parseFloat(changeDue)
    return {status: "OPEN", change: [["QUARTER", roundedChangeDue]]}
  } else if(changeDue < cashInHand) {

    const twentyCalc = Math.floor(changeDue/20);
    const availableTwenty = registerTotals.TWENTY/20
    const availableTwenties =
      availableTwenty < twentyCalc ? availableTwenty : twentyCalc;

    let balanceDue = changeDue;
    balanceDue = parseFloat((balanceDue).toFixed(2));

    const twentyValue = (availableTwenties * 20);
    balanceDue -= twentyValue;
    balanceDue = parseFloat((balanceDue).toFixed(2));

    const tenCalc = Math.floor(balanceDue / 10);
    const availableTen = registerTotals.TEN / 10;
    const availableTens =
      availableTen < tenCalc ? availableTen : tenCalc;

    const tenValue = (availableTens * 10);
    balanceDue -=  tenValue;
    balanceDue = parseFloat((balanceDue).toFixed(2));

    const fiveCalc = Math.floor(balanceDue / 5);
    const availableFive = registerTotals.FIVE / 5;
    const availableFives =
      availableFive < fiveCalc ? availableFive : fiveCalc;

    const fiveValue = (availableFives * 5);
    balanceDue -= fiveValue
    balanceDue = parseFloat((balanceDue).toFixed(2));

    const oneCalc = Math.floor(balanceDue / 1);
    const availableOne = registerTotals.DOLLAR / 1;
    const availableOnes =
      availableOne < oneCalc ? availableOne : oneCalc;

    const oneValue = (availableOnes * 1);
    balanceDue -= oneValue;
    balanceDue = parseFloat((balanceDue).toFixed(2));

  const quarterCalc = Math.floor(balanceDue / .25)
  const availableQuarter = registerTotals.QUARTER / .25;
  const availableQuarters =
    availableQuarter < quarterCalc ? availableQuarter : quarterCalc;

  const quarterValue = (availableQuarters * .25);
  balanceDue -= quarterValue;
  balanceDue = parseFloat((balanceDue).toFixed(2));

  const dimeCalc = Math.floor(balanceDue / .10);
  const availableDime = registerTotals.DIME / .10
  const availableDimes =
    availableDime < dimeCalc ? availableDime : dimeCalc;

  const dimeValue = (availableDimes * .10);
  balanceDue -= dimeValue ;
  balanceDue = parseFloat((balanceDue).toFixed(2));

  let nickelCalc;
  let availableNickel;
  let availableNickels;

  if ((balanceDue / usDollarUnits.NICKEL) < usDollarUnits.NICKEL) {
    console.log("Indivisible by Nickel, try by pennies")
    nickelCalc = (balanceDue / .05);
   availableNickel =  Math.round(registerTotals.NICKEL / .05);
   availableNickels =
    availableNickel < nickelCalc ? availableNickel : nickelCalc;
  }

  let pennyCalc;
  let availablePenny;
  let availablePennies;

  if((balanceDue >= usDollarUnits.PENNY)){
    pennyCalc = (balanceDue / .01);
    availablePenny = Math.round(registerTotals.PENNY / .01);
    availablePennies=
      availablePenny < pennyCalc ? availablePenny : pennyCalc;
  }
    const pennyValue = (availablePennies * .01);
    balanceDue -= pennyValue;

    if(balanceDue === 0) {

    change =  [["TWENTY", twentyValue], ["TEN", tenValue], ["FIVE", fiveValue], ["ONE", oneValue], ["QUARTER", quarterValue], ["DIME", dimeValue], ["PENNY", pennyValue]]

    return {status: "OPEN", change: change}
    }
    }
  }

  checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
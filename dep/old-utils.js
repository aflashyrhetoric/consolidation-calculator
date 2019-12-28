export function total(loans, prop) {
  return loans.reduce((a, v) => a + v[prop], 0)
}

export function calculateTotal(loan, consolidatedRate) {
  const INTEREST_RATE = consolidatedRate
    ? consolidatedRate
    : loan.interestRate / 100

  // Because of OoO, below doesn't need parenthesis
  return loan.bal + loan.bal * INTEREST_RATE
}

export function calculateTotalMultiple(
  loanSet,
  omittedLoanSet,
  consolidatedInterestRate,
) {
  const consolidatedTotal = loanSet.reduce(
    (a, v) => (a += calculateTotal(v, consolidatedInterestRate)),
    0,
  )

  if (omittedLoanSet.length === 0) {
    return consolidatedTotal
  }

  const unconsolidatedTotal = omittedLoanSet.reduce(
    (a, v) => (a += calculateTotal(v)),
    0,
  )
  return consolidatedTotal + unconsolidatedTotal
}

export function averageBal(loans) {
  return total(loans, 'bal') / arr.length
}

export function calculateConsolidatedInterestRate(loans) {
  // const totalBal = total(loans, 'bal')
  // console.log(totalBal)
  // const totalInterest = total(loans, 'interest')
  // console.log(totalInterest)
  // let rate = totalBal / totalInterest
  // rate = roundUpToNearestEigth(rate)
  // return rate


  const totalBal = total(loans, 'bal')
  // console.log(totalBal)
  const summationOfIndividualInterest = loans.reduce((acc, val) => {
    return acc += val.interest
  }, 0)
  let rate = summationOfIndividualInterest / totalBal
  rate = rate * 100
  rate = roundUpToNearestEigth(rate)
  rate = rate / 100
  return rate
}

function roundUpToNearestEigth(num) {
  const eighth = 0.125
  return Math.ceil(num / eighth) * eighth
}

export function calculateInterest(loan) {
  return loan.bal * (loan.interestRate / 100)
}

export function averageInterest(loans) {
  return total(loans, 'bal') / loans.length
}

export function calculateTotalInterest(loans) {
  return loans.reduce((acc, val) => {
    acc += val.bal * (val.interestRate / 100)
    return acc
  }, 0)
}

export function averageInterestRate(loans) {
  return total(loans, 'interestRate') / loans.length
}

export function log(loans) {
  console.log('there are', loans.length, 'loans')
  console.log(averageBal(loans))
  console.log(averageInterestRate(loans))
  console.log(loans)
}

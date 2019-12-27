export function total(loans, prop) {
  return loans.reduce((a, v) => a + v[prop], 0)
}

export function averageBal(loans) {
  return total(loans, 'bal') / arr.length
}

export function calculateConsolidatedInterestRate(loans) {
  const totalBal = total(loans, 'bal')
  const totalInterest = total(loans, 'interest')
  let rate = totalBal / totalInterest
  rate = roundUpToNearestEigth(rate)
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

export function calculateTotalMultiple(
  loanSet,
  omittedLoanSet = [],
  consolidatedInterestRate,
) {
  const consolidatedTotal = loanSet.reduce(
    (a, v) => (a += calculateTotal(v)),
    0,
  )
  if (!omittedLoanSet) {
    return consolidatedTotal
  }

  const unconsolidatedTotal = omittedLoanSet.reduce(
    (a, v) => (a += calculateTotal(v)),
    0,
  )
  return consolidatedTotal + unconsolidatedTotal
}

export function calculateTotal(loan, consolidatedRate) {
  if (consolidatedRate) {
    return loan.bal + loan.bal * (consolidatedRate)
  }
  // const totalBalance = total(loans, 'bal')
  return loan.bal + loan.bal * (loan.interestRate / 100)
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

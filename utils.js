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

export function calculateConsolidatedInterestRate(loans) {
  const totalBal = total(loans, 'bal')
  // console.log(totalBal)
  const summationOfIndividualInterest = loans.reduce((acc, val) => {
    return (acc += val.interest)
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

export function log(loans) {
  console.log('there are', loans.length, 'loans')
  console.log(averageInterestRate(loans))
  console.log(loans)
}

export function logIters(loans, omitted, total, best = false) {
  console.log('if you consolidate these:', ...loans.map((o) => o.bal))
  console.log('and leave these:', ...omitted.map((o) => o.bal))
  console.log('the total would be', total, '\n')
  // console.log('consolidated interest rate is:', consolidatedInterestRate)
  if (best) {
    console.log('\t\t\t\t^^^NEW BEST FOUND')
  }
}
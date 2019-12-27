import loans from './loans.js'
import {
  averageBal,
  total,
  calculateTotalMultiple,
  averageInterestRate,
  averageInterest,
  calculateInterest,
  calculateTotalInterest,
  log,
  calculateConsolidatedInterestRate,
} from './utils.js'

function setComputedValues(loans) {
  const AIR = averageInterestRate(loans)
  const AI = averageInterest(loans)

  loans = loans.map((loan) => {
    loan.interest = calculateInterest(loan)
    loan.deviationInterestRate = loan.interestRate - AIR
    loan.deviationInterest = loan.interest - AI
    return loan
  })
  return loans
}

function main() {
  const l = setComputedValues(loans)
  let loanData = {}
  loanData.averageInterestRate = averageInterestRate(loans)
  loanData.averageInterest = averageInterest(loans)
  loanData.consolidatedInterestRate = calculateConsolidatedInterestRate(loans)

  let best = {
    total: calculateTotalMultiple(loans),
    loans,
    omittedLoans: [],
  }

  best = findBestSet(loans, [], best)

  console.log(best)
}

function findBestSet(
  loans,
  omitted,
  best,
  consolidatedInterestRate = calculateConsolidatedInterestRate(loans),
) {
  const total = calculateTotalMultiple(loans, omitted, consolidatedInterestRate)
  console.log('consolidated set:', ...loans.map((o) => o.bal))
  console.log('omitted set:', ...omitted.map((o) => o.bal))
  console.log('total is', total, '\n\n\n')
  if (total < calculateTotalMultiple(best.loans)) {
    best.total = total
    best.omitted = omitted
    best.loans = loans
  }
  if (loans.length == 1) {
    return best
  } else {
    omitted.push(loans.pop())
    return findBestSet(loans, omitted, best)
  }
}

main()

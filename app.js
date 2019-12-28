import { loans as rawLoanData } from './loans.js'
import {
  calculateTotalMultiple,
  calculateInterest,
  calculateConsolidatedInterestRate,
  logIters,
} from './utils.js'

function setComputedValues(loans) {
  // const AIR = averageInterestRate(loans)
  // const AI = averageInterest(loans)

  loans = loans.map((loan) => {
    loan.interest = calculateInterest(loan)
    // loan.deviationInterestRate = loan.interestRate - AIR
    // loan.deviationInterest = loan.interest - AI
    return loan
  })
  return loans
}

function main() {
  let loans = setComputedValues(rawLoanData)
  let loanData = {}
  loanData.consolidatedInterestRate = calculateConsolidatedInterestRate(loans)

  // Set initial 'best'
  let best = {
    total: calculateTotalMultiple(loans, [], loanData.consolidatedInterestRate),
    loans,
    omittedLoans: [],
  }

  console.log(`
    If you consolidate all, your total would be: ${best.total}
    If you don't consolidate anything, your total would be: ${calculateTotalMultiple(
      [],
      loans,
      loanData.consolidatedInterestRate,
    )}
  `)

  // Iteratively check every single ORDERING
  for (let val of loans) {
    best = findBestSet(loans, [], best)
    loans.push(loans.shift())
  }

  console.log(`
    To get the lowest total, consolidate these loans: ${best.loans.map(
      (l) => `${l.bal}`,
    )}
    And leave these: ${best.omittedLoans.map((v) => v.bal)}
    For a total of: ${best.total}
  `)
}

function findBestSet(
  loans,
  omitted,
  best,
  consolidatedInterestRate = calculateConsolidatedInterestRate(loans),
) {
  if (loans.length == 0) {
    return best
  }

  loans = [...loans]

  const total = calculateTotalMultiple(loans, omitted, consolidatedInterestRate)

  if (total < best.total) {
    best.loans = loans
    best.omittedLoans = omitted
    best.total = total
    return findBestSet(loans, omitted, best)
  }

  logIters(loans, omitted, total)

  omitted.push(loans.pop())
  return findBestSet(loans, omitted, best)
}

main()

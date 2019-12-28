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
    loans,
    omittedLoans: [],
    total: calculateTotalMultiple(loans, [], loanData.consolidatedInterestRate),
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
    const tempLoans = [...loans]
    best = findBestSet(tempLoans, [], best)
    loans.push(loans.shift())
  }

  best.loans.push(best.omittedLoans.pop())

  console.log(`
    Total possibilities: ${loans.length * (loans.length - 1)}
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
  if (loans.length == 1) {
    console.log("Exhausted current order, resuming with next...\n\n\n")
    return best
  }
  const total = calculateTotalMultiple(loans, omitted, consolidatedInterestRate)
  if (total < best.total) {
    best = {
      loans,
      omittedLoans: omitted,
      total: total,
    }
  }

  logIters(loans, omitted, total, total < best.total)

  omitted.push(loans.pop())
  return findBestSet([...loans], [...omitted], { ...best })
}

main()

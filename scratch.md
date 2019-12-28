```js
  console.log('if you consolidate these:', ...loans.map((o) => o.bal))
  console.log('and leave these:', ...omitted.map((o) => o.bal))
  console.log('the total would be', total, '\n\n')
  console.log('consolidated interest rate is:', consolidatedInterestRate)
```
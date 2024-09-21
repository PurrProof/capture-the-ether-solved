# Capture The Ethers game solutions with Hardhat/Typescript/Mocha.js/Ethers

Thank you [@smarx](https://twitter.com/smarx) for the [game](https://capturetheether.com/).

## Quickstart

```shell
git clone https://github.com/PurrProof/capture-the-ethers-solved.git
cd capture-the-ethers-solved
cp .env.example .env
pnpm it
```

## Useful snippets

```
const prov = new _ethers.providers.Web3Provider(window.ethereum);
await prov.getStorageAt(await contract.address,2)
sol2uml storage -d -u $RPC_NODE_URL -c Privacy -s $PRIVACY_INSTANCE_ADDRESS -o storage.svg ./Privacy.sol
cast send -i -r $RPC_NODE_URL --create $BYTECODE
cast call -i -r $RPC_NODE_URL $ADDRESS $FUNCTION_ID
```

## Solutions

### 0. Warmup -> [Deploy](https://capturetheether.com/challenges/warmup/deploy/)

- level: [contract](contracts/warmup/Deploy.sol)
- solution: [test](test/00-deploy.ts)

### 1. Warmup -> [Call me](https://capturetheether.com/challenges/warmup/call-me/)

- level: [contract](contracts/warmup/CallMe.sol)
- solution: [test](test/01-callme.ts)

### 2. Warmup -> [Choose a nickname](https://capturetheether.com/challenges/warmup/nickname/)

- level: [contract](contracts/warmup/Nickname.sol)
- solution: [test](test/02-nickname.ts)

### 3. Lotteries -> [Guess the number](https://capturetheether.com/challenges/lotteries/guess-the-number/)

- level: [contract](contracts/lotteries/GuessTheNumber.sol)
- solution: [test](test/03-guess-the-number.ts)

### 4. Lotteries -> [Guess the secret number](https://capturetheether.com/challenges/lotteries/guess-the-secret-number/)

- level: [contract](contracts/lotteries/GuessTheSecretNumber.sol)
- solution: [test](test/04-guess-the-secret-number.ts)

### 5. Lotteries -> [Guess the random number](https://capturetheether.com/challenges/lotteries/guess-the-random-number/)

- level: [contract](contracts/lotteries/GuessTheRandomNumber.sol)
- solution: [test](test/05-guess-the-random-number.ts)

### 6. Lotteries -> [Guess the new number](https://capturetheether.com/challenges/lotteries/guess-the-new-number/)

- level: [contract](contracts/lotteries/GuessTheNewNumber.sol)
- solution: [contract](contracts/lotteries/GuessTheNewNumberSolution.sol), [test](test/06-guess-the-new-number.ts)

### 7. Lotteries -> [Predict the future](https://capturetheether.com/challenges/lotteries/predict-the-future/)

- level: [contract](contracts/lotteries/PredictTheFuture.sol)
- solution: [contract](contracts/lotteries/PredictTheFutureSolution.sol), [test](test/07-predict-the-future.ts)

### 8. Lotteries -> [Predict the block hash](https://capturetheether.com/challenges/lotteries/predict-the-block-hash/)

- level: [contract](contracts/lotteries/PredictTheBlockHash.sol)
- solution: [test](test/08-predict-the-block-hash.ts)

### 9. Math -> [Token Sale](https://capturetheether.com/challenges/math/token-sale/)

- level: [contract](contracts/math/TokenSale.sol)
- solution: [test](test/09-token-sale.ts)

### 10. Math -> [Token Whale](https://capturetheether.com/challenges/math/token-whale/)

- level: [contract](contracts/math/TokenWhale.sol)
- solution: [test](test/10-token-whale.ts)

### 11. Math -> [Retirement Fund](https://capturetheether.com/challenges/math/retirement-fund/)

- level: [contract](contracts/math/RetirementFund.sol)
- solution: [contract](contracts/math/RetirementFundAttack.sol), [test](test/11-retirement-fund.ts)

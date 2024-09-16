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

### 0. Warmup -> Deploy [Level](https://capturetheether.com/challenges/warmup/deploy/),

- [contract](contracts/warmup/Deploy.sol)
- [solution](test/00-deploy.ts)

### 1. Warmup -> Call me [Level](https://capturetheether.com/challenges/warmup/call-me/)

- [contract](contracts/warmup/CallMe.sol)
- [solution](test/01-callme.ts)

### 2. Warmup -> Choose a nickname [Level](https://capturetheether.com/challenges/warmup/nickname/)

- [contract](contracts/warmup/Nickname.sol)
- [solution](test/02-nickname.ts)

### 3. Lotteries -> Guess the number [Level](https://capturetheether.com/challenges/lotteries/guess-the-number/)

- [contract](contracts/lotteries/GuessTheNumber.sol)
- [solution](test/03-guess-the-number.ts)

### 4. Lotteries -> Guess the secret number [Level](https://capturetheether.com/challenges/lotteries/guess-the-secret-number/)

- [contract](contracts/lotteries/GuessTheSecretNumber.sol)
- [solution](test/04-guess-the-secret-number.ts)

### 5. Lotteries -> Guess the random number [Level](https://capturetheether.com/challenges/lotteries/guess-the-random-number/)

- [contract](contracts/lotteries/GuessTheRandomNumber.sol)
- [solution](test/05-guess-the-random-number.ts)

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

### 0. Warmup -> Deploy [Level](https://capturetheether.com/challenges/warmup/deploy/), solution: [test](test/00-deploy.ts)

### 1. Warmup -> Call me [Level](https://capturetheether.com/challenges/warmup/call-me/), solution: [test](test/01-callme.ts)

### 2. Warmup -> Choose a nickname [Level](https://capturetheether.com/challenges/warmup/nickname/), solution: [test](test/02-nickname.ts)

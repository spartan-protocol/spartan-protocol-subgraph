## Each Deploy

`yarn codegen`
`yarn build`
`yarn deploy`

## Debug problems locally

Debugging can be difficult and mostly extremely time consuming as you need to wait hours/days/weeks for the new deploy to sync just to see if you actually fixed the problem or not.

The following steps will allow you to fork a current live deploy from the block before it started having problems and then with a local deploy (starting from this 'last synced block' so you wont have to wait for any sync) you can troubleshoot without the usual wait time.

1. Start a local graph node with the fork-base option set to: https://api.thegraph.com/subgraphs/id/, to allow you to fork a subgraph from the HostedService. Follow the steps here including the required dependencies: https://github.com/graphprotocol/graph-node#running-a-local-graph-node

Then:
`cargo run -p graph-node --release -- \`
`--postgres-url postgresql://USERNAME[:PASSWORD]@localhost:5432/graph-node \`
`--ethereum-rpc NETWORK_NAME:[CAPABILITIES]:URL \`
`--ipfs 127.0.0.1:5001`
`--fork-base https://api.thegraph.com/subgraphs/id/`

ie: `cargo run -p graph-node --release -- --postgres-url postgresql://postgres:MyPassword123@localhost:5432/graph-node --ethereum-rpc bsc:https://bsc-dataseed.binance.org/ --ipfs 127.0.0.1:5001 --fork-base https://api.thegraph.com/subgraphs/id/`

2. Make changes to your subgraph to try fix the problem

3. Change the `startBlock` for each data source in `subgraph.yaml` to the problematic block

4. Deploy the forked subgraph locally
`graph deploy <subgraph-name> --debug-fork <subgraph-id> --ipfs http://localhost:5001 --node http://localhost:8020`
`<subgraph-name>` should be consistent per deploy of the same project
`<subgraph-id>` should change per each modified deploy
An example: `graph deploy spartan-protocol/pool-factory --debug-fork QmekrGD5Am9AKr3vapjrWrdfMNZrhcdZRGyUxRoV81pzpJ --ipfs http://localhost:5001 --node http://localhost:8020`

5. Inspect logs, debug/troubleshoot. If the problem is fixed, change the `startBlock` for each data source in `subgraph.yaml` back to their previous values and re-deploy to hosted:
`yarn codegen`
`yarn build`
`yarn deploy`

If the problem however is not fixed, start back at step #2
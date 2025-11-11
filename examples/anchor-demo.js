// examples/anchor-demo.js
// Usage: node examples/anchor-demo.js --endpoint ws://127.0.0.1:9944 --seed //Alice
// Install: npm install @polkadot/api @polkadot/util-crypto commander dotenv

const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const { blake2AsHex } = require('@polkadot/util-crypto');
const { Command } = require('commander');
require('dotenv').config();

const program = new Command();
program
  .option('-e, --endpoint <endpoint>', 'WebSocket endpoint', process.env.POLKADOT_ENDPOINT || 'ws://127.0.0.1:9944')
  .option('-s, --seed <seed>', 'Account seed (e.g. //Alice)', process.env.POLKADOT_SEED || '//Alice')
  .option('-d, --data <data>', 'Data to anchor (string)', 'demo-root-' + Date.now())
  .parse(process.argv);

async function main() {
  const opts = program.opts();
  const provider = new WsProvider(opts.endpoint);
  const api = await ApiPromise.create({ provider });

  console.log('Connected to', opts.endpoint);

  const keyring = new Keyring({ type: 'sr25519' });
  const signer = keyring.addFromUri(opts.seed);

  // Example: compute a simple root placeholder (hash the data). Replace with your Merkle root.
  const data = opts.data;
  const root = blake2AsHex(data);

  console.log('Anchoring data:', data);
  console.log('Root (blake2):', root);

  // Adjust this to match your runtime pallet and call name.
  // Inspect api.tx in a node REPL or the runtime to confirm the correct pallet & call.
  // Common examples: api.tx.palletRootAnchoring.anchorRoot(root) or api.tx.rootAnchoring.anchor(root)
  let palletCall = null;

  if (api.tx.palletRootAnchoring && api.tx.palletRootAnchoring.anchorRoot) {
    palletCall = api.tx.palletRootAnchoring.anchorRoot(root);
  } else if (api.tx.rootAnchoring && api.tx.rootAnchoring.anchor) {
    palletCall = api.tx.rootAnchoring.anchor(root);
  } else {
    console.error('Could not find expected extrinsic on api.tx. Available sections:');
    console.log(Object.keys(api.tx).join(', '));
    await api.disconnect();
    process.exit(1);
  }

  console.log('Sending extrinsic from', signer.address);
  const unsub = await palletCall.signAndSend(signer, ({ status, events, txHash }) => {
    console.log('Tx hash:', txHash.toHex());
    if (status.isInBlock) {
      console.log('Included in block', status.asInBlock.toHex());
      events.forEach(({ event: { data, method, section } }) => {
        console.log(`Event: ${section}.${method} ${data.map(d => d.toString()).join(', ')}`);
      });
      unsub();
      api.disconnect();
    } else if (status.isFinalized) {
      console.log('Finalized in block', status.asFinalized.toHex());
    } else {
      console.log('Status:', status.type);
    }
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

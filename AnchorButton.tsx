import React, { useState } from "react";
import { web3Enable, web3Accounts, web3FromAddress } from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";

export default function AnchorButton({ rootHex }: { rootHex: string }) {
  const [status, setStatus] = useState<string>("");

  async function anchorToWestend() {
    try {
      setStatus("Enabling extension...");
      const extensions = await web3Enable("zk-presence-protocol");
      if (!extensions.length) throw new Error("No polkadot extension found");

      setStatus("Fetching accounts...");
      const accounts = await web3Accounts();
      if (!accounts.length) throw new Error("No accounts available from extension");

      const account = accounts[0];
      setStatus(`Using account ${account.address}`);

      setStatus("Connecting to Westend...");
      const ws = new WsProvider("wss://westend-rpc.polkadot.io");
      const api = await ApiPromise.create({ provider: ws });

      // If you have a custom pallet, replace with correct call e.g. api.tx.anchorPallet.storeRoot(rootHex)
      // Here we send a minimal balances.transfer as a proof-of-concept (optional)
      // Example for custom pallet:
      // const tx = api.tx.anchorPallet.storeRoot(rootHex);

      // Example: store root as remark (if you don't have a pallet) — will create an extrinsic visible on-chain
      const remarkCall = api.tx.system.remark(rootHex);

      setStatus("Getting injector for signing...");
      const injector = await web3FromAddress(account.address);

      setStatus("Signing and sending...");
      const unsub = await remarkCall.signAndSend(account.address, { signer: injector.signer }, ({ status, dispatchError, txHash }) => {
        if (status.isInBlock) setStatus(`In block: ${status.asInBlock.toHex()} txHash: ${txHash.toHex()}`);
        if (status.isFinalized) {
          setStatus(`Finalized in block: ${status.asFinalized.toHex()} txHash: ${txHash.toHex()}`);
          unsub();
        }
        if (dispatchError) {
          const err = dispatchError.toString();
          setStatus(`Dispatch error: ${err}`);
          unsub();
        }
      });
    } catch (e: any) {
      setStatus(`Error: ${e.message || e.toString()}`);
    }
  }

  return (
    <div>
      <button onClick={anchorToWestend} className="btn">
        Anchor root to Westend
      </button>
      <div style={{ marginTop: 8, fontSize: 13 }}>{status}</div>
    </div>
  );
}

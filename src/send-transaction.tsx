import * as React from "react";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

const abi = [
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      { name: "id", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
];

export function SendTransaction() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const tokenId = formData.get("tokenId") as string;
    const tokenAddress = formData.get("tokenAddress") as string;

    writeContract({
      address: tokenAddress as `0x${string}`,
      abi,
      functionName: "approve",
      args: ["0xd5059E02B252c92a8AdF70a7Bd23871fbf7789f2", BigInt(tokenId)],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return (
    <form onSubmit={submit} className="form-container">
      <div className="form-group">
        <label htmlFor="tokenAddress">Token Address</label>
        <input id="tokenAddress" className="input-box" name="tokenAddress" placeholder="0xA0Cf…251e" required />
      </div>
      <div className="form-group">
        <label htmlFor="tokenId">Token ID</label>
        <input id="tokenId" className="input-box" name="tokenId" placeholder="1" required />
      </div>
      <button className="test-button" disabled={isPending} type="submit">
        {isPending ? "Confirming..." : "Test OAL"}
      </button>
      <br />
      {isConfirming && (
        <div>
          Waiting for confirmation...
          {hash && (
            <a target="_blank" href={`https://explorer.testnet.immutable.com/tx/${hash}`}>
              link
            </a>
          )}
        </div>
      )}{" "}
      {isConfirmed && (
        <div>
          OAL not implemented...
          {hash && (
            <a target="_blank" href={`https://explorer.testnet.immutable.com/tx/${hash}`}>
              link
            </a>
          )}
        </div>
      )}{" "}
      <br />
      {error && <div>{(error as BaseError).shortMessage && (error as BaseError).shortMessage.includes("0x8371ab02") ? "OAL is implemented...approval failed." : (error as BaseError).shortMessage || error.message}</div>}
    </form>
  );
}

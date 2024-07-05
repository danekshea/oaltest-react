import * as React from "react";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { abi } from "./abi";

export function SendTransaction() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const tokenId = formData.get("tokenId") as string;
    writeContract({
      address: "0xd5059E02B252c92a8AdF70a7Bd23871fbf7789f2",
      abi,
      functionName: "mint",
      args: [BigInt(tokenId)],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button disabled={isPending} type="submit">
        {isPending ? "Confirming..." : "Mint"}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && <div>Error: {(error as BaseError).shortMessage || error.message}</div>}
    </form>
  );
}

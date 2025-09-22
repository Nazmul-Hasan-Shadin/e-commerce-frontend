"use client";
// app/(withCommonLayout)/success-payment/[tran_id]/page.tsx
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess({
  params,
}: {
  params: { tran_id: string; val_id: string };
}) {
  return (
    <div>
      <h1>Payment Success 🎉</h1>

      <p>Transaction ID: </p>
      <p>Transaction ID: </p>
    </div>
  );
}

"use client";

import { numberToWordsLt} from "@/utils/numberToWords";

export default function TotalsBlock({ subTotal, vat, totalWithVat }) {
    return (
      <>
        <div className="text-right font-semibold">
          <p>Summa: {subTotal.toFixed(2)}</p>
          <p>PVN 21%: {vat.toFixed(2)}</p>
          <p>Kopā ar PVN: {totalWithVat.toFixed(2)}</p>
        </div>
  
        <div className="text-right font-semibold mt-2">
          <span>Summa vārdiem: </span>
          {numberToWordsLt(totalWithVat)}
        </div>
      </>
    );
  }
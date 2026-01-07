"use client";

export default function PaymentTypeSelect () {
    return(
    <div className="mb-6 flex items-center justify-center gap-4">
        <label className="font-semibold mr-2">Apmaksas veids:</label>
        <select className="border p-2 rounded">
          <option value="pārskaitījums">pārskaitījums</option>
        </select>
    </div>
    )
}
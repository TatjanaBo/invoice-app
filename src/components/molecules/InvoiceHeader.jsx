"use client";

export default function InvoiceHeader({
  invoiceNumber,
  setInvoiceNumber,
  invoiceDate,
  setInvoiceDate,
}) {
  return (
    <>
      <div className="flex items-center justify-center mb-6 gap-4">
        <div>
          {/* Rēķina nr. */}
          <h1 className="text-2xl font-bold">Rēķins Nr.</h1>
        </div>

        <div>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="border p-2 rounded mt-1 text-center"
          />
        </div>
      </div>

      {/* Datums */}
      <div className="flex justify-between mb-6">
        <div>
          <label className="block font-semibold">Datums</label>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className="border p-2 rounded mt-1"
          />
        </div>
      </div>
    </>
  );
}

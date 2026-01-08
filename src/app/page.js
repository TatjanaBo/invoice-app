"use client";

import { useState } from "react";
import InvoiceHeader from "@/components/molecules/InvoiceHeader";
import CompanyForm from "@/components/organisms/CompanyForm";
import PaymentTypeSelect from "@/components/molecules/PaymentTypeSelect";
import ItemsTable from "@/components/organisms/ItemsTable";
import TotalsBlock from "@/components/molecules/TotalsBlock";
import SignerBlock from "@/components/molecules/SignerBlock";
import NotesBlock from "@/components/molecules/NotesBlock";
import { exportPDFtoFile } from "@/utils/pdf/exportPDF";

const initialCompany = {
  name: "",
  regNum: "",
  address: "",
  vatNum: "",
  bankName: "",
  account: "",
  swift: "",
};

const initialItem = { name: "", unit: "", quantity: 0, price: 0, total: 0 };

export default function Home() {

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [issuer, setIssuer] = useState(initialCompany);
  const [receiver, setReceiver] = useState(initialCompany);
  const [items, setItems] = useState([initialItem]);
  const [issuerName, setIssuerName] = useState("");
  const [note, setNote] = useState("");

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === "quantity" || field === "price" ? Number(value) : value;
    newItems[index].total = newItems[index].quantity * newItems[index].price;
    setItems(newItems);
  };

  const addItem = () => {
    setItems((prev) => [...prev, { ...initialItem }])
  };

  const removeItem = (indexToRemove) => {
    setItems((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const subTotal = items.reduce((acc, item) => acc + item.total, 0);
  const vat = subTotal * 0.21; // 21%
  const totalWithVat = subTotal + vat;

  const hasValidItems = items.some(
    (item) =>
      item.name &&
      item.quantity > 0 &&
      item.price > 0
  );

  const handleExportPdf = () => {
    exportPDFtoFile({
      invoiceNumber,
      invoiceDate,
      issuer,
      receiver,
      items,
      subTotal,
      vat,
      totalWithVat,
      issuerName,
      note,
    });
  };

  return (
    <main className="p-8">
      {/* Reķina galvene */}
          <InvoiceHeader
            invoiceNumber={invoiceNumber}
            setInvoiceNumber={setInvoiceNumber}
            invoiceDate={invoiceDate}
            setInvoiceDate={setInvoiceDate}
          />

      {/* Pakalpojuma sniedzēja info */}
      <CompanyForm title={"Pakalpojuma sniedzējs"} data={issuer} onChange={setIssuer} />

      {/* Pakalpojuma saņēmēja info */}
      <CompanyForm title={"Pаkalpojuma saņēmējs"} data={receiver} onChange={setReceiver} />
     
      {/* Apmaksas veids */}
      <PaymentTypeSelect />

      {/* Pakalpojumu tabula */}
      <div className="mb-6">
        <ItemsTable 
            items={items} 
            handleItemChange={handleItemChange} 
            removeItem={removeItem} 
            />

            <button
            onClick={addItem}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4 mt-4"
            >
              Pievienot pakalpojumu
            </button>

      {/* Kopsummas */}
      <TotalsBlock subTotal={subTotal}  vat={vat} totalWithVat={totalWithVat} />


      {/* Izsniedzējs */}
      <SignerBlock issuerName={issuerName} setIssuerName={setIssuerName} />

      {/* Piezīmes */}
      <NotesBlock note={note} setNote={setNote} />

            <button
              type="button"
              onClick={handleExportPdf}
              disabled={!hasValidItems}
              className={`px-4 py-2 rounded mt-6 text-white ${
                hasValidItems
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Saglabāt PDF
            </button>
   </div>
</main>
  );
}
"use client";

import { useState, useEffect } from "react";
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

const COMPANIES_STORAGE_KEY = "invoice_app_companies_v1";


const initialItem = { name: "", unit: "", quantity: 0, price: 0, total: 0 };

export default function Home() {

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [issuer, setIssuer] = useState(initialCompany);
  const [receiver, setReceiver] = useState(initialCompany);
  const [items, setItems] = useState([initialItem]);
  const [issuerName, setIssuerName] = useState("");
  const [note, setNote] = useState("");
  const [companies, setCompanies] = useState([]);

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

  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const stored = window.localStorage.getItem(COMPANIES_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCompanies(parsed);
        }
      } catch (e) {
        console.error("Failed to parse companies from localStorage", e);
      }
    }
  }, []);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      COMPANIES_STORAGE_KEY,
      JSON.stringify(companies)
    );
  }, [companies]);
  
  const saveCompany = (companyData) => {
    if (!companyData?.name) return; // nesaglabā bez nosaukuma
  
    setCompanies((prev) => {
      const existingIndex = prev.findIndex(
        (c) =>
          c.name.toLowerCase() === companyData.name.toLowerCase() &&
          (c.regNum || "") === (companyData.regNum || "")
      );
  
      const newEntry = {
        ...companyData,
        id:
          existingIndex >= 0
            ? prev[existingIndex].id
            : (globalThis.crypto?.randomUUID?.() ?? String(Date.now())),
      };
  
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = newEntry;
        return copy;
      }
  
      return [...prev, newEntry];
    });
  };
  
  const handleSelectIssuerCompany = (company) => {
    if (!company) return;
    setIssuer({
      name: company.name || "",
      regNum: company.regNum || "",
      address: company.address || "",
      vatNum: company.vatNum || "",
      bankName: company.bankName || "",
      account: company.account || "",
      swift: company.swift || "",
    });
  };
  
  const handleSelectReceiverCompany = (company) => {
    if (!company) return;
    setReceiver({
      name: company.name || "",
      regNum: company.regNum || "",
      address: company.address || "",
      vatNum: company.vatNum || "",
      bankName: company.bankName || "",
      account: company.account || "",
      swift: company.swift || "",
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
      <CompanyForm
        title={"Pakalpojuma sniedzējs"}
        data={issuer}
        onChange={setIssuer}
        companies={companies}
        onSelectCompany={handleSelectIssuerCompany}
        onSaveCompany={saveCompany}
         />

      {/* Pakalpojuma saņēmēja info */}
      <CompanyForm
       title={"Pаkalpojuma saņēmējs"} 
       data={receiver}
       onChange={setReceiver} 
       companies={companies}
       onSelectCompany={handleSelectReceiverCompany}
       onSaveCompany={saveCompany}
        />
     
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
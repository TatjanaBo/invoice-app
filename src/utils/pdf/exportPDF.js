import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { numberToWordsLt } from "../numberToWords";
import { robotoFont } from "./fonts/robotoFont";
import { robotoBoldFont } from "./fonts/robotoBoldFont";
import { robotoLightFont } from "./fonts/robotoLightFont";
import { companyFieldLabelsLv } from "../labels";

const drawLabeledText = (doc, label, value, x, y) => {
    const labelText = `${label}: `;
  
    doc.setFont("Roboto", "bold");
    doc.text(labelText, x, y);
  
    const labelWidth = doc.getTextWidth(labelText);
  
    doc.setFont("Roboto", "normal");
    doc.text(value, x + labelWidth, y);
  };
  
//   const validItems = items.filter(
//     (item) =>
//       item.name &&
//       item.quantity > 0 &&
//       item.price > 0
//   );
  
 export const exportPDFtoFile = ({  invoiceNumber,
    invoiceDate,
    issuer,
    receiver,
    items,
    subTotal,
    vat,
    totalWithVat,
    issuerName,
    note,}) => {
        console.log("EXPORT PDF called");
    const doc = new jsPDF();
    // fonta reģistrācija
      doc.addFileToVFS("Roboto-Regular.ttf", robotoLightFont);
      doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");

      doc.addFileToVFS("Roboto-Bold.ttf", robotoBoldFont);
      doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");

      doc.setFont("Roboto", "normal");

    let y = 10;
  
    // virsraksts
    doc.setFontSize(16);
    doc.text(`Rēķins Nr. ${invoiceNumber}`, 105, y, { align: "center" });
    y += 10;
  
    // Datums
    doc.setFontSize(12);
    doc.text(`Datums: ${invoiceDate}`, 10, y);
    y += 10;

    // let y = 35;

      const xLeft = 10;
      const xRight = 110;
      const lineHeight = 6;

      doc.text("Pakalpojuma sniedzējs", xLeft, y);
      doc.text("Pakalpojuma saņēmējs", xRight, y);

      y += lineHeight;

      const companyFields = Object.keys(companyFieldLabelsLv);

companyFields.forEach((key) => {
  const issuerValue = issuer[key];
  const receiverValue = receiver[key];

  if (issuerValue) {
    drawLabeledText(
      doc,
      companyFieldLabelsLv[key],
      issuerValue,
      xLeft,
      y
    );
  }

  if (receiverValue) {
    drawLabeledText(
      doc,
      companyFieldLabelsLv[key],
      receiverValue,
      xRight,
      y
    );
  }

  y += lineHeight;
});
  
    // Apmaksas veids (pagaidām fiksēts "pārskaitījums")
    doc.text(`Apmaksas veids: pārskaitījums`, 10, y+5);
    y += 10;

    // const validItems = items.filter(
    //     (item) =>
    //       item.name &&
    //       item.quantity > 0 &&
    //       item.price > 0
    //   );

      //Pārbauda vai nav tukšas rinda tabulā
    const validItems = (items || []).filter(
        (item) =>
          item?.name &&
          Number(item.quantity) > 0 &&
          Number(item.price) > 0
      );

    //   if (validItems.length === 0) {
    //     alert("Nav pievienota neviena pakalpojuma rinda");
    //     return;
    //   }


    // Pakalpojumu tabula
    autoTable(doc, {
      startY: y,
      head: [["Nosaukums", "Mērvienība", "Daudzums", "Cena", "Summa"]],
      body: validItems.map(item => [
        item.name,
        item.unit,
        item.quantity.toString(),
        item.price.toFixed(2),
        item.total.toFixed(2)
      ]),
      styles: {
        font: "Roboto",
        fontSize: 10,
      },
      headStyles: {
        font: "Roboto",
        fontStyle: "bold",   // nosaukumi boldā
      },
      theme: 'grid'
    });
  
    const finalY = doc.lastAutoTable.finalY + 6;
  
// Summas
let yTotals = doc.lastAutoTable.finalY + 10;

const xLabel = 130;
const xValue = 190;

// Summa bez PVN
doc.setFont("Roboto", "bold");
doc.text("Summa bez PVN:", xLabel, yTotals);

doc.setFont("Roboto", "normal");
doc.text(`${subTotal.toFixed(2)} €`, xValue, yTotals, { align: "right" });

yTotals += 6;

// PVN
doc.setFont("Roboto", "bold");
doc.text("PVN 21%:", xLabel, yTotals);

doc.setFont("Roboto", "normal");
doc.text(`${vat.toFixed(2)} €`, xValue, yTotals, { align: "right" });

yTotals += 6;

// Kopā ar PVN
doc.setFont("Roboto", "bold");
doc.text("Kopā ar PVN:", xLabel, yTotals);

doc.setFont("Roboto", "bold");
doc.text(`${totalWithVat.toFixed(2)} €`, xValue, yTotals, { align: "right" });

  
// Summa vārdiem
    yTotals += 10;

doc.setFont("Roboto", "bold");
doc.text("Vārdiem:", 10, yTotals);

doc.setFont("Roboto", "normal");

const words = numberToWordsLt(totalWithVat).replace("Vārdiem: ", "");

const wrappedWords = doc.splitTextToSize(words, 170);
doc.text(wrappedWords, 30, yTotals);

  
    // Izsniedza
    doc.text(`Izsniedza: ${issuerName}`, 10, finalY + 40);
  
    // Piezīmes
    doc.text(note, 105, finalY + 50, { align: "center" });
  
    // Saglabāt PDF
    doc.save(`Rēķins_${invoiceNumber || "000"}.pdf`);
  };

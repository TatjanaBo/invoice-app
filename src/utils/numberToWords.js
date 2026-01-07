export function numberToWordsLt(number) {
    const units = ["nulle","viens","divi","trīs","četri","pieci","seši","septiņi","astoņi","deviņi"];
    const teens = ["desmit","vienpadsmit","divpadsmit","trīspadsmit","četrpadsmit","piecpadsmit","sešpadsmit","septiņpadsmit","astoņpadsmit","deviņpadsmit"];
    const tens = ["","desmit","divdesmit","trīsdesmit","četrdesmit","piecdesmit","sešdesmit","septiņdesmit","astoņdesmit","deviņdesmit"];
    const hundreds = ["","viens simts","divi simti","trīs simti","četri simti","pieci simti","seši simti","septiņi simti","astoņi simti","deviņi simti"];
  
    const euros = Math.floor(number);
    const cents = Math.round((number - euros) * 100);
  
    if (euros === 0) return `Pavisam apmaksai vārdiem: nulle eiro ${cents} centi`;
  
    let words = "";
  
    const thousandsPart = Math.floor(euros / 1000);
    const hundredsPart = euros % 1000;
  
    // Tūkstoši
    if (thousandsPart > 0) {
      if (thousandsPart === 1) {
        words += "viens tūkstotis ";
      } else if (thousandsPart < 10) {
        words += `${units[thousandsPart]} tūkstoši `;
      } else if (thousandsPart < 20) {
        words += `${teens[thousandsPart - 10]} tūkstoši `;
      } else {
        words += `${tens[Math.floor(thousandsPart / 10)]} `;
        if (thousandsPart % 10 > 0) {
          words += `${units[thousandsPart % 10]} `;
        }
        words += "tūkstoši ";
      }
    }
  
    // Simti
    const hundredDigit = Math.floor(hundredsPart / 100);
    const tenDigit = Math.floor((hundredsPart % 100) / 10);
    const unitDigit = hundredsPart % 10;
  
    if (hundredDigit > 0) {
      words += `${hundreds[hundredDigit]} `;
    }
  
    // Līdz desmitiem
    const lastTwoDigits = hundredsPart % 100;
    if (lastTwoDigits > 0) {
      if (lastTwoDigits < 10) {
        words += `${units[lastTwoDigits]} `;
      } else if (lastTwoDigits < 20) {
        words += `${teens[lastTwoDigits - 10]} `;
      } else {
        words += `${tens[tenDigit]} `;
        if (unitDigit > 0) {
          words += `${units[unitDigit]} `;
        }
      }
    }
  
    return `${words.trim()} eiro ${cents} centi`;
  }
  
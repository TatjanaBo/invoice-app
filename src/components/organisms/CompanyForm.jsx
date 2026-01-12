"use client";
import { useState } from "react";

const fields = [
  { key: "name", label: "Nosaukums" },
  { key: "regNum", label: "Reģistrācijas numurs" },
  { key: "address", label: "Juridiskā adrese" },
  { key: "vatNum", label: "PVN maksātāja reģistrācijas numurs" },
  { key: "bankName", label: "Bankas nosaukums" },
  { key: "account", label: "Konta numurs" },
  { key: "swift", label: "SWIFT kods" },
];

export default function CompanyForm({ 
  title, 
  data, 
  onChange,  
  companies = [],
  onSelectCompany,
  onSaveCompany, 
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const matchingCompanies =
    data.name
      ? companies.filter((c) =>
          c.name.toLowerCase().includes(data.name.toLowerCase())
        )
      : [];

  const updateField = (key, value) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="mb-6">
    <h2 className="font-bold mb-2">{title}</h2>

    <div className="grid grid-cols-2 gap-4">
      {fields.map((f) => (
        <div
          key={f.key}
          className={`flex flex-col ${f.key === "name" ? "relative" : ""}`}
        >
          <label className="text-sm font-semibold mb-1">{f.label}</label>

          {f.key === "name" ? (
            <>
              {/* input с автодополнением по названию */}
              <input
                type="text"
                className="border p-2 rounded"
                value={data.name ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  onChange({ ...data, name: value });
                  if (value) {
                    setShowSuggestions(true);
                  } else {
                    setShowSuggestions(false);
                  }
                }}
                onFocus={() => {
                  if (data.name) setShowSuggestions(true);
                }}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 150);
                }}
              />

              {/* список подсказок при вводе */}
              {showSuggestions && matchingCompanies.length > 0 && (
                <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded border bg-white shadow">
                  {matchingCompanies.map((company) => (
                    <li key={company.id}>
                      <button
                        type="button"
                        className="w-full text-left px-2 py-1 hover:bg-gray-100 text-sm"
                        onClick={() => {
                          onSelectCompany?.(company);
                          setShowSuggestions(false);
                        }}
                      >
                        {company.name}
                        {company.regNum ? (
                          <span className="text-xs text-gray-500">
                            {" "}
                            — {company.regNum}
                          </span>
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* dropdown со всеми сохранёнными фирмами */}
              {companies.length > 0 && (
                <select
                  className="border p-2 rounded mt-2"
                  value=""
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const company = companies.find(
                      (c) => c.id === selectedId
                    );
                    if (company) {
                      onSelectCompany?.(company);
                    }
                  }}
                >
                  <option value="">Izvēlēties firmu...</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.regNum ? `(${c.regNum})` : ""}
                    </option>
                  ))}
                </select>
              )}

              {/* кнопка "Saglabāt firmu" */}
              {onSaveCompany && (
                <button
                  type="button"
                  className="mt-2 inline-block rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                  onClick={() => onSaveCompany(data)}
                >
                  Saglabāt firmu
                </button>
              )}
            </>
          ) : (
            <input
              type="text"
              className="border p-2 rounded"
              value={data[f.key] ?? ""}
              onChange={(e) =>
                onChange({ ...data, [f.key]: e.target.value })
              }
            />
          )}
        </div>
      ))}
    </div>
  </div>
    // <div className="mb-6">
    //   <h2 className="font-bold mb-2">{title}</h2>

    //   <div className="grid grid-cols-2 gap-4">
    //     {fields.map((f) => (
    //       <div key={f.key} className="flex flex-col">
    //         {/* <label className="text-sm font-semibold mb-1">{f.label}</label> */}
    //         <input
    //           type="text"
    //           className="border p-2 rounded"
    //           value={data[f.key] ?? ""}
    //           onChange={(e) => updateField(f.key, e.target.value)}
    //           placeholder={f.label}
    //         />
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}

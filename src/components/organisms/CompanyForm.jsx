"use client";

const fields = [
  { key: "name", label: "Nosaukums" },
  { key: "regNum", label: "Reģistrācijas numurs" },
  { key: "address", label: "Juridiskā adrese" },
  { key: "vatNum", label: "PVN maksātāja reģistrācijas numurs" },
  { key: "bankName", label: "Bankas nosaukums" },
  { key: "account", label: "Konta numurs" },
  { key: "swift", label: "SWIFT kods" },
];

export default function CompanyForm({ title, data, onChange }) {
  const updateField = (key, value) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="mb-6">
      <h2 className="font-bold mb-2">{title}</h2>

      <div className="grid grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key} className="flex flex-col">
            {/* <label className="text-sm font-semibold mb-1">{f.label}</label> */}
            <input
              type="text"
              className="border p-2 rounded"
              value={data[f.key] ?? ""}
              onChange={(e) => updateField(f.key, e.target.value)}
              placeholder={f.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

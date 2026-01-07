"use client";

export default function SignerBlock({ issuerName, setIssuerName }) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold mr-2">Izsniedza:</h3>
      <label className="font-semibold mr-2">Vārds, uzvārds</label>
      <input
        type="text"
        placeholder="Ievadiet vārdu un uzvārdu"
        value={issuerName}
        onChange={(e) => setIssuerName(e.target.value)}
        className="border p-2 rounded w-64"
      />
    </div>
  );
}

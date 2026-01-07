"use client"

export default function ItemsTable ({items, handleItemChange, removeItem}){
    return(
        <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 text-black p-2">Pakalpojuma nosaukums</th>
            <th className="border border-gray-400 text-black p-2">Mērvienība</th>
            <th className="border border-gray-400 text-black p-2">Daudzums</th>
            <th className="border border-gray-400 text-black p-2">Cena</th>
            <th className="border border-gray-400 text-black p-2">Summa</th>
            <th className="border border-gray-400 text-black p-2 w-10"></th>
          </tr>
        </thead>
        <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td className="border border-gray-400 p-2">
              <input
                type="text"
                className="w-full border p-1 rounded"
                value={item.name}
                onChange={(e) => handleItemChange(index, "name", e.target.value)}
              />
            </td>
            <td className="border border-gray-400 p-2">
              <input
                type="text"
                className="w-full border p-1 rounded"
                value={item.unit}
                onChange={(e) => handleItemChange(index, "unit", e.target.value)}
              />
            </td>
            <td className="border border-gray-400 p-2">
              <input
                type="number"
                className="w-full border p-1 rounded"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
              />
            </td>
            <td className="border border-gray-400 p-2">
              <input
                type="number"
                className="w-full border p-1 rounded"
                value={item.price}
                onChange={(e) => handleItemChange(index, "price", e.target.value)}
              />
            </td>
            <td className="border border-gray-400 p-2 text-right">{item.total.toFixed(2)}</td>

                 {/* Poga " Dzēst" */}
            <td className="border border-gray-400 p-2 text-center">
              {items.length > 1 && (
                <button
                  onClick={() => removeItem(index)}
                  title="Dzēst rindu"
                  className="text-gray-400 hover:text-red-600 font-bold"
                >
                  ✕
                </button>
              )}
            </td>
          </tr>
))}
        </tbody>
      </table>
    )
}
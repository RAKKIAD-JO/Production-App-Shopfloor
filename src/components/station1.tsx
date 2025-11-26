import React, { useEffect, useState } from 'react'
import mockProduct from '../data/mock-product.json'
import mockProduction from '../data/mock-production.json'


function sataion1() {
  const [products, setProducts] = useState<any[]>([])
  const [production, setProduction] = useState<any[]>([])
  const [trayInputs, setTrayInputs] = useState<{ [key: string]: string }>({});
  const [problemItem, setProblemItem] = useState<any | null>(null);
  const [problemTopic, setProblemTopic] = useState("วัตถุดิบหมด");
  const [problemCount, setProblemCount] = useState("");

  useEffect(() => {
    setProducts(mockProduct.products)
    setProduction(mockProduction.data)

    // console.log(production)
  }, [])

  const satation1Data = production.filter((item) => item.station === 1)

  const getProduct = (productId: string) => {
    return products.find((p) => p.id === productId)
  }

  const handleSend = (item: any) => {
    const trays = trayInputs[item.ID]
    if (!trays) {
      alert("กรุณากรอกจำนวนถาดที่จะส่ง")
      return;
    }

    const traysNum = Number(trays)
    if (isNaN(traysNum) || traysNum < 0) {
      alert("จำนวนไม่ถูกต้อง กรุณ่ตรวจสอบอีกครัง")
      return;
    }

    const prod = getProduct(item.product_id);
    const piecePerTray = prod?.piece_per_tray;
    const piecesToSend = traysNum * piecePerTray;

    if (piecesToSend > item.export_quantity) {
      alert("จำนวนไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง");
      return;
    }

    alert(
      `ส่งสินค้า\n` +
      `Product: ${prod?.name}\n` +
      `Shipping Time: ${item.shipping_time}\n` +
      `Factory: ${item.factory_id}\n` +
      `จำนวนถาดที่ส่ง: ${traysNum}\n` +
      `จำนวนชิ้นที่ส่ง: ${piecesToSend}\n` +
      `Station: ${item.station}\n` +
      `เวลาที่ส่ง: ${new Date().toLocaleString()}`
    );

    setTrayInputs({ ...trayInputs, [item.ID]: "" });
  }

  const handleProblemSubmit = () => {
    if (!problemCount || Number(problemCount) <= 0) {
      alert("กรุณากรอกจำนวนชิ้นที่มีปัญหาให้ถูกต้อง");
      return;
    }

    const product = getProduct(problemItem?.product_id);

    alert(`
แจ้งปัญหาเรียบร้อย:
Product: ${product?.name}
Shipping Time: ${problemItem?.shipping_time}
Factory: ${problemItem?.factory_id}
จำนวนชิ้นที่มีปัญหา: ${problemCount}
หัวข้อปัญหา: ${problemTopic}
Station: ${problemItem?.station}
เวลาที่แจ้ง: ${new Date().toLocaleString()}
  `);

    // รีเซ็ตค่า
    setProblemItem(null);
    setProblemCount("");
    setProblemTopic("วัตถุดิบหมด");
  };



  return (
    <div>
      <h2 className='text-center m-[30px]'>Station1 Product List</h2>
      <div className='grid grid-cols-1 gap-4 p-4'>
        {satation1Data.map((item) => {
          const productName = getProduct(item.product_id);
          const piecePerTray = productName?.piece_per_tray || 1;
          return (
            <div key={item.ID} className='p-4 border rounded shadow text-lg'>
              <h2 className='font-bold'>Product Name: {productName?.name}</h2>
              <p>Shipping Time: {item.shipping_time}</p>
              <p>Station: {item.station}</p>
              <p>Factory: {item.factory_id}</p>
              <p>จำนวนชิ้นทั้งหมด: {item.import_quantity}</p>
              <p>จำนวนผลิตได้: {item.export_quantity}</p>
              <p>จำนวนเสีย: {item.lost_quantity}</p>

              <p>จำนวนถาด: {Math.floor(item.export_quantity / piecePerTray)}</p>
              <input
                type="number"
                className="border p-2 w-full mt-3 rounded"
                placeholder="จำนวนถาดที่จะส่ง"
                value={trayInputs[item.ID] || ""}
                onChange={(e) =>
                  setTrayInputs({
                    ...trayInputs,
                    [item.ID]: e.target.value,
                  })
                }
              />

              <div className="flex gap-4 mt-4">
                <button onClick={() => handleSend(item)} >
                  ส่งสินค้า
                </button>
                <button onClick={() => setProblemItem(item)}>
                  แจ้งปัญหา
                </button>

              </div>

            </div>

          )
        })}
        {problemItem && (
          <div
            className="fixed inset-0 flex justify-center items-center z-50 bg-black/40 backdrop-blur-sm"
            style={{ WebkitBackdropFilter: 'blur(6px)', backdropFilter: 'blur(6px)' }}
          >
            <div className="bg-white p-6 rounded w-96">
              <h2 className="text-xl font-bold mb-4">แจ้งปัญหา: {getProduct(problemItem.product_id)?.name}</h2>

              <label className="block mb-2">หัวข้อปัญหา</label>
              <select
                className="border p-2 w-full mb-4 rounded"
                value={problemTopic}
                onChange={(e) => setProblemTopic(e.target.value)}
              >
                <option value="วัตถุดิบหมด">วัตถุดิบหมด</option>
                <option value="เครื่องเสีย">เครื่องเสีย</option>
                <option value="ไหม้">ไหม้</option>
              </select>

              <label className="block mb-2">จำนวนชิ้นที่มีปัญหา</label>
              <input
                type="number"
                className="border p-2 w-full mb-4 rounded"
                value={problemCount}
                onChange={(e) => setProblemCount(e.target.value)}
              />

              <div className="flex justify-end gap-2">
                <button
                  className="bg-gray-300 p-2 rounded"
                  onClick={() => setProblemItem(null)}
                >
                  ยกเลิก
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={handleProblemSubmit}
                >
                  ส่ง
                </button>
              </div>
            </div>
          </div>
        )}

      </div>



    </div>
  )
}

export default sataion1

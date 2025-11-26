import React, { useEffect, useState } from 'react'
import mockProduct from '../data/mock-product.json'
import mockProduction from '../data/mock-production.json'


function sataion1() {
  const [product, setProducts] = useState([])
  const [production, setProduction] = useState([])

  const fetachproduct = async (data: any) => {
    try {
      if (data) {
        // console.log('product:', data)
        await setProducts(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetachproduction = async (data: any) => {
    try {
      if (data) {
        console.log('data:', data)
        await setProduction(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetachproduct(mockProduct.products)
    fetachproduction(mockProduction.data)
    console.log(production)
  }, [mockProduct, mockProduction])

  console.log(production.length)

  return (
    <div>
      <h2 className='text-center m-[30px]'>Product List</h2>
      <div>
        {production.length > 0 && (
          // <></>
          <div className='grid grid-cols-1 gap-30'>
            {production.map((item: any) => {
              return (
                <div key={item.ID} >
                  <h2>Product Name: {item.ID} </h2>
                  <p>เวลาส่ง: {item.shipping_time}</p>
                  <p>โรงงานผลิต: {item.factory_id}</p>
                  <p>จำนวนชิ้นทั้งหมด: {item.import_quantity}</p>
                  <p>จำนวนผลิตได้: {item.export_quantity}</p>
                  <p>จำนวนเสีย: {item.lost_quantity}</p>
                  <p>จำนวนถาด: {item.lost_quantity}</p>
                  <p>station: {item.station}</p>
                  <p></p>
                </div>
              )
            })}
            
          </div>
        )}
      </div>

    

    </div>
  )
}

export default sataion1

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Product = () => {

    const [name, setName] = useState("")
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")

    const [data, setData] = useState([])

    const addProduct = async () => {

        try {
            //ใช้ได้
            const url = `https://workshop-react-api.vercel.app/product`
            const user_id = localStorage.getItem('user_id')
            const res = await axios.post(url, { name, qty, price, image, user_id })
            fetchData()
        } catch (error) {
            // error
            console.log(error);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const url = `https://workshop-react-api.vercel.app/product/${id}`
            const res = await axios.delete(url)
            fetchData()
        } catch (error) {
            console.log(error);
        }

    }

    const fetchData = async () => {
        try {
            const user_id = localStorage.getItem("user_id")
            const url = `https://workshop-react-api.vercel.app/product?user_id=${user_id}`
            //API
            const res = await axios.get(url)
            console.log(res.data);
            setData(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchData() }, [])

    return (
        <div>
            name : {name} <br />
            qty : {qty} <br />
            price : {price} <br />
            image : {image} <br />
            {/* blog 1 */}
            <div className='bg-white text-black text-center shadow-lg rounded-lg mt-24 p-5 m-10'>
                <input placeholder='ชื่อสินค้า' className=' border border-gray-300 rounded-lg py-2 px-4 m-2' type="text" name='name' onChange={((e) => setName(e.target.value))} />
                <input placeholder='จำนวน' className=' border border-gray-300 rounded-lg py-2 px-4 m-2' type="text" name='amount' onChange={((e) => setQty(e.target.value))} />
                <input placeholder='ราคา' className=' border border-gray-300 rounded-lg py-2 px-4 m-2' type="text" name='price' onChange={((e) => setPrice(e.target.value))} />
                <input placeholder='รูปภาพ' className=' border border-gray-300 rounded-lg py-2 px-4 m-2' type="text" name='image' onChange={((e) => setImage(e.target.value))} />
                <button className=' text-white bg-blue-500 border-gray-300 rounded-lg ml-10 py-2 px-10' onClick={addProduct}>บันทึก</button>
            </div>

            {/* blog 2 */}
            <div className=' bg-white rounded-lg shadow-lg p-5 m-10'>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-center text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    สินค้า
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ชื่อสินค้า
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    จำนวน
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    รูปภาพ
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    แก้ไข
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.map((item, index) => (
                                // TR
                                <tr KEY={index}>
                                    <td><img className=' w-28' src={item.image} alt="" /></td>
                                    <td>{item.name}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button className=' rounded-lg bg-red-500 m-2 px-3 py-1 text-white' onClick={() => deleteProduct(item.id)}>ลบ


                                        </button>
                                    </td>
                                </tr>
                            ))}


                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Apple MacBook Pro 17"
                                </th>
                                <td className="px-6 py-4">
                                    Silver
                                </td>
                                <td className="px-6 py-4">
                                    Laptop
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-4">
                                    <button className=' rounded-lg bg-green-500 m-2 px-3 py-1 text-white'>แก้ไข</button>
                                    <button className=' rounded-lg bg-red-500 m-2 px-3 py-1 text-white'>ลบ</button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    )
}

export default Product

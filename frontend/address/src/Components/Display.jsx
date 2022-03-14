import React, { useEffect, useState } from 'react'

export const Display = () => {
    const [data,setData] = useState([])

    const getData =() =>{
        fetch("http://localhost:8000/")
        .then((r)=>r.json())
        .then((r)=>setData(r))
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <div>
        {
                data.data.map((item)=>{
                    return(
                        <div key={item.id} >
                            <p>{item.floor}</p>
                            <p>{item.landmark}</p>
                            <p>{item.locality}</p>
                            <p>{item.pincode}</p>
                            <p>{item.street}</p>
                    </div>
                    )
                })
            }
    </div>
  )
}

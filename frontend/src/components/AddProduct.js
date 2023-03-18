import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = ()=>{
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [company,setCompany] = useState('');
    const [error, setError] = useState(false);
    const addProduct= async()=>{

        if(!name || !price || !category || !company){
            setError(true);
        }else{
        
        const userId = JSON.parse(localStorage.getItem('user'))._id ;
        let result = fetch('http://localhost:5000/add-product',{
            method: 'post',
            body: JSON.stringify({name, price, category, company, userId}),
            headers:{
                'Content-Type':'application/json',
                Authorization: `bearer ${JSON.parse(localStorage.getItem('token')) }`
            }
        })
        result = await (await result).json();
        console.log(result);
        navigate('/');
    }
}


    return(
        <div className="add-product" >
            <h1>Add Product</h1>
        <input className="inputBox" type="text" placeholder="enter product name"
         onChange={(e)=> setName(e.target.value)} value={name} />
   { error && !name && <span className="invalid-span">enter valid name</span>  }

        <input className="inputBox" type="text" placeholder="enter product price"
        onChange={(e)=> setPrice(e.target.value)} value={price} />
         { error && !price && <span className="invalid-span">enter valid price</span>  }

        <input className="inputBox" type="text" placeholder="enter product category"
        onChange={(e)=> setCategory(e.target.value)} value={category} />
         { error && !category && <span className="invalid-span">enter valid category</span>  }

        <input className="inputBox" type="text" placeholder="enter product company"
        onChange={(e)=> setCompany(e.target.value)} value={company} />
         { error && !company && <span className="invalid-span">enter valid company </span>  }
<br />
        <button type="button" onClick={addProduct} >Add Product</button>

<br /> <br /> <br /> <br />
        </div>
    )
}

export default AddProduct;
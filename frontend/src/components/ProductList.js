import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList =()=>{

    const [product,setProduct] = useState([]);

    useEffect(()=>{
        getProduct();
    },[]);

    const getProduct= async()=>{
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                Authorization: `bearer ${JSON.parse(localStorage.getItem('token')) }`
            }
        });
        result = await result.json();
        setProduct(result);

    }

    const deleteProduct= async(id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method: 'Delete',
            headers:{
                Authorization: `bearer ${JSON.parse(localStorage.getItem('token')) }`
            }
        })
        result = await result.json();
        if(result){
            alert("Record is deleted");
            getProduct();
        }
    }
    const searchHandle= async(event)=>{
        
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    Authorization: `bearer ${JSON.parse(localStorage.getItem('token')) }`
                }
            });
            result = await result.json();
            if(result){
                setProduct(result);
            }
        }else{
            getProduct();
        }
        
    }
    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input className="searchBox" type="text" placeholder="Search Product" 
            onChange={searchHandle} />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
              product.length >0 ? product.map((item,index)=>
                <ul key={item._id}>
                <li>{index + 1}</li>
                <li>{item.name}</li>
                <li>${item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li className="option"><button className="delete" onClick={()=> deleteProduct(item._id)}>Delete</button>
                <Link className="update" to={"/update/"+item._id} >update</Link>
                </li>
            </ul>
                )
                : <h1>No  Result Found</h1>
            }
        </div>
    )
}

export default ProductList;
import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { connect, useDispatch,useSelector } from 'react-redux';
import { getAllProducts } from '../../services'
import { setProducts } from '../../redux/actions/productActions';


const ProductList = () => {
    //const [products, setProductsList] = useState([]);
    //debugger;
    //console.log("Testing",useSelector((state) => state.allProducts.products));
   const products = useSelector((state) => state.allProducts.products);
    const dispatch = useDispatch();
    const fetchProducts = async () => {
        const response = await getAllProducts().catch((err) => {
            console.log(err)
        });
        console.log("response", response.data);
       // setProductsList(response.data);
        dispatch(setProducts(response.data));
    }
    useEffect(() => {
        
        fetchProducts();
    }, [])

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Model Number</th>
                        <th>Desciption</th>
                        <th>Price</th>
                        <th>Qunatity</th>
                    </tr>
                </thead>
                <tbody >

                    {products.map((product) => {
                        const { modelNum, price, description, quantity } = product;
                        return (
                            <tr key={modelNum}>
                                <td>{modelNum}</td>
                                <td>{price}</td>
                                <td>{description}</td>
                                <td>{quantity}</td>
                            </tr>
                        );
                    })
                    }

                </tbody>
            </Table>

        </div>
    )
}

export default ProductList

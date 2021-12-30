import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { getAllProducts, createOrders } from '../../services'
import { setProducts } from '../../redux/actions/productActions';
import { Table } from 'react-bootstrap';

export const ShoppingCart = () => {
    const products = useSelector((state) => state.allProducts.products);
    const dispatch = useDispatch();
    const [inputModelNum, setInputModelNum] = useState('');
    const [inputQunatity, setInputQuantity] = useState();
    const [isInvalidModelNum, setInvalidModelNum] = useState();
    const [isShowOtherFields, setIsShowOtherfields] = useState(false)
    const [isQuantityAvailable, setisQuantityAvailable] = useState(false);
    const [isModelNumAvialable, setisisModelNumAvialable] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [inputAddress, setInputAddress] = useState('');

    const checkValidModelNumber = (event) => {
        setIsShowOtherfields(false);
        event.preventDefault();
        setInputModelNum(event.target.value);
        const selectedProduct = products.filter(element => element.modelNum === event.target.value);

        if (selectedProduct && selectedProduct.length > 0) {
            setisisModelNumAvialable(selectedProduct);
            setInputModelNum(event.target.value);
            setIsShowOtherfields(true);
            setInvalidModelNum("");
        }
        else {
            setisisModelNumAvialable([]);
            setInvalidModelNum("Invalid Model Number");
        }

    }
    const checkQuantityAvailableOrNot = (event) => {
        setInputQuantity(event.target.value);
        event.preventDefault();
        setisQuantityAvailable(false);
        if (event.target.value != "" && isModelNumAvialable[0].quantity <= event.target.value) {
            //setInputQuantity(event.target.value);
            setisQuantityAvailable(true);
        }


    }
    const addToCart = (event) => {
        event.preventDefault();
        cartList.push({ modelNum: inputModelNum, price: inputQunatity * isModelNumAvialable[0].price, 
            quantity: inputQunatity,Amount:isModelNumAvialable[0].price, deliveryTime: isModelNumAvialable[0].deliveryTime,ProductID: isModelNumAvialable[0].id});
        setInputModelNum('');
        setInputQuantity();
        setInvalidModelNum();
        setIsShowOtherfields(false)
        setisQuantityAvailable(false);
        setisisModelNumAvialable([]);

    }
    const fetchProducts = async () => {
        const response = await getAllProducts().catch((err) => {
            console.log(err)
        });
        console.log("response", response.data);
        // setProductsList(response.data);
        dispatch(setProducts(response.data));
    }
    const placeOrder = async () => {
        debugger;
        const cartListJson = JSON.stringify(cartList);
        const total = cartList.map(v => v['price']).reduce((sum, current) => sum + current, 0);
        const deliveryTime = cartList.map(v => v['deliveryTime']).reduce((sum, current) => sum + current, 0);
        const createOrderParams = { Address: inputAddress, Total: total, EstDelivery: deliveryTime + 1, CartItems: cartListJson };
        console.log(createOrderParams);
        const response = await createOrders(createOrderParams).then((data)=>
        {
            setCartList([]);
            setInputAddress('');
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(() => {

        fetchProducts();
    }, [])
    return (
        <div >

            <div className="container mt-2">
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Cart Management
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <form onSubmit={addToCart}>
                                    <div className="row mt-3">
                                        <div className="col-md-3">
                                            <label htmlFor='modelNumber' className='form-label'>Model No:</label>
                                            <input type='text' id='modelnum' className='form-control' value={inputModelNum} required onChange={checkValidModelNumber} />
                                            {isInvalidModelNum && <span className="text-danger">{isInvalidModelNum}</span>}
                                        </div>
                                        {isShowOtherFields && <div className="col-md-3">
                                            <label htmlFor='qunatity' className='form-label'>quantity</label>
                                            <input type='number' id='qunatity' className='form-control' value={inputQunatity} required onChange={checkQuantityAvailableOrNot} />
                                            {isQuantityAvailable && <span className="text-danger">Qunaity is not available</span>}
                                        </div>}
                                        {isShowOtherFields && !isQuantityAvailable && !isNaN(isModelNumAvialable[0].price * inputQunatity) && <div className="col-md-2">
                                            <label htmlFor='price' className='form-label'> Price</label>
                                            <span className='form-control'>{isModelNumAvialable[0].price * inputQunatity}</span>
                                        </div>}
                                        {isShowOtherFields && !isQuantityAvailable && <div className="col-md-2 mt-2">
                                            <button className='btn btn-primary mt-4'> Add to Cart</button>
                                        </div>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="row mt-2">
                    <div className="col-8 ">
                        {cartList.length > 0 && <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Model Number</th>
                                    <th>Qunatity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody >
                                {cartList.map((cart) => {
                                    const { modelNum, price, quantity } = cart;
                                    return (
                                        <tr key={modelNum}>
                                            <td>
                                                {modelNum}
                                            </td>
                                            <td>
                                                {quantity}
                                            </td>
                                            <td>${price}</td>
                                        </tr>
                                    );
                                })
                                }
                            </tbody>
                        </Table>}

                    </div>

                    <div className="col-4">
                        <div className="accordion" id="billinginfoAccoridion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="Billinginfo">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">
                                        Billing Info
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="Billinginfo" data-bs-parent="#billinginfoAccoridion">
                                    <div className="accordion-body">
                                        <div className=''>

                                            <div className='row'>
                                                <span className='col'>subtotal</span>
                                                <span className='col-2'>{cartList.map(v => v['price']).reduce((sum, current) => sum + current, 0)}</span>
                                            </div>
                                            <div className='row'>
                                                <span className='col'>Estimate delivery</span>
                                                <span className='col-2'>{cartList.map(v => v['deliveryTime']).reduce((sum, current) => sum + current, 0)+1}</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="accordion" id="addressAccoridion" className='mt-2'>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="address">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseOne">
                                        Address
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse show" aria-labelledby="address" data-bs-parent="#addressAccoridion">
                                    <div className="accordion-body">
                                        <div className=''>
                                            <textarea rows={4} cols={36} value={inputAddress} onChange={(event) => setInputAddress(event.target.value)}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4'>
                        <button className='button btn btn-primary' onClick={placeOrder}>Place order</button>
                    </div>
                    <div className='col-md-4'></div>
                </div>
            </div>
        </div>
    )
}


export default ShoppingCart;
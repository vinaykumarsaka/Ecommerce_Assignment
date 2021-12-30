import env from '../env';
import axios from 'axios'
const baseUrl = `${env.API_URL}`;

export async function getAllProducts()
{
    return await axios.get(`${baseUrl}/products`);
}

export async function createOrders(createOrderParams )
{
    debugger
    return await axios.post(`${baseUrl}/orders/add`,createOrderParams);
}
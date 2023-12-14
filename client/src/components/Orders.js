import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useAppContext} from '../context/user_context';
import axios from 'axios';
import {Link} from 'react-router-dom'; // Import Link from react-router-dom
import {formatPrice} from '../utils/helpers'

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const OrderCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 800px;
  background-color: #fff;
`;

const OrderTitle = styled.h2`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const OrderImage = styled.img`
  max-width: 100px;
  height: auto;
  margin-right: 20px;
`;

const OrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  p {
    margin: 0;
  }
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: #333;

  &:hover {
    text-decoration: underline;
  }
`;

const Orders = () => {
    const [orders, setOrders] = useState(null);
    const {user} = useAppContext();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/api/v1/orders/showAllMyOrders`);
                setOrders(response.data.orders);
            } catch (error) {
                console.log(error);
            }
        };
        if (user) {
            fetchOrders();
        }
    }, [user]);

    return (
        <OrdersContainer>
            <h1>My Orders</h1>
            {orders?.map((order) => (
                <OrderCard key={order._id}>
                    <OrderTitle>Order ID: {order._id}</OrderTitle>
                    <OrderDetails>
                        <p>Status: {order.status}</p>
                        <p>{new Date(order.createdAt).toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        })}</p>
                    </OrderDetails>
                    {order.orderItems.map((item, index) => (
                        <OrderItem key={`${item._id}_${index}`}>
                            <ProductLink to={`/products/${item.product}`}>
                                <OrderImage src={item.image} alt={item.name}/>
                                <div>
                                    <p>{item.name}</p>
                                    <p>Price: {formatPrice(item.price)}</p>
                                    <p>Quantity: {item.amount}</p>
                                </div>
                            </ProductLink>
                        </OrderItem>
                    ))}
                </OrderCard>
            ))}
        </OrdersContainer>
    );
};

export default Orders;

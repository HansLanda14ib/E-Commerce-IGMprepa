import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Button, Card, Modal} from 'react-bootstrap';
import {formatPrice} from "../../utils/helpers";
import {IoIosPricetag} from "react-icons/io";
import {TbTruckDelivery} from "react-icons/tb";
import {MdOutlineInventory2} from "react-icons/md";
import {GiClothes} from "react-icons/gi";
import {CiMug1} from "react-icons/ci";
import {GiOutbackHat} from "react-icons/gi";
import {FaPen} from "react-icons/fa";
import {FaShoppingBag} from "react-icons/fa";
import {GiHoodie} from "react-icons/gi";
import {FaTshirt} from "react-icons/fa";

const DashboardContainer = styled.div`
  padding: 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const ProductCard = styled(Card)`
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #fff;
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;



const getCategoryIcon = (category) => {
    switch (category) {
        case 'mug':
            return <CiMug1/>;
        case 'hat':
            return <GiOutbackHat/>;
        case 'pen':
            return <FaPen/>;
        case 'bag':
            return <FaShoppingBag/>;
        case 'hoodie':
            return <GiHoodie/>;
        case 'sweater':
            return <GiHoodie/>;
        case 't-shirt':
            return <FaTshirt/>;
        default:
            return null;
    }
};

const ConfirmationModal = ({show, handleClose, handleConfirm}) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirm}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>);
};

const Product = ({product, onDelete}) => {
    const {
        _id,
        name,
        price,
        description,
        images,
        category,
        company,
        colors,
        featured,
        freeShipping,
        inventory,
        averageRating,
        numOfReviews,
        createdAt,
        updatedAt,
    } = product;
    const [showModal, setShowModal] = useState(false);


    const handleDelete = async (_id) => {
        try {
            await axios.delete(`/api/v1/products/${_id}`);
            onDelete(_id);
            setShowModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (_id) => {
        try {
            await axios.patch(`/api/v1/products/${_id}`);
            // Handle deletion logic here or refresh the product list
        } catch (error) {
            console.log(error);
        }
    };

    return (<ProductCard>
        {images && images.length > 0 && <ProductImage src={images[0]} alt={name}/>}
        <h2>{name}</h2>
        <p>
            <IoIosPricetag/> <strong> {formatPrice(price)}</strong> <GiClothes/> {freeShipping ?
            <TbTruckDelivery style={{color: 'green'}}/> : <TbTruckDelivery style={{color: 'red'}}/>}
            <MdOutlineInventory2/> <strong>{inventory}</strong> | {getCategoryIcon(category)} {category}
        </p>
        <Button onClick={() => setShowModal(true)}>Delete</Button>

        <ConfirmationModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleConfirm={() => handleDelete(_id)}
        />

    </ProductCard>);

};

const AllProducts = () => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/v1/products');
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = (_id) => {
        setProducts(products.filter((prod) => prod._id !== _id)); // Update products list after deletion
    };
    return (<DashboardContainer>
        <h1>All Products</h1>
        <ProductGrid>
            {products.map((product) => (
                <Product key={product._id} product={product} onDelete={handleDelete}/>
            ))}
        </ProductGrid>
    </DashboardContainer>);
};

export default AllProducts;

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { category } from "../../utils/data";
import { addToCart, getAllProducts } from "../../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";
import { useNavigate } from "react-router-dom";


const Card = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease-out;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 170px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 320px;
  border-radius: 6px;
  object-fit: cover;
  transition: all 0.3s ease-out;
  @media (max-width: 600px) {
    height: 230px;
  }
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 6px;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: ${({ theme }) => theme.text_primary};
  }
  &:hover ${Image} {
    opacity: 0.8;
  }
`;
const Menu = styled.div`
  width: 100%;
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  bottom: 0px;
  left: 50;
  right: 50;
  display: flex;
  gap: 12px;
`;
const Button = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.white};
  padding: 12px 20px;
  background: white;
  border-radius: 12px;
  text-align: center;
  font-weight: 500;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.black} 30%,
    transparent
  );
  @media (max-width: 600px) {
    padding: 6px 14px;
  }
`;
const Sale = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  top: 10px;
  right: 10px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: green;
  padding: 3px 6px;
  border-radius: 4px;
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

const ResturantPage = () => {
    const [products, setProducts] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [isOn, setIsOn] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const nameRest = location.state
    console.log(nameRest.name , 'nameRestnameRest')
const resat = category
const getProducts = async () => {
    await getAllProducts().then((res) => {
        const resData = res.data
        if(nameRest == 'Table 9'){
            const Table9 = resData.filter((item) => 
                item.category.some(category => 
                  ['Chinese', 'Seafood','Salad','Stir Fry'].includes(category)
                )
              );;
            setProducts(Table9);
        }
        if(nameRest == 'Pizza Hut'){
            const pizza =  resData.filter((item) => 
                item.category.some(category => 
                  ['Pizza', 'Burger','Italian','Sandwich','Mexican','Curry'].includes(category)
                )
              );
            setProducts(pizza);
        }
        if(nameRest == 'Makers Of Milkshake' || nameRest == 'Ibaco'){
            const pizza =  resData.filter((item) => 
                item.category.some(category => 
                  ['Dessert', 'Burger','Smoothie'].includes(category)
                )
              );
            setProducts(pizza);
        }
    });
  };
  if (!isMounted) {
    setIsMounted(true);
    getProducts();
  }
  const addCart = async (id) => {
    const token = localStorage.getItem("krist-app-token");
    await addToCart( { productId: id, quantity: 1 })
      .then((res) => {
        navigate("/cart");
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
      });
  };
  return (
    <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        margin: "auto",
        marginLeft: "20%"
      }}>
        {products.map((category) => (
            <Card>
            <Top>
              <Image src={category.img} />
              <Menu>
                <Button onClick={() => navigate(`/dishes/${category._id}`)}>{category.name}</Button>
              </Menu>
            </Top>
          </Card>
          ))}
          </div>
 
  );
};

export default ResturantPage;

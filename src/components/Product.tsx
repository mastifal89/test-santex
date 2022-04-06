import { useMutation } from '@apollo/client';
import { FC, useContext } from 'react';
import styled from 'styled-components';
import { ADD_TO_CART } from '../graphql/mutations';
import Spinner from './StyledComponents/Spinner';
import { CartContext } from '../hooks/cartContext';
import { types } from '../types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;
  height: 550px;
  background-color: grey;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem;

  &:hover {
    opacity: 0.5;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 300;
  margin: 1rem;
  color: white;
`;

const Description = styled.p`
  color: white;
  font-size: 0.8rem;
  justify-content: flex-end;
`;

const Price = styled.p`
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0 auto;
`;

const Button = styled.button`
  background-color: #ffa500;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  font-weight: 300;
  padding: 0.5rem;
  margin: 1rem;
  cursor: pointer;
`;

const Image = styled.img`
  max-height: 250px;
`

interface IProps {
  id: number;
  name: string;
  description: string;
  price: number;
  url: string;
}

export const Product: FC<IProps> = ({
  id,
  name,
  description,
  price,
  url,
}): JSX.Element => {

  const { cart, dispatch } = useContext(CartContext);

  const [addItemToOrder, { loading, error }] = useMutation(ADD_TO_CART);

  const addToCart = async (product: any) => {
    
    const { data } = await addItemToOrder({
      variables: {
        productVariantId: product,
        quantity: 1,
      },
    });
    if(!error) {
      dispatch({
        type: types.addItemToCart,
        payload: data.addItemToOrder,
      });
    }
  }

  return (
    <Wrapper>
      <Title>{name}</Title>
      <Description>{description}</Description>
      <Image alt={name} src={url}/>
      <Price>${price}</Price>
      <Button disabled={loading} type='button' onClick={() => addToCart(id)}>{loading ? <div><Spinner />"Loading..."</div> : "Buy"}</Button>
    </Wrapper>
  );
};

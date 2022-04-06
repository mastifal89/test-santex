import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Cart } from '@styled-icons/bootstrap/Cart';
import { CartContext } from '../hooks/cartContext';
import { types } from '../types';

const CartIcon = styled(Cart)`
  color: white;
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
`;

const Badge = styled.span`
  background-color: red;
  border-radius: 10%;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.3rem;
  position: absolute;
  top: 0.8rem;
  right: 1rem;
`;

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Row = styled.div`
  display: flex;
  direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Col = styled.div`
  flex: 1;
`;

export const Header = () => {

  const { cart, dispatch } = useContext(CartContext);

  useEffect(() => {
    if(cart?.cart?.length === 0) {
      dispatch({ type: types.addItemToCart, payload: JSON.parse(localStorage.getItem('cart') || '[]') });
    }
  }, [cart?.cart?.length, dispatch]);

  return (
    <HeaderWrapper style={{ background: 'black' }}>
      <Row>
        <Col>
          <img
            src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
            alt="logo"
            style={{ marginTop: 15, marginLeft: 10 }}
          />
        </Col>
        <Col
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: 10,
            marginTop: 10,
          }}
        >
          <div style={{ color: 'white', marginRight: '1rem' }}>
            {cart && '$ '}{cart && cart.cart?.total}
          </div>
          <CartIcon />
          {cart?.cart?.totalQuantity && <Badge>{cart ? cart.cart?.totalQuantity : null}</Badge>}
        </Col>
      </Row>
    </HeaderWrapper>
  );
};

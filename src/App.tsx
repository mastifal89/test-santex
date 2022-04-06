import { useReducer } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from './graphql/queries';
import { CartContext } from './hooks/cartContext';
import { cartReducer } from './hooks/cartReducer';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';

function App() {

  const { data } = useQuery(GET_ORDERS);

  const initialState = {
    cart: [],
  };

  const [cart, dispatch] = useReducer(cartReducer, initialState);
  
  if(data) {
    localStorage.setItem('cart', JSON.stringify(data.activeOrder));
  }

  return (
    <>
      <CartContext.Provider
        value={{ cart, dispatch }}
      >
        <Header></Header>
        <div>
          <ProductList></ProductList>
        </div>
      </CartContext.Provider>
    </>
  );
}

export default App;

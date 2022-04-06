import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { Product } from './Product';
import styled from 'styled-components';
import Spinner from './StyledComponents/Spinner';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 7rem;
`;

export const ProductList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  return (
    <div>
      {loading && <div><Spinner/>Loading...</div>}
      {error && <p>Error :(</p>}
      <Wrapper>
        {data &&
          data.products.items.map((product: any) => (
            <Product
              key={product.id}
              id={product.variants[0]?.id}
              name={product.name}
              description={product.description}
              price={product.variants[0]?.price}
              url={product.assets[0].source}
            />
          ))}
      </Wrapper>
    </div>
  );
}

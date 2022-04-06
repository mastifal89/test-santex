import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
    query getProducts {
        products {
            items {
                id
                name
                description
                assets {
                    source
                }
                variants {
                    id
                    price
                }
            }
        }
    }
`;

export const GET_ORDERS = gql`
    query activeOrder {
        activeOrder {
            id
            code
            state
            total
            currencyCode
            totalQuantity
            lines {
                id
                productVariant {
                    id
                    name
                    currencyCode
                }
            }
        }
    }
`;

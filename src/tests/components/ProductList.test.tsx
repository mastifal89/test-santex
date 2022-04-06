import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { ProductList } from '../../components/ProductList';
import { GET_PRODUCTS } from '../../graphql/queries';

const mocks: any = [];

const mocksWithData: any = [
    {
        request: {
            query: GET_PRODUCTS,
        },
        result: {
            data: {
                products: {
                    items: [
                        {
                            id: '1',
                            name: 'Product 1',
                            description: 'Description 1',
                            variants: [
                                {
                                    id: '1',
                                    price: 1,
                                },
                            ],
                            assets: [
                                {
                                    source: 'https://via.placeholder.com/150',
                                },
                            ],
                        },
                    ],
                },
            },
        },
    },
];

it('should render ProductList correctly', () => {
    const wrapper = TestRenderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ProductList />
        </MockedProvider>
    );
    expect(wrapper).toMatchSnapshot();
});

it('should render ProductList correctly with data', () => {
    const wrapper = TestRenderer.create(
        <MockedProvider mocks={mocksWithData} addTypename={false}>
            <ProductList />
        </MockedProvider>
    );
    expect(wrapper).toMatchSnapshot();
});
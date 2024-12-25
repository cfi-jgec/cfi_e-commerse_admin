
"use client";

import { baseApi } from "../baseApi";

interface IResProducts {
    products: IProducts[];
    count: number;
    totalPage: number;
    page: number;
    limit: number;
    message: string;
    error: false;
    success: true;
}

interface IProductBody {
    productId: string;
    category?: string;
    description: string;
    discount?: string;
    image: string[];
    price: string;
    stock: string;
    subtitle: string;
    name: string;
}

interface IProductDetailsRes {
    product: IProducts,
    message: string,
    error: boolean,
    success: boolean
}

export const productApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["products", "add-products", "edit-products", 'delete-products', 'product-details'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getProducts: builder.query<IResProducts, { page?: number, limit?: number }>({
                query: ({ page = 1, limit = 10 }) => ({
                    url: "/products",
                    method: "GET",
                    params: { page, limit },
                    credentials: "include",
                }),
                providesTags: ["products"],
            }),
            addProducts: builder.mutation<any, IProductBody>({
                query: (body) => ({
                    url: "/products/create",
                    body,
                    method: "POST",
                    credentials: "include",
                }),
                invalidatesTags: ["add-products"],
            }),
            editProducts: builder.mutation<any, {
                body: IProductBody,
                id: string
            }>({
                query: ({ body, id }) => ({
                    url: `/products/update/${id}`,
                    body,
                    method: "PATCH",
                    credentials: "include",
                }),
                invalidatesTags: ["edit-products"],
            }),
            deleteProducts: builder.mutation<any, string>({
                query: (id) => ({
                    url: `/products/delete/${id}`,
                    method: "POST",
                    credentials: "include",
                }),
                invalidatesTags: ["delete-products"],
            }),
            getProductDetails: builder.query<IProductDetailsRes, string>({
                query: (id) => ({
                    url: `/products/${id}`,
                    method: "GET",
                    credentials: "include",
                }),
                providesTags: ["product-details"],
            }),
        })
    });

export const {
    useGetProductsQuery,
    useAddProductsMutation,
    useEditProductsMutation,
    useDeleteProductsMutation,
    useGetProductDetailsQuery
} = productApi;
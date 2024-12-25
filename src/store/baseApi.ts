import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: "include",
    }),
    tagTypes: ["login"],
    endpoints: (builder) => ({
        login: builder.mutation<any, {
            email: string;
            password: string;
        }>({
            query: (data) => ({
                url: "/auth/admin/login",
                method: "POST",
                body: data, 
            }),
            invalidatesTags: ["login"],
        }),
    }),
});

export const { useLoginMutation } = baseApi;
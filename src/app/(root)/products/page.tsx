"use client"

import Loader from '@/app/loading';
import Layout from '@/Components/common/CommonLayout';
import { useGetProductsQuery } from '@/store/feature/product-feature';
import { Button } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Products = () => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const { data, isLoading, isError, error, isSuccess } = useGetProductsQuery({ page, limit: 12 });
    const router = useRouter();

    useEffect(() => {
        if (isError) {
            console.log(error);
            toast.error((error as any)?.data?.message || "Something went wrong");
        }
        if (isSuccess) {
            setTotalPage(data?.totalPage);
        }
    }, [isError, error, isSuccess, data]);

    if (isLoading) {
        return (
            <Loader />
        )
    }

    const products = data?.products;

    return (
        <Layout header={"3D Printed Products"}>
            <section className=''>
                <div>
                    <div className="flex max-sm:flex-col items-center justify-end gap-5 mb-6">
                        <Link href={`/products/add-product`}>
                            <Button>Add Products</Button>
                        </Link>
                    </div>
                    {products && products.length > 0 ? (
                        <div>
                            <div className="grid max-sm:place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        className='w-full bg-white shadow-lg rounded-md cursor-pointer'
                                        onClick={() => router.push(`/products/${product.id}`)}
                                    >
                                        <Image src={product.image[0]}
                                            alt='product'
                                            width={250}
                                            height={200}
                                            className='w-full h-52 object-cover rounded-t-md'
                                        />
                                        <div className='p-4 pt-2 flex flex-col gap-1'>
                                            <h1 className='text-base capitalize font-medium line-clamp-2 text-neutral-950'>{product.name}</h1>
                                            <div>
                                                <p className='text-sm text-green-600 '>
                                                    Price: {" "}
                                                    <span className=' text-neutral-600 line-through mx-2'>
                                                        ₹{product.price}
                                                    </span>
                                                    {"  "}₹ {product.price - (product.price * product.discount / 100)}
                                                </p>
                                            </div>
                                            <p className='text-sm text-neutral-600'>In stock: <span className='text-blue-600'>{product.stock}</span></p>
                                            {/* <div className='flex items-center justify-between gap-8 mt-2'>
                                                <Button size={'sm'} color={'failure'}>Delete</Button>
                                                <Button size={'sm'} color={'success'}>Edit</Button>
                                            </div> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center gap-4 mt-6 items-center">
                                <Button
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                    size={'sm'}
                                >
                                    Prev
                                </Button>
                                <div className='w-8 h-8 border rounded-md border-neutral-400 flex items-center justify-center text-base font-medium text-neutral-950'>
                                    <p>{page}</p>
                                </div>
                                <Button
                                    disabled={page === totalPage}
                                    onClick={() => setPage(page + 1)}
                                    size={'sm'}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full py-60 flex items-center justify-center">
                            <h1 className="text-2xl font-semibold text-center text-white">No products found</h1>
                        </div>
                    )
                    }
                </div>
            </section >
        </Layout>
    )
}

export default Products

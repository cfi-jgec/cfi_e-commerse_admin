"use client"

import Loader from '@/app/loading';
import Layout from '@/Components/common/CommonLayout';
import AddEditProduct from '@/Components/products/add-edit-product';
import { ActionBtn } from '@/Components/ui/link-button';
import ShowHTMLData from '@/Components/ui/show-html-data';
import { useDeleteProductsMutation, useGetProductDetailsQuery } from '@/store/feature/product-feature';
import { Badge } from 'flowbite-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const { data, isLoading, isError, error, isSuccess, refetch } = useGetProductDetailsQuery(id);
    const [currentImg, setCurrentImg] = useState('');
    const [editProduct, setEditProduct] = useState(false);
    const [deleteProduct, { isLoading: deleteLoading, isError: deleteIsError, error: deleteError, isSuccess: deleted }] = useDeleteProductsMutation();

    useEffect(() => {
        if (isError) {
            toast.error((error as any)?.data?.message || "Something went wrong");
        }
        if (deleteIsError) {
            toast.error((deleteError as any)?.data?.message || "Could not delete product");
        }
        if (isSuccess) {
            setCurrentImg(data?.product?.image[0] || "");
        }
        if (deleted) {
            toast.success("Product deleted successfully");
            router.replace('/products');
        }
        refetch();
    }, [isError, error, isSuccess, data, deleteIsError, deleteError, deleted, router, refetch, editProduct]);

    if (isLoading) {
        return <Loader />
    }

    const product = data?.product;

    return (
        <Layout
            header={editProduct ? 'Edit Product' : 'Product Details'}
            className={`${editProduct && 'bg-white'}`}
        >
            {editProduct && data?.product ?
                <AddEditProduct
                    updateData={product as any}
                    cancelEdit={() => setEditProduct(false)}
                /> :
                <section className='flex gap-8'>
                    <div className='w-1/2'>
                        <div>
                            <Image src={currentImg || ""} alt='product' width={400} height={400} />
                        </div>
                        <div className='flex gap-4 mt-4 w-full overflow-x-auto'>
                            {product?.image.map((img: string) => (
                                <div
                                    key={img}
                                    className={`cursor-pointer w-20  rounded-md overflow-hidden ${currentImg === img ? 'border-2 border-yellow-500' : ''}`}
                                    onClick={() => setCurrentImg(img)}
                                >
                                    <Image
                                        src={img}
                                        alt='product'
                                        width={100}
                                        height={100}
                                        className='w-20 h-20 object-cover'
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className='w-1/2 flex flex-col gap-3 '>
                        <h1 className='text-xl font-semibold  text-neutral-950 first-letter:uppercase'>
                            {product?.name}
                        </h1>
                        <h3 className='text-base font-normal text-neutral-800 first-letter:uppercase'>
                            {product?.subtitle}
                        </h3>
                        <ShowHTMLData
                            value={product?.description || ""}
                            className='text-sm text-neutral-600 font-normal -mb-12'
                        />
                        {product?.price && product?.discount &&
                            <div className='flex items-center gap-4 text-xl font-medium text-neutral-950'>
                                <h3 className=' line-through text-neutral-600'>₹{product.price}</h3>
                                <h3>
                                    ₹{(product.price - ((product.price * product.discount) / 100)).toFixed(2)}
                                </h3>
                                <h4 className='text-green-500'>{product.discount}%</h4>
                            </div>
                        }
                        <div className='flex items-center gap-6'>
                            <h3>In Stock: {product?.stock}</h3>
                            {product?.category && <Badge className='rounded-full capitalize px-4 py-1'>{product.category}</Badge>}
                        </div>
                        <div className='flex  items-center gap-4'>
                            <ActionBtn
                                name='Edit'
                                className='bg-green-500 hover:bg-green-600'
                                onPress={() => setEditProduct(true)}
                            />
                            <ActionBtn
                                name='Delete'
                                className='bg-red-500 hover:bg-red-600'
                                onPress={async () => await deleteProduct(id)}
                                isLoading={deleteLoading}
                            />
                        </div>
                    </div>
                </section>
            }
        </Layout>
    )
}

export default ProductDetails
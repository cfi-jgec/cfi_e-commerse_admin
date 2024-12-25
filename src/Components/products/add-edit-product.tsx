"use client"

import ImageCropUpload from '@/Components/common/CroppedImage';
import InputField from '@/Components/common/InputField';
import { useAddProductsMutation, useEditProductsMutation } from '@/store/feature/product-feature';
import { deleteStorage } from '@/utils/data';
import { Button, Label, Spinner } from 'flowbite-react';
import { ErrorMessage, Form, Formik } from 'formik'
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { FC, useEffect } from 'react'
import toast from 'react-hot-toast';
import { MdCurrencyRupee } from 'react-icons/md';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    name: yup.string().required('Product name is required'),
    description: yup.string().required('Product description is required').min(50, 'Description is too short'),
    price: yup.number().required('Product price is required').min(1, 'Price must be greater than 0'),
    discount: yup.number().max(100, 'Discount must be less than 100'),
    stock: yup.number().required('Product stock is required').min(1, 'Stock must be greater than 0'),
    // image: yup.array().length(1, 'Product image is required'),
});

interface IProductFields {
    id: string,
    productId: string,
    category: string,
    description: string,
    discount: string,
    image: string[],
    price: string,
    stock: string,
    subtitle: string,
    name: string,
}

interface IProps {
    updateData?: IProductFields | undefined
    cancelEdit?: () => void
}

const AddEditProduct: FC<IProps> = ({ updateData, cancelEdit }) => {
    const [handelSubmit, { isLoading, isError, error, isSuccess }] = useAddProductsMutation();
    const [handelUpdate, { isLoading: isUpdateLoading, isError: isUpdateError, error: updateError, isSuccess: isUpdateSuccess }] = useEditProductsMutation();


    const initialValues = {
        productId: updateData ? updateData.productId : String(Math.round(Math.random() * 1000000)),
        category: updateData ? updateData.category : '',
        description: updateData ? updateData.description : '',
        discount: updateData ? updateData.discount : '',
        image: updateData ? updateData.image : [],
        price: updateData ? updateData.price : '',
        stock: updateData ? updateData.stock : '',
        subtitle: updateData ? updateData.subtitle : '',
        name: updateData ? updateData.name : '',
    };

    useEffect(() => {
        if (isError) {
            toast.error((error as any).data.message);
        }
        if (isUpdateError) {
            toast.error((updateError as any).data.message);
        }
        if (isUpdateSuccess) {
            toast.success('Product added successfully');
            cancelEdit && cancelEdit();
        }
        if (isSuccess) {
            toast.success('Product added successfully');
        }
    }, [isError, isSuccess, error, isUpdateSuccess, isUpdateError, updateError, cancelEdit]);

    return (
        <>
            <div className='w-full bg-white'>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={async (values) => {
                        console.log(values);
                        console.log(updateData);
                        updateData ?
                            await handelUpdate({ body: values, id: updateData.id }) :
                            await handelSubmit(values);
                    }}
                    validationSchema={validationSchema}
                >{({ values, setFieldValue }) => (
                    <Form className='grid grid-cols-2 gap-8'>
                        <div>
                            <>
                                <ImageCropUpload
                                    onUploadComplete={(url) => setFieldValue('image', [...values.image, url])}
                                    aspect={4 / 3}
                                    fileType="cfi-products"
                                />
                                <ErrorMessage name="image" component="div" className="text-red-500 my-1 text-xs" />
                            </>
                            {values.image.length > 0 && (
                                <div className='grid grid-cols-3 gap-6 my-4'>
                                    {values.image.map((img, index) => (
                                        <div key={index}>
                                            <Image
                                                src={img} alt='product'
                                                width={160}
                                                height={160}
                                                className='w-full h-auto object-cover  rounded-md'
                                            />
                                            <Button
                                                onClick={async () => {
                                                    const newImg = values.image.filter((_, i) => i !== index);
                                                    setFieldValue('image', newImg);
                                                    await deleteStorage(img)
                                                }}
                                                className='bg-red-500 hover:bg-red-400 w-full mt-2'
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <InputField
                                name="name"
                                label="Product Name*"
                                placeholder="Enter product name"
                            />
                            <InputField
                                name="subtitle"
                                label="Product Subtitle"
                                placeholder="Enter product name"
                            />
                            <div className='mt-2'>
                                <Label className='text-sm'>Product Description*</Label>
                                <ReactQuill
                                    value={values.description}
                                    onChange={(value) => setFieldValue("description", value)}
                                    placeholder="Enter product description"
                                    className='h-40 mt-1 mb-12'
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div className='grid grid-cols-2 gap-6'>
                                <InputField
                                    name="price"
                                    label="Product Price*"
                                    placeholder="Product price"
                                    icon={MdCurrencyRupee}
                                />
                                <InputField
                                    name="discount"
                                    label="Product Discount*"
                                    placeholder="Product discount (%)"
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-6'>
                                <InputField
                                    name="category"
                                    label="Product Category"
                                    placeholder="Product category"
                                />
                                <InputField
                                    name="stock"
                                    label="In stock"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div></div>
                        <div className='flex items-center gap-8'>
                            <Button
                                type="submit"
                                className='bg-green-500 hover:bg-green-400 w-40'
                                disabled={isLoading || isUpdateLoading}
                            >
                                {updateData ? 'Update' : 'Submit'}
                                {isLoading && <Spinner className='ml-2' size={'sm'} />}
                            </Button>
                            <Button
                                type="reset"
                                className='bg-red-500 hover:bg-red-400 w-40'
                            >
                                Reset
                            </Button>
                        </div>
                    </Form>
                )}
                </Formik>
            </div>
        </>
    )
}

export default AddEditProduct

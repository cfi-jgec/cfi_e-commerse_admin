import Layout from '@/Components/common/CommonLayout'
import AddEditProduct from '@/Components/products/add-edit-product'
import React from 'react'

const AddProducts = () => {
    return (
        <>
            <Layout header='Add New Product' className='bg-white'>
                <AddEditProduct />
            </Layout>
        </>
    )
}

export default AddProducts
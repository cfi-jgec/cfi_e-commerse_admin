"use client"
import dynamic from 'next/dynamic'
import React, { FC } from 'react'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

interface IProps {
    value: string;
    className?: string;
}

const ShowHTMLData: FC<IProps> = ({ value, className }) => {
    return (
        <>
            <ReactQuill
                value={value}
                readOnly={true}
                theme='bubble'
                className={`removePadding ${className}`}
            />
        </>
    )
}

export default ShowHTMLData
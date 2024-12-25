
"use client"
import { Button, Spinner } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'

interface IProps {
    name: string;
    link: string;
    params?: any;
    className?: string;
    disabled?: boolean;
}

interface IActionBtn {
    name: string;
    onPress: () => void;
    className?: string;
    isLoading?: boolean;
    disabled?: boolean;
}

export const LinkButton: FC<IProps> = ({ name, link, params, className, disabled = false }) => {
    const router = useRouter()
    return (
        <Button
            onClick={() => router.push(link, params)}
            className={`w-full text-sm font-medium text-white ${className}`}
            disabled={disabled}
        >
            {name}
        </Button>
    )
}

export const ActionBtn: FC<IActionBtn> = ({ name, onPress, className, disabled, isLoading }) => {
    return (
        <Button
            onClick={onPress}
            className={`w-full text-sm font-medium text-white ${className}`}
            disabled={disabled || isLoading}
        >
            {name}
            {isLoading && <Spinner className="ml-2" size={'sm'} />}
        </Button>
    )
}
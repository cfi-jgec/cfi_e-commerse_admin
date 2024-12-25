"use client";

import axios from "axios";
import { Form, Formik } from "formik";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import InputField from "@/Components/common/InputField";
import { useRouter } from "next/navigation";
import CommonLayout from "@/Components/auth/CommonLayout";
import { validate } from "@/utils/ValidateSchema";
import { useEffect, useState } from "react";
import { useLoginMutation } from "@/store/baseApi";
import { Spinner } from "flowbite-react";

const LogIn: React.FC = () => {
    const router = useRouter();
    const [login, { isError, isLoading, error, isSuccess }] = useLoginMutation();

    useEffect(() => {
        if (isError) { 
            toast.error((error as any)?.data?.message);
        }
        if (isSuccess) {
            router.push("/");
        }
    }, [isError, isSuccess, error, router]);

    return (
        <>
            <CommonLayout>
                <div className="w-1/2 max-w-md bg-white p-8 rounded-2xl shadow-lg border">
                    <h3 className="text-xl font-medium text-gray-600 mb-4">
                        Welcome Back!
                    </h3>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={validate}
                        onSubmit={async (values) => await login(values)}
                    >
                        {(formik) => (
                            <Form>
                                <InputField
                                    name="email"
                                    label="Your Email"
                                    placeholder="name@gmail.com"
                                    icon={MdEmail}
                                />
                                <InputField
                                    name="password"
                                    type="password"
                                    label="Your Password"
                                    placeholder="********"
                                    icon={RiLockPasswordFill}
                                />
                                <div className="mt-6">
                                    <button
                                        className="button  bg-green-500 me-6 disabled:bg-green-300"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        Log in{" "}
                                        {isLoading && (
                                            <Spinner size="sm" className="ms-2" />
                                        )}
                                    </button>
                                    <button className="button bg-red-500" type="reset">
                                        Reset{" "}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </CommonLayout>
        </>
    );
};

export default LogIn;


import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"


export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        const isCorrectEmail = email === process.env.EMAIL;
        if (!isCorrectEmail) return NextResponse.json({ message: "Email not exist" }, { status: 401 });
        const isCorrectPassword = password === process.env.PASSWORD;
        if (!isCorrectPassword) return NextResponse.json({ message: "Incorrect Password" }, { status: 401 });
        // create token 
        const token = jwt.sign({ id: email }, process.env.JWT_SECRET as string, {
            expiresIn: "1d",
        });
        // create response
        const response = NextResponse.json(
            {
                message: "log in successful",
                success: true,
                error: false,
            },
            { status: 201 }
        );
        response.cookies.set("token", token, { httpOnly: true });
        return response;
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            message: "Internal Server Error",
            error: true,
            error_message: error.message,
            success: false,
        }, { status: 500 })
    }
} 
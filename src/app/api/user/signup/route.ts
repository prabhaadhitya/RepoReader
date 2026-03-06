import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { connectDB } from "@/lib/db"
import User from "@/modules/user/user.model"

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();
        const { email, password } = body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            )
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                email,
                password: hashedPassword
            })

            return NextResponse.json(
                { message: "User created", user },
                { status: 201 }
            )
        }
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", error },
            { status: 500 }
        )
    }
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useState } from "react";
import { Eye, EyeSlash } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";



export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("")

        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const image = form.photo.value;
        const password = form.password.value;

        // Password Validation
        if (!/[A-Z]/.test(password)) {
            return setError(
                "Password must contain at least one uppercase letter."
            );
        }

        if (!/[a-z]/.test(password)) {
            return setError(
                "Password must contain at least one lowercase letter."
            );
        }

        if (password.length < 6) {
            return setError(
                "Password must be at least 6 characters long."
            );
        }

        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
            image,
        });

        if (error) {
            setError(error.message);
            return;
        }

        setSuccess("Account created successfully! Welcome to Wisdomio.");
        form.reset();

        console.log(data);
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-8">
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <Image
                            src="/logo.png"
                            alt="Wisdomio"
                            width={80}
                            height={80}
                            className="mb-4"
                        />

                        <h1 className="text-3xl font-bold text-emerald-600">
                            Wisdomio
                        </h1>

                        <p className="text-emerald-500 text-center mt-2">
                            Create your account and start sharing wisdom.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5 space-x-2">
                        <Input
                            name="name"
                            label="Name"
                            placeholder="Enter your name"
                            variant="bordered"
                            isRequired
                        />

                        <Input
                            type="email"
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            variant="bordered"
                            isRequired
                        />

                        <Input
                            name="photo"
                            label="Photo URL"
                            placeholder="Paste your photo URL"
                            variant="bordered"
                            isRequired
                        />

                        <Input
                            name="password"
                            label="Password"
                            placeholder="Create a password"
                            variant="bordered"
                            isRequired
                            type={showPassword ? "text" : "password"}
                            endContent={
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeSlash className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            }
                        />

                        {/* Password Rules */}
                        <div className="text-xs text-black bg-emerald-50 p-3 rounded-xl">
                            <p>Password must contain:</p>
                            <ul className="list-disc ml-4 mt-1 space-y-1">
                                <li>At least one uppercase letter</li>
                                <li>At least one lowercase letter</li>
                                <li>Minimum 6 characters</li>
                            </ul>
                        </div>

                        {error && (
                            <p className="text-sm text-danger">
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className="text-sm text-emerald-600 font-medium">
                                {success}
                            </p>
                        )}

                        <Button
                            type="submit"
                            color="success"
                            size="lg"
                            className="w-full font-semibold"
                        >
                            Create Account
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t" />
                        <span className="px-3 text-sm text-black">
                            OR
                        </span>
                        <div className="flex-1 border-t" />
                    </div>

                    {/* Google Login */}
                    <Button
                        variant="bordered"
                        size="lg"
                        className="w-full text-black"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 48 48"
                        >
                            <path
                                fill="#FFC107"
                                d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
                            />
                        </svg>

                        Continue with Google
                    </Button>

                    {/* Login Link */}
                    <p className="text-center text-sm text-black mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-emerald-600 font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
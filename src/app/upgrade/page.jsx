"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import {
    CrownDiamond,
    Check,
    Xmark,
} from "@gravity-ui/icons";

const features = [
    {
        feature: "Life Lessons Creation",
        free: "Up to 20 lessons",
        premium: "Unlimited",
    },
    {
        feature: "Create Premium Lessons",
        free: false,
        premium: true,
    },
    {
        feature: "Access Premium Lessons",
        free: false,
        premium: true,
    },
    {
        feature: "Ad-Free Experience",
        free: false,
        premium: true,
    },
    {
        feature: "Priority Listing in Public Lessons",
        free: false,
        premium: true,
    },
    {
        feature: "Verified Community Badge",
        free: false,
        premium: true,
    },
    {
        feature: "Priority Support",
        free: false,
        premium: true,
    },
    {
        feature: "Advanced Analytics",
        free: false,
        premium: true,
    },
];

export default function UpgradePage() {
    return (
        <section className="min-h-screen bg-zinc-50 py-14">
            <div className="mx-auto max-w-6xl px-4">

                {/* Hero */}

                <div className="mb-12 text-center">

                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
                        <CrownDiamond className="h-10 w-10 text-yellow-500" />
                    </div>

                    <h1 className="text-5xl font-bold">
                        Upgrade to Premium
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
                        Unlock unlimited learning, exclusive premium
                        life lessons, and stand out in the WisdomIO
                        community.
                    </p>
                </div>

                {/* Comparison Table */}

                <div className="overflow-x-auto rounded-2xl border bg-white shadow">

                    <table className="w-full min-w-[900px]">

                        <thead className="bg-emerald-600 text-white">

                            <tr>

                                <th className="px-6 py-5 text-left text-lg">
                                    Feature
                                </th>

                                <th className="px-6 py-5 text-center text-lg">
                                    Free
                                </th>

                                <th className="px-6 py-5 text-center text-lg">
                                    Premium ⭐
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {features.map((item) => (

                                <tr
                                    key={item.feature}
                                    className="border-t"
                                >

                                    <td className="px-6 py-5 font-medium">
                                        {item.feature}
                                    </td>

                                    <td className="px-6 py-5 text-center">

                                        {typeof item.free === "boolean" ? (
                                            item.free ? (
                                                <Check className="mx-auto h-6 w-6 text-green-600" />
                                            ) : (
                                                <Xmark className="mx-auto h-6 w-6 text-red-500" />
                                            )
                                        ) : (
                                            item.free
                                        )}

                                    </td>

                                    <td className="bg-emerald-50 px-6 py-5 text-center font-medium">

                                        {typeof item.premium === "boolean" ? (
                                            item.premium ? (
                                                <Check className="mx-auto h-6 w-6 text-green-600" />
                                            ) : (
                                                <Xmark className="mx-auto h-6 w-6 text-red-500" />
                                            )
                                        ) : (
                                            item.premium
                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* CTA */}

                <div className="mt-14 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 p-10 text-center text-white">

                    <h2 className="text-3xl font-bold">
                        Ready to unlock your full potential?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-emerald-100">
                        Become a Premium member today and enjoy unlimited
                        lesson creation, exclusive community features,
                        and access to premium wisdom shared by others.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">

                        <form action="/api/checkout_sessions" method="POST">
                            <section>
                                <button className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10" type="submit" role="link">
                                    Checkout
                                </button>
                            </section>
                        </form>

                        <Link
                            href="/public-lessons"
                            className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            Continue with Free Plan
                        </Link>


                    </div>

                </div>

            </div>
        </section>
    );
}
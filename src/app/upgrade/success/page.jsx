
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@heroui/react";
import { stripe } from "@/lib/stripe";


export default async function Success({
    searchParams,
}) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error(
            "Please provide a valid session_id."
        );
    }

    const session =
        await stripe.checkout.sessions.retrieve(
            session_id,
            {
                expand: [
                    "line_items",
                    "payment_intent",
                ],
            }
        );

    if (session.status === "open") {
        redirect("/");
    }

    if (session.status !== "complete") {
        redirect("/");
    }

    const customerEmail =
        session.customer_details?.email;

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-6 py-16">

            {/* Background Decorations */}

            <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />

            <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-green-300/20 blur-3xl" />

            {/* Card */}

            <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-emerald-100 bg-white p-10 shadow-2xl">

                {/* Success */}

                <div className="flex justify-center">

                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-5xl shadow">
                        🎉
                    </div>

                </div>

                <h1 className="mt-8 text-center text-5xl font-bold text-zinc-900">
                    Welcome to WisdomIO Premium!
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-8 text-zinc-600">
                    Thank you for supporting WisdomIO.
                    Your payment was successful and your
                    Premium journey starts today.
                </p>

                {/* Benefits */}

                <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-8">

                    <h2 className="mb-6 text-center text-2xl font-bold">
                        Premium Benefits Unlocked ✨
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">

                        <div className="rounded-xl bg-white p-4 shadow-sm">
                            ✅ Unlimited Life Lessons
                        </div>

                        <div className="rounded-xl bg-white p-4 shadow-sm">
                            ⭐ Create Premium Lessons
                        </div>

                        <div className="rounded-xl bg-white p-4 shadow-sm">
                            🔓 Access Premium Content
                        </div>

                        <div className="rounded-xl bg-white p-4 shadow-sm">
                            🚀 Priority Public Listing
                        </div>

                        <div className="rounded-xl bg-white p-4 shadow-sm">
                            💎 Premium Member Badge
                        </div>

                        <div className="rounded-xl bg-white p-4 shadow-sm">
                            🚫 Ad-Free Experience
                        </div>

                    </div>

                </div>

                {/* Email */}

                <div className="mt-8 rounded-xl border bg-zinc-50 p-5 text-center">

                    <p className="text-sm text-zinc-500">
                        Confirmation Email
                    </p>

                    <p className="mt-2 text-lg font-semibold text-emerald-700">
                        {customerEmail}
                    </p>

                </div>

                {/* Quote */}

                <div className="mt-8 rounded-xl bg-zinc-50 p-6 text-center">

                    <p className="text-lg italic text-zinc-600">
                        "Every lesson shared has the power to
                        change someone's life."
                    </p>

                </div>

                {/* CTA */}

                <div className="mt-10 flex flex-wrap justify-center gap-4">

                    <Link href="/dashboard/user">
                        <Button color="success" size="lg">
                            Go to Dashboard
                        </Button>
                    </Link>

                    <Link href="/public-lessons">
                        <Button
                            variant="bordered"
                            color="success"
                            size="lg"
                        >
                            Explore Lessons
                        </Button>
                    </Link>

                </div>

                {/* Footer */}

                <p className="mt-10 text-center text-sm text-zinc-500">
                    Need help? Contact us anytime at{" "}
                    <a
                        href="mailto:support@wisdomio.com"
                        className="font-medium text-emerald-600 hover:underline"
                    >
                        support@wisdomio.com
                    </a>
                </p>

            </div>

        </section>
    );
}
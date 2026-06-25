import { Card } from "@heroui/react";
import {
    BookOpen,
    ArrowUpRight,
    Sparkles,
    Archive,
} from "@gravity-ui/icons";

const benefits = [
    {
        title: "Preserve Hard-Earned Wisdom",
        description:
            "Don't let valuable life lessons fade away. Record experiences and insights for future reflection.",
        icon: BookOpen,
    },
    {
        title: "Reflect and Grow",
        description:
            "Looking back on your experiences helps you identify patterns and make wiser decisions.",
        icon: ArrowUpRight,
    },
    {
        title: "Inspire Others",
        description:
            "Share meaningful lessons that can encourage and guide others.",
        icon: Sparkles,
    },
    {
        title: "Create a Legacy of Learning",
        description:
            "Build a lasting collection of wisdom that grows throughout your life.",
        icon: Archive,
    },
];

export default function WhyLearningMatters() {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">
                        Why Learning From Life Matters
                    </h2>

                    <p className="mt-4 max-w-2xl mx-auto text-default-500">
                        Every experience holds a lesson. Preserve your wisdom,
                        reflect on your growth, and inspire others through the
                        stories that shaped you.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;

                        return (
                            <Card key={benefit.title}>
                                <div className="p-6">
                                    <div className="mb-4 inline-flex rounded-xl bg-emerald-100 p-3 text-emerald-600">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mb-3 text-xl font-semibold">
                                        {benefit.title}
                                    </h3>

                                    <p className="text-default-500">
                                        {benefit.description}
                                    </p>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
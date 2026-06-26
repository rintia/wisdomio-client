"use client";

import React, { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Select,
    ListBox,
    Button,
    toast,
} from "@heroui/react";
import { BookOpen } from "@gravity-ui/icons";
import { createLesson } from "@/lib/actions/lessons";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function CreateLessonPage() {
    // Replace with session/user data later
    const [isPremiumUser] = useState(false);
    const { data: session, isPending } = useSession();
    const user = session?.user;
    const [errors, setErrors] = useState({});

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const newErrors = {};

        if (!data.title)
            newErrors.title = "Lesson title is required";

        if (!data.description)
            newErrors.description = "Story / insight is required";

        if (!data.category)
            newErrors.category = "Category is required";

        if (!data.tone)
            newErrors.tone = "Emotional tone is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const payload = {
            ...data,
            image: data.image || "",
            accessLevel: isPremiumUser
                ? data.accessLevel || "free"
                : "free",
            userId: user.id,
            author: user.name,
            authorEmail: user.email,
            authorImage: user.image,
            visibility: "public",
            likes: [],
            likesCount: 0,
            createdAt: new Date(),
        };

        console.log(payload);
        try {
            const res = await createLesson(payload);

            if (res.insertedId) {
                toast.success("Lesson posted successfully!");

                e.target.reset();

                router.push("/dashboard/user");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create lesson.");
        }

        e.target.reset();
    };

    const textInputClass =
        "w-full bg-white border border-zinc-200 hover:border-zinc-300 focus:border-emerald-500 rounded-lg h-12 px-3 text-sm outline-none transition-all";

    const textAreaClass =
        "w-full bg-white border border-zinc-200 hover:border-zinc-300 focus:border-emerald-500 rounded-lg p-3 text-sm outline-none transition-all";

    const triggerClasses =
        "w-full flex items-center justify-between bg-white border border-zinc-200 hover:border-zinc-300 h-12 rounded-lg px-3 transition-all text-sm outline-none data-[focused=true]:border-emerald-500";

    const popoverClasses =
        "bg-white border border-zinc-200 rounded-lg shadow-xl p-1";

    const listItemClasses =
        "p-2 rounded-md hover:bg-zinc-100 cursor-pointer text-sm outline-none";

    return (
        <div className="min-h-screen bg-zinc-50 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">

                {/* Header */}
                <div className="border-b border-zinc-200 pb-6 mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-emerald-600" />
                        Create Life Lesson
                    </h1>

                    <p className="text-zinc-500 mt-2">
                        Share your experience, insight, and wisdom with the community.
                    </p>
                </div>

                <Form
                    onSubmit={handleSubmit}
                    validationErrors={errors}
                    validationBehavior="aria"
                    className="space-y-8 "
                >
                    <Fieldset className="space-y-6 w-full">

                        {/* Lesson Title */}
                        <TextField
                            name="title"
                            isInvalid={!!errors.title}
                            className="flex flex-col gap-1 w-full"
                        >
                            <Label>Lesson Title</Label>

                            <Input
                                placeholder="Enter a meaningful lesson title"
                                className={textInputClass}
                            />

                            {errors.title && (
                                <FieldError>
                                    {errors.title}
                                </FieldError>
                            )}
                        </TextField>

                        {/* Description */}
                        <TextField
                            name="description"
                            isInvalid={!!errors.description}
                            className="flex flex-col gap-1 w-full"
                        >
                            <Label>
                                Full Description / Story / Insight
                            </Label>

                            <TextArea
                                rows={8}
                                placeholder="Tell your story and share what you learned..."
                                className={textAreaClass}
                            />

                            {errors.description && (
                                <FieldError>
                                    {errors.description}
                                </FieldError>
                            )}
                        </TextField>

                        {/* Image URL */}
                        <TextField
                            name="image"
                            className="flex flex-col gap-1 w-full"
                        >
                            <Label>Image URL (Optional)</Label>

                            <Input
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                className={textInputClass}
                            />
                        </TextField>


                        {/* Category + Tone */}
                        <div className="grid md:grid-cols-2 gap-6">

                            {/* Category */}
                            <Select
                                name="category"
                                isInvalid={!!errors.category}
                            >
                                <Label>Category</Label>

                                <Select.Trigger
                                    className={triggerClasses}
                                >
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>

                                <Select.Popover
                                    className={popoverClasses}
                                >
                                    <ListBox>
                                        <ListBox.Item
                                            id="Personal Growth"
                                            className={listItemClasses}
                                        >
                                            Personal Growth
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="Career"
                                            className={listItemClasses}
                                        >
                                            Career
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="Relationships"
                                            className={listItemClasses}
                                        >
                                            Relationships
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="Mindset"
                                            className={listItemClasses}
                                        >
                                            Mindset
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="Mistakes Learned"
                                            className={listItemClasses}
                                        >
                                            Mistakes Learned
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            {/* Emotional Tone */}
                            <Select
                                name="tone"
                                isInvalid={!!errors.tone}
                            >
                                <Label>Emotional Tone</Label>

                                <Select.Trigger
                                    className={triggerClasses}
                                >
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>

                                <Select.Popover
                                    className={popoverClasses}
                                >
                                    <ListBox>
                                        <ListBox.Item
                                            id="Motivational"
                                            className={listItemClasses}
                                        >
                                            Motivational
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="Sad"
                                            className={listItemClasses}
                                        >
                                            Sad
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="Realization"
                                            className={listItemClasses}
                                        >
                                            Realization
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="Gratitude"
                                            className={listItemClasses}
                                        >
                                            Gratitude
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>



                        {/* Access Level */}
                        <div className="space-y-2">
                            <Select
                                name="accessLevel"
                                isDisabled={!isPremiumUser}
                                defaultSelectedKeys={["free"]}
                            >
                                <Label>Access Level</Label>

                                <Select.Trigger
                                    className={triggerClasses}
                                >
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>

                                <Select.Popover
                                    className={popoverClasses}
                                >
                                    <ListBox>
                                        <ListBox.Item
                                            id="free"
                                            className={listItemClasses}
                                        >
                                            Free
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="premium"
                                            className={listItemClasses}
                                        >
                                            Premium
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            {!isPremiumUser && (
                                <p className="text-xs text-amber-600">
                                    Upgrade to Premium to create paid
                                    lessons.
                                </p>
                            )}
                        </div>
                    </Fieldset>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 w-full">
                        <Button
                            variant="bordered"
                            type="button"
                        >
                            Cancel
                        </Button>

                        <Button
                            color="success"
                            type="submit"
                        >
                            Publish Lesson
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
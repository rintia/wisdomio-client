"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import {
    Button,
    Modal,
} from "@heroui/react";

import { TriangleExclamation } from "@gravity-ui/icons";

import { useSession } from "@/lib/auth-client";
import { reportLesson } from "@/lib/api/report";

const reasons = [
    "Spam",
    "False Information",
    "Offensive Content",
    "Harassment",
    "Other",
];

export default function ReportLessonButton({ lesson }) {
    const { data } = useSession();
    const user = data?.user;

    const [isOpen, setIsOpen] = useState(false);
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReport = async (close) => {
        if (!user) {
            toast.error("Please sign in first.");
            return;
        }

        if (!reason) {
            toast.error("Please select a reason.");
            return;
        }

        try {
            setLoading(true);

            const res = await reportLesson({
                lessonId: lesson._id,
                reporterUserId: user.id,
                reason,
            });

            if (res.success) {
                toast.success("Report submitted.");
                setReason("");
                close();
            } else {
                toast.error(res.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal>
            <Button
                color="danger"
                variant="flat"
                onPress={() => setIsOpen(true)}
            >
                <TriangleExclamation className="h-4 w-4" />
                <span>Report Lesson</span>
            </Button>

            <Modal.Backdrop
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            >
                <Modal.Container placement="center">
                    <Modal.Dialog className="max-w-md">
                        {({ close }) => (
                            <>
                                <Modal.CloseTrigger />

                                <Modal.Header>
                                    <Modal.Heading>
                                        Report Lesson
                                    </Modal.Heading>
                                </Modal.Header>

                                <Modal.Body>
                                    <p className="mb-3 text-sm text-default-500">
                                        Why are you reporting this lesson?
                                    </p>

                                    <select
                                        className="w-full rounded-xl border border-default-300 bg-background p-3"
                                        value={reason}
                                        onChange={(e) =>
                                            setReason(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Select a reason
                                        </option>

                                        {reasons.map((item) => (
                                            <option
                                                key={item}
                                                value={item}
                                            >
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button
                                        variant="flat"
                                        onPress={close}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        color="danger"
                                        isLoading={loading}
                                        onPress={() =>
                                            handleReport(close)
                                        }
                                    >
                                        Submit Report
                                    </Button>
                                </Modal.Footer>
                            </>
                        )}
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
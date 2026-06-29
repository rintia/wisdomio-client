"use client";

import { Modal, Button } from "@heroui/react";
import { Eye } from "@gravity-ui/icons";

export default function ReportReasonsModal({ lesson,
    isOpen,
    onClose }) {

      if (!lesson) return null;
  return (
    <Modal>
      <Button size="sm" variant="flat">
        <Eye className="mr-2 h-4 w-4" />
        View
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="max-w-2xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>
                Reports for "{lesson.title}"
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <div className="max-h-[500px] space-y-4 overflow-y-auto">
                {lesson.reports.map((report, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-default p-4"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <img
                        src={
                          report.reporter?.image ||
                          "/default-avatar.png"
                        }
                        alt={report.reporter?.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <div>
                        <h3 className="font-semibold">
                          {report.reporter?.name}
                        </h3>

                        <p className="text-sm text-zinc-500">
                          {report.reporter?.email}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-red-50 p-3">
                      <p className="font-semibold text-red-600">
                        Reason
                      </p>

                      <p>{report.reason}</p>
                    </div>

                    <p className="mt-3 text-sm text-zinc-500">
                      {new Date(report.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
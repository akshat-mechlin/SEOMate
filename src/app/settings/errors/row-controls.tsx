"use client";

import { useTransition } from "react";
import { Check } from "lucide-react";
import type { SystemError } from "@/db/schema";

export function ErrorRowControls({
  error,
  resolveAction,
}: {
  error: SystemError;
  resolveAction: (id: number) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <button
        type="button"
        onClick={() =>
          startTransition(async () => {
            await resolveAction(error.id);
          })
        }
        disabled={pending}
        className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/30 hover:bg-emerald-500/20 disabled:opacity-50"
      >
        <Check className="size-3" />
        {pending ? "Resolving…" : "Mark resolved"}
      </button>
    </div>
  );
}

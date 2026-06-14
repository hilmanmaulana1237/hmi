import type { ReactNode } from "react";
import { SearchX } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-[1.35rem] border border-dashed border-[#BCD7CA] bg-white p-8 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#F4F8F6] text-[#006B3F]">
        <SearchX className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-xl font-black text-[#003324]">{title}</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#4B6259]">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

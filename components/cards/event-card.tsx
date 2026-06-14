import { CalendarClock, MapPin } from "lucide-react";

type EventCardProps = {
  event: {
    title: string;
    date: string;
    time: string;
    location: string;
    status: string;
  };
};

const statusClassName: Record<string, string> = {
  "Akan Datang": "bg-[#E8F7EF] text-[#006B3F]",
  Berlangsung: "bg-[#FFF7E4] text-[#8A6200]",
  Selesai: "bg-[#EEF2F0] text-[#4B6259]",
};

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#DCE8E2] bg-white p-5 shadow-[0_14px_40px_rgba(0,61,43,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold leading-snug text-[#10231C]">
          {event.title}
        </h3>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            statusClassName[event.status] ?? "bg-[#EEF2F0] text-[#4B6259]"
          }`}
        >
          {event.status}
        </span>
      </div>
      <div className="mt-auto pt-5 space-y-3 text-sm text-[#4B6259]">
        <p className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4 text-[#006B3F]" />
          {event.date}, {event.time}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#006B3F]" />
          {event.location}
        </p>
      </div>
    </article>
  );
}

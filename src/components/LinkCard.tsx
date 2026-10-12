"use client";

type LinkCardProps = {
  id: string;
  title: string;
  url: string;
};

function recordClick(linkId: string) {
  const body = JSON.stringify({ linkId });
  // sendBeacon은 페이지를 떠나도 요청이 끝까지 전송되므로 링크 이동을 막지 않습니다.
  const sent =
    typeof navigator.sendBeacon === "function" &&
    navigator.sendBeacon("/api/click", new Blob([body], { type: "application/json" }));

  if (!sent) {
    fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }
}

export default function LinkCard({ id, title, url }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(id)}
      className="block w-full rounded-2xl border border-white/60 bg-white/45 px-6 py-[18px] text-center text-[15px] font-semibold text-stone-800 shadow-[0_4px_24px_-8px_rgba(150,90,50,0.18)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_8px_28px_-8px_rgba(150,90,50,0.26)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-100 dark:hover:bg-white/[0.1]"
    >
      {title}
    </a>
  );
}

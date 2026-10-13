"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type LinkListProps = {
  links: LinkItem[];
};

type Counts = Record<string, number>;

export default function LinkList({ links }: LinkListProps) {
  // 데이터를 받기 전에는 모든 링크를 0회로 보여 줍니다.
  const [counts, setCounts] = useState<Counts>(() => Object.fromEntries(links.map((link) => [link.id, 0])));

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/click", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data: { counts: Counts }) => {
        // 응답을 기다리는 동안 눌린 클릭은 서버 값에 이미 포함됐을 수 있으므로 서버 값을 그대로 씁니다.
        setCounts((prev) => ({ ...prev, ...data.counts }));
      })
      .catch((error) => {
        if (error.name !== "AbortError") console.error("클릭 수를 불러오지 못했습니다:", error);
      });

    return () => controller.abort();
  }, []);

  const handleClick = (linkId: string) => {
    // 서버 기록과 별개로 화면의 숫자를 바로 1 올립니다.
    setCounts((prev) => ({ ...prev, [linkId]: (prev[linkId] ?? 0) + 1 }));
  };

  return (
    <ul className="mt-12 flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            id={link.id}
            title={link.title}
            url={link.url}
            count={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}

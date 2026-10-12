import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* 글래스 카드 뒤로 은은하게 비치는 따뜻한 빛 번짐 (장식용) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-orange-100/80 blur-3xl dark:bg-amber-700/20" />
        <div className="absolute -right-20 top-1/2 h-80 w-80 rounded-full bg-orange-200/60 blur-3xl dark:bg-orange-800/20" />
      </div>

      <div className="absolute right-5 top-5 z-10 sm:right-8 sm:top-8">
        <ThemeToggle />
      </div>

      <section className="relative mx-auto flex w-full max-w-md flex-col px-7 pb-20 pt-24 sm:pt-28">
        <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />

        <ul className="mt-12 flex flex-col gap-4">
          {profile.links.map((link) => (
            <li key={link.id}>
              <LinkCard id={link.id} title={link.title} url={link.url} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

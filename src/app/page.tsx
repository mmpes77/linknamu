import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      {/* wireframe의 바깥 테두리 상자: 프로필과 링크 카드를 하나의 카드 안에 담습니다. */}
      <section className="relative w-full max-w-sm rounded-3xl border border-gray-200 bg-white px-6 pb-10 pt-20 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:px-10">
        <div className="absolute right-3 top-3">
          <ThemeToggle />
        </div>

        <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />

        <ul className="mt-8 flex flex-col gap-4">
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

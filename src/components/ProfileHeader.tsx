import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl?: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative h-28 w-28 overflow-hidden rounded-full bg-orange-100 shadow-[0_8px_30px_-8px_rgba(180,100,50,0.35)] ring-4 ring-white/70 dark:bg-stone-800 dark:ring-white/10 sm:h-32 sm:w-32">
        {imageUrl ? (
          <Image src={imageUrl} alt={`${name} 프로필 사진`} fill sizes="128px" className="object-cover" priority />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-4xl font-bold text-orange-700 dark:text-orange-200">
            {name.charAt(0)}
          </span>
        )}
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">{name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-stone-500 [word-break:keep-all] dark:text-stone-400">{bio}</p>
    </header>
  );
}

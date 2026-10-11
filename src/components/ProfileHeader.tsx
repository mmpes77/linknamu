import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl?: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-gray-200 bg-emerald-100 dark:border-gray-700 dark:bg-emerald-900 sm:h-36 sm:w-36">
        {imageUrl ? (
          <Image src={imageUrl} alt={`${name} 프로필 사진`} fill sizes="144px" className="object-cover" priority />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-4xl font-bold text-emerald-700 dark:text-emerald-200">
            {name.charAt(0)}
          </span>
        )}
      </div>
      <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100">{name}</h1>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{bio}</p>
    </header>
  );
}

export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 폴더 기준 경로. 비워두면 이름 첫 글자로 대체됩니다. */
  imageUrl?: string;
  links: LinkItem[];
};

// TODO: 보여 주기용 더미 값입니다. 실제 이름, 소개, 사진, 링크로 바꿔 주세요.
export const profile: Profile = {
  name: "홍길동",
  bio: "세계 최강 바이브 코더",
  imageUrl: "/profile-placeholder.svg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com" },
    { id: "blog", title: "Blog", url: "https://velog.io" },
  ],
};

import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Tushar",
  lastName: "Ramgirkar",
  displayName: "Tushar Ramgirkar",
  username: "itushr",
  gender: "male",
  pronouns: "he/him",
  bio: "Creating with code. Small details matter.",
  flipSentences: [
    "Suffered enough from CORS errors.",
    "System first, Code later.",
    "Building with MERN stack.",
    "Powered by Linux.",
    "404: Work-Life Balance Not Found.",
  ],
  address: "Pune, India",
  phoneNumberB64: "KzkxODMyOTQ5NzQ2MQ==", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  emailB64: "Y29udGFjdEBpYW10dXNoYXIuaW4=", // base64 encoded
  website: "https://iamtushar.in",
  jobTitle: "Unemployed",
  jobs: [
    // {
    //   title: "Design Engineer",
    //   company: "shadcncraft",
    //   website: "https://shadcncraft.com?atp=ncdai",
    //   experienceId: "shadcncraft",
    // },
    // {
    //   title: "Founder",
    //   company: "Nothing",
    //   website: "https://nothing.com",
    //   experienceId: "nothing",
    // },
  ],
  about: `- I’m Chánh Đại (call me Dai) — a Design Engineer with 5+ years of experience, known for pixel-perfect execution and an obsessive attention to detail.
- Passionate about exploring new technologies and turning ideas into reality through polished, thoughtfully crafted projects.
- Creator of [chanhdai.com](https://github.com/ncdai/chanhdai.com) (2.2k stars), [React Wheel Picker](https://react-wheel-picker.chanhdai.com) (50k+ weekly downloads, ▲ Vercel OSS Program), and [ZaDark](https://zadark.com) (80k+ downloads, 30k+ users) — peak metrics.
`,
  avatar: "https://avatars.githubusercontent.com/u/172966899?v=4",
  avatarSketch: "https://avatars.githubusercontent.com/u/172966899?v=4",
  avatarVariants: {
    lightOff: "https://avatars.githubusercontent.com/u/172966899?v=4",
    lightOn: "https://avatars.githubusercontent.com/u/172966899?v=4",
    darkOff: "https://avatars.githubusercontent.com/u/172966899?v=4",
    darkOn: "https://avatars.githubusercontent.com/u/172966899?v=4",
  },
  ogImage:
    "https://assets.chanhdai.com/images/screenshot-og-image-dark.png?t=1778602757",
  namePronunciationUrl: "https://assets.chanhdai.com/audio/chanhdai.mp3",
  timeZone: "Asia/Kolkata",
  keywords: [
    "ncdai",
    "nguyenchanhdai",
    "nguyen chanh dai",
    "chanhdai",
    "chanh dai",
    "iamncdai",
    "quaric",
    "zadark",
    "nguyễn chánh đại",
    "chánh đại",
  ],
  dateCreated: "2023-10-20", // YYYY-MM-DD
}

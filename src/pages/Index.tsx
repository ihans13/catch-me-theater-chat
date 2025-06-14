
import TheaterStage from "@/components/TheaterStage";
import AvatarRows from "@/components/AvatarRows";
import CatchMeChat from "@/components/CatchMeChat";

const presenter = {
  name: "Jordan Robinson",
  avatarUrl: "https://randomuser.me/api/portraits/men/99.jpg",
};

const audience = [
  { name: "Taylor Smith", avatarUrl: "https://randomuser.me/api/portraits/men/65.jpg" },
  { name: "Sam Park", avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg" },
  { name: "Ava Lee", avatarUrl: "https://randomuser.me/api/portraits/women/85.jpg" },
  { name: "Tony Qian", avatarUrl: "https://randomuser.me/api/portraits/men/68.jpg" },
  { name: "Lisa Chen", avatarUrl: "https://randomuser.me/api/portraits/women/43.jpg" },
  { name: "Noah Kim", avatarUrl: "https://randomuser.me/api/portraits/men/91.jpg" },
  { name: "Ella Tran", avatarUrl: "https://randomuser.me/api/portraits/women/93.jpg" },
  { name: "Mason Diaz", avatarUrl: "https://randomuser.me/api/portraits/men/73.jpg" },
  { name: "Olivia Cruz", avatarUrl: "https://randomuser.me/api/portraits/women/57.jpg" },
  { name: "Liam Patel", avatarUrl: "https://randomuser.me/api/portraits/men/49.jpg" },
  { name: "Mia Kumar", avatarUrl: "https://randomuser.me/api/portraits/women/72.jpg" },
  { name: "Ethan Nguyen", avatarUrl: "https://randomuser.me/api/portraits/men/44.jpg" },
];

export default function Index() {
  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col pb-40">
      <div className="flex flex-col items-center pt-10 mb-2">
        <TheaterStage presenter={presenter} />
      </div>
      <div className="flex-grow flex flex-col items-center justify-start">
        <AvatarRows audience={audience} />
      </div>
      <CatchMeChat />
    </div>
  );
}

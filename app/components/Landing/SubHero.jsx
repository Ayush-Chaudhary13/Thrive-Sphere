import { UserGroupIcon, LightBulbIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const features = [
  {
    Icon: UserGroupIcon,
    title: "Community Support",
    desc: "Connect and share with others who understand your health journey.",
  },
  {
    Icon: LightBulbIcon,
    title: "Expert Guidance",
    desc: "Access resources and insights tailored by health professionals.",
  },
  {
    Icon: ChatBubbleLeftRightIcon,
    title: "Active Conversations",
    desc: "Engage in real discussions, ask questions, and get inspired.",
  },
];

export default function SubHero() {
  return (
    <section className="flex justify-center bg-[#1E252B] py-16 px-4">
      <div className="max-w-5xl w-full grid md:grid-cols-3 gap-7">
        {features.map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-4 p-7 rounded-2xl bg-[#23272F] shadow-lg hover:ring-2 hover:ring-[#14B8A6] transition"
          >
            <Icon className="h-9 w-9 text-[#14B8A6]" />
            <h3 className="font-bold text-lg text-teal-400">{title}</h3>
            <div className="text-sm text-gray-300 text-center">{desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { Card } from "@/components/ui/card";
import Image from "next/image";

export const PostCard = ({ large = false }: { large?: boolean }) => (
  <Card className="group flex flex-row md:flex-row items-center gap-4 p-2 border-none shadow-none bg-gray-50 dark:bg-gray-900">
    <div
      className={`relative ${
        large ? "md:w-1/2 h-48" : "w-28 h-28"
      } flex-shrink-0 overflow-hidden rounded-lg
      after:content-[''] after:absolute after:inset-0
      after:bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.4)_50%,transparent_80%)]
      after:-translate-x-full group-hover:after:translate-x-full
      after:transition-transform after:duration-500 after:ease-in-out`}
    >
      <Image
        src="/img/ppp.webp"
        alt="Post Image"
        layout="fill"
        objectFit="cover"
        className="rounded-lg transition-all duration-300 group-hover:brightness-60"
      />
    </div>
    <div className="flex flex-col space-y-6 justify-evenly">
      <a href="#" className="font-bold text-sm lg:text-lg hover:text-primary">
        درمان سریع ورم چشم با ۴ روش خانگی
      </a>
      <p className="text-sm text-gray-500">تاریخ: ۳ بهمن ۱۴۰۲</p>
      {large && (
        <p className="text-gray-600 hidden md:block">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است.
        </p>
      )}
    </div>
  </Card>
);
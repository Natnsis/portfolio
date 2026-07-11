import Image from "next/image";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="flex">
      <div>
        <Image
          src="https://res.cloudinary.com/dp1o87p4c/image/upload/v1783753322/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158_ffn32q.webp"
          alt="pfp-img"
          width={60}
          height={60}
          className="rounded-full"
        />
        <h6 className="text-4xl">Natnael Sisay</h6>
        <p>
          Full-stack developer who researches before building, communicates
          openly, and ships quality software — solo or with a team.
        </p>
        <Button>See my work</Button>
      </div>
      <div></div>
    </div>
  );
};

export default Hero;

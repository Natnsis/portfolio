"use client";
import {
  DeviceMobileCameraIcon,
  HardDrivesIcon,
  MonitorIcon,
  PlugsIcon,
  RobotIcon,
} from "@phosphor-icons/react";

const Services = () => {
  const service = [
    {
      icon: MonitorIcon,
      name: "FrontEnd (website)",
    },
    {
      icon: DeviceMobileCameraIcon,
      name: "Mobile App",
    },
    {
      icon: HardDrivesIcon,
      name: "BackEnd",
    },
    {
      icon: MonitorIcon,
      name: "FrontEnd (website)",
    },
    {
      icon: RobotIcon,
      name: "Bots",
    },
  ];
  return (
    <div className="py-10 border-b border-black grid grid-cols-2">
      <div className="px-10 py-5">
        <h1 className="text-4xl">My Services</h1>
        <p>
          lorem jslk jskjf skjfkjslf lsajfks fjsalf lks;f lsaf sljflksajflksf
          sjlsjalf jslkfdja fjlsdfj ajflksajflkjsf skfj sdajflk
          sjfksjfksa;jfkdsjfkeksdljfeojfklsjoeflkjl jf
        </p>
      </div>
      <div className="px-20 grid grid-cols-2 gap-5">
        {service.map((s, index) => (
          <div className="flex items-center gap-2" key={index}>
            <s.icon size={32} />
            <p>{s.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;

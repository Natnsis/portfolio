import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { experiences } from "@/constants/experiences";
import { DownloadIcon } from "lucide-react";

const Experience = () => {
  return (
    <Card className="col-span-1 md:col-span-6">
      <CardHeader>
        <CardTitle>
          <h1 className="text-xl font-primary underline">Experience</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {experiences.map((e, index) => (
          <div key={index} className="mb-5">
            <div className="flex gap-3 font-poppins items-center ">
              <h1 className="text-lg capitalize">{e.title}</h1>
            </div>
            <div className="ml-0 md:ml-10 border-l-0 md:border-l md:pl-5 pl-0">
              <p className="font-primary">{e.descritpion}</p>
              <div className="flex gap-3 items-center justify-start md:justify-end">
                <p>Downlaod Files</p>
                <Button size="icon">
                  <a href={e.file} download>
                    <DownloadIcon />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Experience;

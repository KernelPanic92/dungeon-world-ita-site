import { Clazz } from "@/services/class-service";
import Link from "next/link";
import Image from "next/image";

export const Class = (opts: {clazz: Clazz}) => {
    return <div className="flex w-full align-top flex-row space-x-8">
      {/*<div className="w-20 h-20 relative aspect-square">
        <Image className="object-left-top rounded-lg" objectFit="cover" src="/images/classi/classi-base/adrian-paladino.jpg" alt="image" fill={true} />
      </div>*/}
      <div className="flex flex-col space-y-4">
        <h3 className="font-bold text-xl truncate">{opts.clazz.title}</h3>
        <p className=" text-base line-clamp-2">
          {opts.clazz.description}
        </p>
        <Link href={opts.clazz.path}>Vai alla scheda →</Link>
      </div>
  </div>;
}

export const Classes = (opts: {classes: Array<Clazz>}) => {
    return <div className="flex flex-col w-full space-y-8 pt-10">
        {opts.classes.map((clazz, i) => <Class clazz={clazz} key={clazz.path}/>)}
    </div>;
};

export default Classes;

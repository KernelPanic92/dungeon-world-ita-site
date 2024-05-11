import { HomebrewClazz } from "@/services/homebrew-class-service";
import Link from "next/link";
import Image from "next/image";

export const HomebrewClass = (opts: {clazz: HomebrewClazz}) => {
    return <div className="flex w-full align-top flex-row space-x-4 md:space-x-8">
      <div className="flex flex-col space-y-2 md:space-y-4">
        <h3 className="font-bold text-xl truncate">{opts.clazz.title}</h3>
        <p className=" text-base line-clamp-2">
          {opts.clazz.description}
        </p>
        <Link href={opts.clazz.path}>Vai alla scheda →</Link>
      </div>
      <div className="w-16 h-16 md:w-28 md:h-48 relative aspect-square">
        <Image className="bject-cover object-center rounded-lg" src={opts.clazz.image.url} alt={opts.clazz.image.name} fill={true} />
      </div>
  </div>;
}

export const HomebrewClasses = (opts: {classes: Array<HomebrewClazz>}) => {
    return <div className="flex flex-col w-full space-y-8 pt-10">
        {opts.classes.map((clazz, i) => <HomebrewClass clazz={clazz} key={clazz.path}/>)}
    </div>;
};

export default HomebrewClasses;

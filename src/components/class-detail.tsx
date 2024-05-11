import { Link } from 'nextra-theme-docs';
import Image from "next/image";
import { FC, PropsWithChildren } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export interface ClassDetailProps {
  title: string;
  author?: string;
  collection?: string;
  image: {name: string, url: string};
  downloads: Record<string, string>;
}

const ClassDetail: FC<PropsWithChildren<ClassDetailProps>> = ({ title: name, author, children, image, downloads, collection }) => {
  return (
    <div className="flex flex-col space-4">
      <h1 className="flex w-full text-4xl font-bold tracking-tight">{name}</h1>
      {author && <h2 className="flex w-full whitespace-nowrap transition-colors min-w-[24px] overflow-hidden text-ellipsis text-gray-500">{[author, collection].filter(Boolean).join(' - ')}</h2>}
      
      <div className="flex flex-col-reverse lg:flex-row items-start space-4">
        <div className="lg:w-2/3 lg:mr-4 mb-4 lg:mb-0">
            {children}
        </div>
        <div className="lg:w-1/3">
            <Image className="rounded-lg w-full h-auto lg:order-first mb-4 lg:mb-0" src={image.url} alt={image.name} width={1094} height={1600} />
        </div>
    </div>
      <div className='flex flex-row flex-wrap'>
        {Object.entries(downloads).map(([name, url]) => 
            <Link href={url} className='nx-font-bold nx-flex nx-flex-row nx-items-center' newWindow={true}>
                <FontAwesomeIcon icon={faDownload} height={'1rem'} className='nx-mr-2' /> {name}
            </Link>
        )}
        
      </div>
    </div>
  );
};

export default ClassDetail;

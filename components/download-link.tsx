import { Link} from 'nextra-theme-docs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FC, PropsWithChildren } from 'react';

export interface DownloadLinkProps {
  href: string;
}

export const DownloadLink: FC<PropsWithChildren<DownloadLinkProps>> = ({href, children}) => {
  
  return <Link href={href} target='_blank' className='font-bold flex flex-row'>
    <FontAwesomeIcon icon={faDownload} height={'1rem'} /> {children}
  </Link>;
}


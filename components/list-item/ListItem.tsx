import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IListItemProps } from './ListItem.types';

export const ListItem: FC<IListItemProps> = ({ id, imageUrl, title, text }) => {
  return (
    <article className="flex items-center border-t px-4 md:px-0">
      <div className="flex-0 w-20 md:w-24 h-20 md:h-24">
        {imageUrl && (
          <Link href={`/products/${id}`}>
            <a>
              <Image
                src={imageUrl}
                width={96}
                height={96}
                alt="Vitra Design Museum Logo"
              />
            </a>
          </Link>
        )}
      </div>
      <div className="flex-1 ml-4">
        <Link href={`/products/${id}`}>
          <a>
            <h3 className="text-xl md:text-xl">{title}</h3>
          </a>
        </Link>
        <p className="text-base md:text-xl text-gray-400">{text}</p>
      </div>
    </article>
  );
};

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { fetcher } from '@/hooks/fetcher';
import Image from 'next/image';
import { ImageInputType } from '@/app/[userId]/create-new/_components/ProductCreateNew';
import { CircleCheck } from 'lucide-react';
import { ImageInterface } from '@prisma/client';
import MaxWidthWrapper from '../MaxWidthWrapper';
interface Props {
  userId: string;
  imgFiles: ImageInputType[];
  setImgFiles: React.Dispatch<React.SetStateAction<ImageInputType[]>>;
  selectedFromMedia: ImageInterface[];
  setSelectedFromMedia: React.Dispatch<React.SetStateAction<ImageInterface[]>>;
}

const MediaModal = ({ userId, selectedFromMedia, setSelectedFromMedia }: Props) => {
  const { data } = useQuery<ImageInterface[]>({
    queryKey: ['media', 'userId', 'images'],
    queryFn: () => fetcher(`/api/media/${userId}`),
  });
  const selectedImgNames = selectedFromMedia.map(img => img.name);
  return (
    <div>
      <h3 className='p-4 bg-slate-100 opacity-70 text-center' style={{ borderBottom: '1px solid var(--primary)' }}>
        Media ({(data && data.length) ?? 0})
      </h3>
      <div className='p-2 min-w-52 min-h- flex gap-2 flex-wrap'>
        {!data && <p>Oops!! No image was found.</p>}
        {data &&
          data.map(image => {
            const isSelected = selectedImgNames.includes(image.name);
            return (
              <div
                key={image.id}
                className='relative p-1 cursor-pointer hover:bg-slate-100 rounded-md'
                onClick={() => {
                  if (isSelected) {
                    setSelectedFromMedia(prev => prev.filter(img => img.name !== image.name));
                  } else {
                    setSelectedFromMedia(prev => [...prev, image]);
                  }
                }}
              >
                <div key={image.id} className='m-2 relative w-28 h-28 rounded-md overflow-hidden cursor-pointer'>
                  {isSelected && (
                    <div
                      className='absolute w-full flex items-center justify-center h-full top-0 left-0 z-10'
                      style={{
                        backgroundColor: 'var(--white01)',
                        backdropFilter: 'blur(2px)',
                        border: '2px solid var(--primary02)',
                      }}
                    >
                      <CircleCheck size={30} color='var(--primary05)' fill='var(--white05)' />
                    </div>
                  )}
                  <Image fill src={image.imageUrl} alt={image.name} />
                </div>
                <p className='truncate w-28 pl-2 pt-2'>{image.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MediaModal;

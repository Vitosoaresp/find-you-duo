import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface GameBannerProps {
  id: string;
  bannerUrl: string;
  title: string;
  adsCount: number;
  setGameIdSelected: Dispatch<SetStateAction<string>>;
  setGameTitleSelected: Dispatch<SetStateAction<string>>;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <div className='keen-slider__slide relative rounded-lg'>
      <Dialog.Trigger
        onClick={() => {
          props.setGameTitleSelected(props.title);
          props.setGameIdSelected(props.id);
        }}
      >
        <Image
          loader={() => props.bannerUrl}
          src={props.bannerUrl}
          alt=''
          width={250}
          height={300}
        />

        <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
          <strong className='font-bold text-white block'>{props.title}</strong>
          <span className='text-zinc-300 text-sm block'>
            {props.adsCount} anúncio(s)
          </span>
        </div>
      </Dialog.Trigger>
    </div>
  );
}

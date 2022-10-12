import Image from 'next/image';

interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <button className='keen-slider__slide relative rounded-lg '>
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
    </button>
  );
}

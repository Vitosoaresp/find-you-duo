import * as Dialog from '@radix-ui/react-dialog';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import prisma from '../lib/prisma';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

import { GameBanner } from '../components/GameBanner';

import { useState } from 'react';
import { AdsCard } from '../components/AdsCard';
import { CreateAdBanner } from '../components/CreateAdBanner';
import { CreateAdModal } from '../components/CreateAdModal';
import logoImg from '../public/logo-nlw-esports.svg';

export interface Game {
  games: {
    bannerUrl: string;
    id: string;
    title: string;
    _count: {
      ads: number;
    };
  }[];
}

const Home = ({ games }: Game) => {
  const [gameIdSelected, setGameIdSelected] = useState<string>('');
  const [gameTitleSelected, setGameTitleSelected] = useState('');
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free-snap',
    slides: {
      perView: 6,
      spacing: 17,
    },
    breakpoints: {
      '(max-width: 1024px)': {
        slides: {
          perView: 4,
          spacing: 17,
        },
      },
      '(max-width: 640px)': {
        slides: {
          perView: 2,
          spacing: 17,
        },
      },
    },
  });

  return (
    <div className='w-full min-h-screen bg-[#121214] bg-galaxy bg-cover bg-no-repeat mx-auto flex flex-col items-center md:px-20 px-4 py-5'>
      <Image
        src={logoImg}
        alt=''
      />

      <h1 className='md:text-6xl text-3xl text-white font-black mt-12'>
        Seu{' '}
        <span className='bg-nlw-gradient bg-clip-text text-transparent'>
          duo
        </span>{' '}
        está aqui.
      </h1>

      <Dialog.Root>
        <div
          className='keen-slider flex mt-14'
          ref={ref}
        >
          {games.map((game) => (
            <GameBanner
              key={game.id}
              id={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
              setGameIdSelected={setGameIdSelected}
              setGameTitleSelected={setGameTitleSelected}
            />
          ))}
        </div>
        <AdsCard
          id={gameIdSelected}
          gameTitle={gameTitleSelected}
        />
      </Dialog.Root>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal games={games} />
      </Dialog.Root>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return {
    props: { games },
  };
};

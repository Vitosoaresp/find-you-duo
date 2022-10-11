import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../lib/prisma';

type Ads = {
  id: string;
  gameId: String;
  name: String;
  yearsPlaying: number;
  discord: String;
  weekDays: String;
  hourStart: number;
  hourEnd: number;
  useVoiceChannel: Boolean;
  createdAt: Date;
};

type Games = {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
};

export default async function handlerGames(
  _req: NextApiRequest,
  res: NextApiResponse<Games[]>,
) {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  res.status(200).json(games);
}

import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../lib/prisma';
import { convertMinutesToHours } from '../../../../lib/utils/convertions';

export default async function getAdsByGameId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const gameId = String(req.query.id);
  console.log(gameId);

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourEnd: true,
      hourStart: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return res.status(200).json(
    ads.map((ad) => ({
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHours(ad.hourStart),
      hourEnd: convertMinutesToHours(ad.hourEnd),
    })),
  );
}

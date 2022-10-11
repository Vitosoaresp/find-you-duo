import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { convertHourToMinutos } from '../../../../lib/utils/convertions';

export default async function createAds(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const gameId = String(req.query.id);
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourToMinutos(body.hourStart),
      hourEnd: convertHourToMinutos(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });
  return res.status(201).json(ad);
}

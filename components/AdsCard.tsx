import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import copy from 'clipboard-copy';
import { CircleNotch, DiscordLogo } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { AdInfo } from './AdInfo';

interface IAdsCardProps {
  id?: string;
  gameTitle?: string;
}

interface IAdGame {
  id: string;
  name: string;
  hourEnd: string;
  discord: string;
  hourStart: string;
  weekDays: string[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
}

export function AdsCard({ id, gameTitle }: IAdsCardProps) {
  const [adInfo, setAdInfo] = useState<IAdGame[]>();
  const [adInfoInLoading, setAdInfoInLoading] = useState(true);

  useEffect(() => {
    const getInfoAd = () => {
      setAdInfoInLoading(true);
      axios.get(`/api/ads/${id}/ads`).then((response) => {
        setAdInfo(response.data);
        setAdInfoInLoading(false);
      });
    };
    getInfoAd();
  }, [id]);

  enum days {
    'SEG',
    'TER',
    'QUA',
    'QUI',
    'SEX',
    'SAB',
    'DOM',
  }

  function handleCopyDiscord(discord: string) {
    copy(discord);
    alert('Discord copiado com sucesso!');
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[700px] shadow-lg shadow-black/25'>
        <div className='flex flex-col'>
          <div className='w-full text-sm mb-4 flex flex-col'>
            <div className='text-3xl font-bold '>{gameTitle}</div>
            <div className='bg-nlw-gradient bg-clip-text text-transparent'>
              {adInfo &&
                adInfo.length > 0 &&
                'Encontre alguns players por aqui!'}
            </div>
          </div>

          {adInfoInLoading ? (
            <CircleNotch
              size={42}
              className='animate-spin w-full'
            />
          ) : (
            <div
              className={`flex w-full gap-2 flex-wrap ${
                adInfo && adInfo?.length > 1
                  ? 'h-[450px] overflow-y-scroll'
                  : 'h-full overflow-y-hidden'
              } justify-center`}
            >
              {adInfo && adInfo.length === 0 && (
                <p className='text-lg font-medium text-zinc-300'>
                  Nenhum anuncio encontrado para esse game!
                </p>
              )}
              {adInfo?.map((info) => (
                <div
                  key={info.id}
                  className='flex bg-black/40 px-12 py-4 flex-col gap-2 mb-2 '
                >
                  <AdInfo label='Name'>
                    <p className='text-zinc-300'>{info.name}</p>
                  </AdInfo>
                  <AdInfo label='Tempo de Jogo'>
                    <p className='text-zinc-300'>{info.yearsPlaying} Anos</p>
                  </AdInfo>
                  <div>
                    <p className='flex items-center gap-2 font-bold'>
                      Discord
                      <DiscordLogo
                        size={22}
                        weight='bold'
                        color='#7289DA'
                      />
                    </p>
                    <button
                      className='text-emerald-500 hover:text-emerald-600 transition-colors'
                      onClick={() => handleCopyDiscord(info.discord)}
                    >
                      {info.discord}
                    </button>
                  </div>
                  <AdInfo label='Disponibilidade'>
                    <span className='flex text-sm gap-3 flex-wrap pb-1 text-zinc-300'>
                      {info.weekDays.map((day) => (
                        <p key={day}>{days[Number(day)]}</p>
                      ))}
                    </span>
                    <span className='text-zinc-300'>
                      Das {info.hourStart} Até {info.hourEnd}
                    </span>
                  </AdInfo>
                  <AdInfo label='Chat por voz'>
                    <p
                      className={`${
                        info.useVoiceChannel
                          ? 'text-emerald-500'
                          : 'text-red-500'
                      }`}
                    >
                      {info.useVoiceChannel ? 'Sim' : 'Não'}
                    </p>
                  </AdInfo>
                </div>
              ))}
            </div>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

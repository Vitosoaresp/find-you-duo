import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';
import { Check, CircleNotch, GameController } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { Game } from '../pages';

import { Input } from './Form/Input';

export function CreateAdModal({ games }: Game) {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
  const [gameSelectedAd, setGameSelectedAd] = useState<string | null>(null);
  const [creatingAd, setCreatingAd] = useState(false);

  async function handleCreateAd(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name || !gameSelectedAd || !data.hourStart) {
      return;
    }

    try {
      setCreatingAd(true);
      await axios.post(`/api/games/${gameSelectedAd}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
      alert('Anuncio criado com sucesso!');
      setCreatingAd(false);
    } catch (err) {
      alert('Erro ao criar um anuncio!');
      console.log(err);
    }
  }

  return (
    <Dialog.DialogPortal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>
          Publique um anúncio
        </Dialog.Title>

        <form
          onSubmit={handleCreateAd}
          className='mt-8 flex flex-col gap-4'
        >
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='game'
              className='font-semibold'
            >
              Qual o game?
            </label>
            <Select.Root onValueChange={setGameSelectedAd}>
              <Select.Trigger className='bg-zinc-900 inline-flex items-center justify-center py-3 px-4 rounded text-sm placeholder:text-zinc-500 relative w-[400px]'>
                <Select.Value placeholder='Selecione o game que deseja jogar' />
                <Select.Icon className='absolute right-6' />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className='bg-zinc-900 w-[400px] rounded-md shadow'>
                  <Select.ScrollUpButton />
                  <Select.Viewport className='p-4 justify-center bg-zinc-900 w-full'>
                    {games.map((game) => (
                      <Select.Item
                        key={game.id}
                        value={game.id}
                        className='flex items-center text-zinc-500 px-7 py-1 justify-center hover:bg-violet-500 hover:text-white transition-colors relative'
                      >
                        <Select.ItemText>{game.title}</Select.ItemText>
                        <Select.ItemIndicator className='absolute left-0 w-6 flex items-center justify-center '>
                          <Check />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='name'>Seu nome (ou nickname)</label>
            <Input
              name='name'
              id='name'
              placeholder='Como te chamam dentro do game?'
            />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
              <Input
                type='number'
                name='yearsPlaying'
                id='yearsPlaying'
                placeholder='tudo bem ser ZERO'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='discord'>Qual seu Discord?</label>
              <Input
                name='discord'
                id='discord'
                placeholder='Usuario#0000'
              />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='weekDays'>Quando costuma jogar?</label>
              <ToggleGroup.Root
                type='multiple'
                className='grid grid-cols-4 gap-2'
                onValueChange={setWeekDays}
                value={weekDays}
              >
                <ToggleGroup.Item
                  value='0'
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title='Domingo'
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='1'
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title='Segunda'
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='2'
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title='Terça'
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='3'
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title='Quarta'
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='4'
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title='Quinta'
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='5'
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title='Sexta'
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='6'
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title='Sabado'
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor='hourStart'>Qual hórario do dia?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input
                  name='hourStart'
                  id='hourStart'
                  type='time'
                  placeholder='De'
                />
                <Input
                  name='hourEnd'
                  id='hourEnd'
                  type='time'
                  placeholder='Até'
                />
              </div>
            </div>
          </div>

          <label className='mt-2 flex items-center gap-2 text-sm'>
            <Checkbox.Root
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
              className='w-6 h-6 p-1 rounded bg-zinc-900'
            >
              <Checkbox.CheckboxIndicator>
                <Check className='w-4 h-4 text-emerald-400' />
              </Checkbox.CheckboxIndicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className='flex justify-end mt-4 gap-4'>
            <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
              Cancelar
            </Dialog.Close>
            <button
              type='submit'
              disabled={creatingAd}
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
            >
              {creatingAd ? (
                <CircleNotch className='w-6 h-6 animate-spin' />
              ) : (
                <GameController className='w-6 h-6' />
              )}
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.DialogPortal>
  );
}

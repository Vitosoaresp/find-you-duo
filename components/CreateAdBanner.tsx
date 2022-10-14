import * as Dialog from '@radix-ui/react-dialog';
import { MagnifyingGlassPlus } from 'phosphor-react';

export function CreateAdBanner() {
  return (
    <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8  overflow-hidden'>
      <div className='bg-[#2A2634] md:px-8 px-4 py-6 gap-2 md:gap-0 flex flex-col md:flex-row md:justify-between items-center'>
        <div>
          <strong className='md:text-2xl text-lg text-white font-black block md:text-start text-center'>
            Não encontrou seu duo?
          </strong>
          <span className='text-zinc-400 block md:text-base text-sm md:text-start text-center'>
            Publique um anúncio para encontrar novos payers
          </span>
        </div>

        <Dialog.Trigger className='py-3 px-4 bg-violet-500 text-white rounded-md hover:bg-violet-600 transition-colors flex items-center gap-3'>
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}

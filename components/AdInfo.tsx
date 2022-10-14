interface AdInfoProps {
  label: string;
  children: React.ReactNode;
}

export function AdInfo({ label, children }: AdInfoProps) {
  return (
    <div>
      <p className='font-bold'>{label}</p>
      <p>{children}</p>
    </div>
  );
}

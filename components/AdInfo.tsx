interface AdInfoProps {
  label: string;
  value: string;
}

export function AdInfo({ label, value }: AdInfoProps) {
  return (
    <div>
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
}

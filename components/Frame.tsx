export function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-svh w-full items-center justify-center px-6">
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </div>
  );
}
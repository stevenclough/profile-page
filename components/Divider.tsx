export function Divider({ orientation = "horizontal", hidden }: { orientation?: "horizontal" | "vertical"; hidden?: boolean }) {
  return (
    hidden ? <div className={`my-8 ${orientation === "vertical" ? "border-l-0" : "border-t-0"}`} /> :
    <div className={`my-8 ${orientation === "vertical" ? "border-l" : "border-t"} border-zinc-200 dark:border-zinc-700`} />
  );
}

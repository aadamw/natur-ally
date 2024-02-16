import { LogoIcon } from "@/components/icons";

export function Header() {
  return (
    <header className="hidden items-center bg-white px-10 py-6 md:flex">
      <LogoIcon aria-label="Natur.ally logo" />
    </header>
  );
}

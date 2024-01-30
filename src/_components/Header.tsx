import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import Burger from "@/components/Burger";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 bg-background shadow-sm">
      <div className="container flex gap-2 py-2 md:gap-5">
        <Logo />
        <Input type="text" placeholder="Search" />
        <Button variant="outline">Button</Button>
        <Burger className="flex lg:hidden" />
      </div>
    </header>
  );
}

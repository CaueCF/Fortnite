import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { BookOpen, Home, Rss } from "lucide-react";
import Link from "next/link";

const navigationMenuItems = [
  { title: "Loja de items", href: "/", icon: Home, isActive: true },
  //{ title: "Comunidade", href: "/comunidade", icon: Rss },
];

export default function NavigationMenuWithActiveItem({
  className,
}: React.ComponentProps<'div'>) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {navigationMenuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              asChild
              active={item.isActive}
            >
              <Link href={item.href} 
              className="flex-row items-center gap-2.5">
                {/* <item.icon className="h-5 w-5 shrink-0" /> */}
                {item.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

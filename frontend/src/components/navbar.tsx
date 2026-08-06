import { Menu } from 'lucide-react';
import { routes } from '@/App';
import logo from '@/assets/financy-logo.svg';
import logoIcon from '@/assets/logon-icon.png';
import { useAuth } from '@/contexts/AuthContext';
import { cn, getInitialsFromName } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

function Navbar() {
  const { user } = useAuth();

  const DesktopMenu = () => (
    <div className="hidden sm:flex sm:gap-5">
      <NavigationMenuItem>
        <NavigationMenuLink to={routes.home.path}>Dashboard</NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink to={routes.transactions.path}>
          Transações
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink to={routes.categories.path}>
          Categorias
        </NavigationMenuLink>
      </NavigationMenuItem>
    </div>
  );

  const DesktopLogo = () => (
    <NavigationMenuLink to={routes.home.path} className="hidden sm:block">
      <img className={cn('h-5 w-25')} src={logo} alt="Logo" />
    </NavigationMenuLink>
  );

  const MobileMenu = () => (
    <NavigationMenuItem className="sm:hidden">
      <NavigationMenuTrigger>
        <Menu />
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink to={routes.home.path}>Dashboard</NavigationMenuLink>
        <NavigationMenuLink to={routes.transactions.path}>
          Transações
        </NavigationMenuLink>
        <NavigationMenuLink to={routes.categories.path}>
          Categorias
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  const MobileLogo = () => (
    <NavigationMenuLink to={routes.home.path} className="sm:hidden">
      <img className="h-8 w-8" src={logoIcon} alt="Logo" />
    </NavigationMenuLink>
  );

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <DesktopLogo />
          <MobileLogo />
        </NavigationMenuItem>

        <DesktopMenu />
        <MobileMenu />

        <NavigationMenuItem>
          <NavigationMenuLink to={routes.profile.path} className="rounded-full">
            <Avatar size="sm" className="cursor-pointer">
              <AvatarFallback>{getInitialsFromName(user.name)}</AvatarFallback>
            </Avatar>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navbar;

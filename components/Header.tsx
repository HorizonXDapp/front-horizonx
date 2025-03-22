import Link from "next/link";
import { Search, Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
   isDarkMode: boolean;
   toggleDarkMode: () => void;
   showMobileMenu: boolean;
   setShowMobileMenu: (value: boolean) => void;
}

export default function Header({
   isDarkMode,
   toggleDarkMode,
   showMobileMenu,
   setShowMobileMenu,
}: HeaderProps) {
   return (
      <header className="relative z-50 flex items-center justify-between px-4 py-3 border-b border-border bg-white dark:bg-gray-950">
         <div className="flex items-center space-x-6">
            <Link
               href="#"
               className="flex items-center space-x-2 text-[#0047FF] font-medium"
            >
               <Image
                  src={`/logo/${isDarkMode ? "dark" : "light"}.png`}
                  width={30}
                  height={30}
                  alt="Logo"
               />
               <span className="text-lg font-bold">HorizonX</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6 text-muted-foreground">
               <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
               >
                  Trade
               </Link>
            </nav>
         </div>

         <div className="flex items-center space-x-3">
            <appkit-button />

            <button
               className="text-muted-foreground hover:text-foreground transition-colors"
               onClick={toggleDarkMode}
            >
               {isDarkMode ? (
                  <Sun className="w-5 h-5" />
               ) : (
                  <Moon className="w-5 h-5" />
               )}
            </button>

            <button
               className="text-muted-foreground hover:text-foreground transition-colors md:hidden"
               onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
               {showMobileMenu ? (
                  <X className="w-6 h-6" />
               ) : (
                  <Menu className="w-6 h-6" />
               )}
            </button>
         </div>

         {showMobileMenu && (
            <div className="md:hidden bg-background border-b border-border py-2 absolute top-full left-0 right-0">
               <nav className="flex flex-col items-center space-y-2">
                  <Link
                     href="#"
                     className="text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                     Trade
                  </Link>
               </nav>
            </div>
         )}
      </header>
   );
}

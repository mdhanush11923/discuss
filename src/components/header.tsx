import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import HeaderAuth from "./header-auth";
import Link from "next/link";
import SearchInput from "./common/search-input";
import { Suspense } from "react";

export default function Header() {
  return (
    <div>
      <Navbar className="shadow mb-6 py-3">
        <NavbarBrand className="font-black text-lg sm:text-xl">
          <Link href="/">Discuss</Link>
        </NavbarBrand>
        <NavbarContent className="" justify="center">
          <NavbarItem>
            <Suspense>
              <SearchInput />
            </Suspense>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="gap-2" justify="end">
          <HeaderAuth />
        </NavbarContent>
      </Navbar>
    </div>
  );
}

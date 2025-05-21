"use client";

import * as actions from "@/actions";
import { NavbarItem } from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { useSession } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";

export default function HeaderAuth() {
  let authContent: React.ReactNode;
  const session = useSession();

  if (session.status === "loading") {
    return null;
  } else if (session.data?.user) {
    authContent = (
      <Popover radius="full" backdrop="opaque" placement="left">
        <PopoverTrigger>
          <Avatar className="cursor-pointer" src={session.data.user.image || ""} />
        </PopoverTrigger>
        <PopoverContent>
          <form action={actions.signOut}>
            <Button type="submit">Sign out</Button>
          </form>
        </PopoverContent>
      </Popover>
    );


  } else {
    authContent = (
      <>
        <NavbarItem className="hidden xm:flex">
          <form action={actions.signIn}>
            <Button
              className="bg-gradient-to-r from-white to-gray-100 hover:bg-gray-400 h-10 sm:h-11 sm:w-24"
              variant="ghost"
              type="submit"
              radius="sm"
            >
              Sign in
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button
              className="bg-black h-10 sm:h-11 sm:w-24 "
              color="primary"
              radius="sm"
              type="submit"
            >
              Sign up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }
  return authContent;
}

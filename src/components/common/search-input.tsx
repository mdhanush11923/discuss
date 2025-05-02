"use client";

import { Input } from "@heroui/input";
import { useSearchParams } from "next/navigation";
import React from "react";
import * as actions from "@/actions";
export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default function SearchInput() {
  const searchParams = useSearchParams();
  return (
    <form action={actions.search}>
    <Input
    name="term"
      classNames={{ innerWrapper: "items-center gap-1 h-10" }}
      variant="bordered"
      defaultValue={searchParams.get("term") || ""}
      placeholder="Search"
      startContent={
        <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
      }
    />
    </form>
  );
}

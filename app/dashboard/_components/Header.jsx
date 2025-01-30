"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const path = usePathname();
  return (
    <div className="flex p-5 items-center justify-between bg-secondary shadow-md">
      <Link href={'/dashboard'}>
      <Image src="/logo.svg" height={35} width={35} alt="logo" className=" hover:cursor-pointer" />
      </Link>
      <ul className="hidden md:flex md:justify-between gap-5 mx-2">
        <li>
          <Link
            href="/dashboard"
            className={`cursor-pointer transition-colors duration-200 hover:text-primary hover:font-bold ${
              path === "/dashboard" && "text-primary font-bold"
            }`}
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            href="/howitworks"
            className={`cursor-pointer transition-colors duration-200 hover:text-primary hover:font-bold ${
              path === "/howitwork" && "text-primary font-bold"
            }`}
          >
            How it Works
          </Link>
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;

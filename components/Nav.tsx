import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <div className="flex justify-between items-center p-5">
      <Link href={"/"}>
        <div className="grow">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        </div>
      </Link>
      <ConnectButton />
    </div>
  );
};

export default Nav;

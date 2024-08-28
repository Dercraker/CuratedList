"use client";

import { HeaderBase } from "@/components/layout/HeaderBase";
import { Page400 } from "@/components/page/Page400";

export default function ErrorPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <HeaderBase />
      <div className="flex flex-1 items-center justify-center">
        <Page400 />
      </div>
    </div>
  );
}

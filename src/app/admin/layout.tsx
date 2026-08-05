import { SpinLoader } from "@/components/SpinLoader.tsx";
import { Suspense } from "react";

export default function LayoutAdmin({children}: { children: React.ReactNode}) {
  return <Suspense fallback={<SpinLoader />}>{children}</Suspense>;
}

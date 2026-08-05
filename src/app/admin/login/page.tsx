// export const dynamic = 'force-dynamic';

import { SpinLoader } from "@/components/SpinLoader.tsx";
import { Suspense } from "react";

export default async function AdminLoginPage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <div className='py-16 text-6xl'>oi</div>
    </Suspense>
  );
}

'use client'
import Link from "next/link";
import { useAuthSession } from "@/hooks";

export default function Home() {
    const user = useAuthSession();

    return (
      <h1>
        <Link href="/auth/login/">Login</Link>
        <Link href="/auth/register/">Registration</Link>
      </h1>
  )
}

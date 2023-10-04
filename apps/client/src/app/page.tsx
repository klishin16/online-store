import Link from "next/link";

export default function Home() {
  return (
      <h1>
        <Link href="/auth/login/">Login</Link>
        <Link href="/auth/register/">Registration</Link>
      </h1>
  )
}

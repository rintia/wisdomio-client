"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";




function MobileLink({ href, label, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();

  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Public Lessons", href: "/lessons" },
    { label: "Add Lesson", href: "/dashboard/add-lesson" },
    { label: "My Lessons", href: "/dashboard/my-lessons" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/8 bg-[#080c0a]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
           <Image
              src="/logo.png"
              alt="Wisdomio Logo"
              width={48}
              height={48}
              className="rounded-lg"
              priority
            />
          <span className="hidden text-[15px] font-semibold tracking-tight text-white sm:block">
            Wisdomio
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          <ul className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-3.5 py-1.5 text-sm font-medium text-gray-400 transition-colors hover:bg-white/8 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-5 w-px bg-white/15" />

         <div className="flex items-center gap-3 relative">

  {!user ? (
    <>
      <Link
        href="/auth/signin"
        className="text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
      >
        Sign In
      </Link>

      <Button
        as={Link}
        href="/auth/signup"
        radius="lg"
        className="h-9 bg-emerald-500 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-400"
      >
        Get Started
      </Button>
    </>
  ) : (
    <div className="relative">

      {/* Avatar button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center justify-center"
      >
        <Image
          src={user.image || "/default-avatar.png"}
          alt="user"
          width={36}
          height={36}
          className="rounded-full border border-white/20"
        />
      </button>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-white/10 bg-[#0e1412] shadow-xl z-50">

          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-sm font-semibold text-white">
              {user.name}
            </p>
            <p className="text-xs text-gray-400">
              {user.email}
            </p>
          </div>

          <button
            onClick={async () => {
              await signOut();
              setDropdownOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )}
</div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex items-center justify-center rounded-lg p-2 text-gray-400 transition hover:bg-white/8 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-white/8 bg-[#080c0a] md:hidden">
          <div className="space-y-1 px-4 pb-6 pt-4">
            {navLinks.map((link) => (
              <MobileLink key={link.href} href={link.href} label={link.label} onClick={() => setIsMenuOpen(false)} />
            ))}

            <div className="mt-4 border-t border-white/8 pt-4 flex flex-col gap-3">
              <Link
                href="/auth/signin"
                className="rounded-xl px-4 py-3 text-sm font-medium text-emerald-400 transition hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Button
                as={Link}
                href="/auth/signup"
                className="bg-emerald-500 font-semibold text-white"
                radius="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
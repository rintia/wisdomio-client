"use client";

import Link from "next/link";
import {
  Envelope,
  LogoFacebook,
  LogoGithub,
  LogoLinkedin,
  LogoTelegram,
} from "@gravity-ui/icons";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-default-200 bg-content1">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-lg">
                 <Image
              src="/logo.png"
              alt="Wisdomio Logo"
              width={48}
              height={48}
              className="rounded-lg"
              priority
            />
              </div>

              <div>
                <h2 className="text-xl font-bold">Wisdomio</h2>
                <p className="text-sm text-default-500">
                  Digital Life Lessons
                </p>
              </div>
            </div>

            <p className="text-default-600 text-sm leading-6">
              Create, organize, and share meaningful life lessons, personal
              growth insights, and wisdom collected throughout your journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-emerald-500">Quick Links</h3>

            <ul className="space-y-3 text-default-600">
              <li>
                <Link
                  href="/lessons"
                  className="hover:text-primary transition-colors"
                >
                  Explore Lessons
                </Link>
              </li>

              <li>
                <Link
                  href="/favorites"
                  className="hover:text-primary transition-colors"
                >
                  Favorites
                </Link>
              </li>

              <li>
                <Link
                  href="/progress"
                  className="hover:text-primary transition-colors"
                >
                  Learning Progress
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4  text-emerald-500">Legal</h3>

            <ul className="space-y-3 text-default-600">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/cookies"
                  className="hover:text-primary transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4  text-emerald-500">Contact</h3>

            <div className="space-y-3 text-default-600">
              <p className="flex items-center gap-2">
                <Envelope className="w-4 h-4" />
                hello@wisdomio.com
              </p>

              <p className="text-sm">
                Helping people preserve and share valuable life lessons.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                <LogoFacebook className="w-5 h-5" />
              </Link>

             

              <Link
                href="https://github.com"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                <LogoGithub className="w-5 h-5" />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                <LogoLinkedin className="w-5 h-5" />
              </Link>

              <Link
                href="https://youtube.com"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                <LogoTelegram className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-default-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-default-500">
            © {currentYear} Wisdomio. All rights reserved.
          </p>

          <p className="text-sm text-default-500">
            Built for sharing wisdom, growth, and life lessons.
          </p>
        </div>
      </div>
    </footer>
  );
}
"use client";

import React from "react";
import { CelebrateButton } from "@/components/CelebrateButton";
import { DarkModeToggle } from "./DarkModeToggle";
import { BookMarkedIcon, BookOpen } from "lucide-react"; // ou autre bibliothèque d'icônes si tu en utilises une
import Link from "next/link"; // ou 'react-router-dom' selon ton framework
import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import SearchInput from "./SearchInput";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left container */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                ZenCo
              </span>
            </Link>
          </div>

          {/* Search Input */}
          <SearchInput />

          {/* Right container -> navbar */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* 🔗 Lien de navigation vers la page "My Courses" // Affiche une
            icône + un texte visible uniquement sur écran moyen et plus
            (responsive) // Stylisé avec Tailwind : effet hover, transition,
            bordure et espacement */}
            <nav>
              <SignedIn>
                <Link
                  prefetch={false}
                  href="/my-courses"
                  className="flex space-x-2 items-center text-sm font-medium 
                text-muted-foreground hover:text-foreground transition-colors 
                md:border md:border-border md:rounded-md md:px-4 md:py-2"
                >
                  <BookMarkedIcon className="h-4 w-4" />
                  <span className="hidden md:block">My Courses</span>
                </Link>
              </SignedIn>
            </nav>
            <CelebrateButton>Click Me</CelebrateButton>
            <DarkModeToggle />

            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

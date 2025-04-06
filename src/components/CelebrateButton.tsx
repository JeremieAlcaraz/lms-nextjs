'use client' // Indique que ce composant s'exécute côté client (Next.js 13+ avec App Router)

// Import du bouton shadcn/ui
import { Button } from './ui/button'

// Import de canvas-confetti
import confetti from 'canvas-confetti'

// Import de React
import React from 'react'

// Interface des props du composant
interface CelebrateButtonProps {
  children: React.ReactNode           // Ce qu’on met à l’intérieur du bouton
  soundUrl?: string                   // (optionnel) URL du son à jouer au clic
}

export function CelebrateButton({
  children,
  soundUrl = '/sounds/celebrate.wav', // Par défaut, on utilise ce fichier audio
}: CelebrateButtonProps) {
  // On crée une référence vers le bouton DOM pour récupérer sa position plus tard
  const buttonRef = React.useRef<HTMLButtonElement | null>(null)

  const handleClick = () => {
    // 🔊 1. Joue le son de célébration
    const audio = new Audio(soundUrl)
    audio.play()

    // 📍 2. Récupère les coordonnées du bouton sur l'écran
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return // Si jamais on ne trouve pas le bouton, on arrête là

    // 🎨 3. Crée un <canvas> temporaire qui couvre tout l’écran (pour dessiner les confettis dessus)
    const canvas = document.createElement('canvas')
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none' // Permet de ne pas bloquer les clics
    canvas.style.zIndex = '9999' // Très au-dessus de tout le reste
    document.body.appendChild(canvas) // Ajout du canvas dans la page

    // ✨ 4. Initialise une instance de confetti personnalisée sur ce canvas
    const myConfetti = confetti.create(canvas, { 
      resize: true,       // Le canvas s’ajuste à la taille de la fenêtre automatiquement
      useWorker: true     // Utilise un "Web Worker" pour éviter de bloquer l’interface
    })

    // 🧭 5. Calcule la position "centrale" du bouton en pourcentage de l'écran
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    // 🎉 6. Lance l'explosion de confettis à la position du bouton
    myConfetti({
      particleCount: 80,       // Nombre de particules
      startVelocity: 30,       // Vitesse initiale
      spread: 360,             // Dispersion totale (360°)
      ticks: 60,               // Durée de vie des particules
      origin: {
        x: x / window.innerWidth,     // Position X en % de la largeur écran
        y: y / window.innerHeight,    // Position Y en % de la hauteur écran
      },
    })

    // 🧹 7. Supprime le canvas après 1 seconde (nettoyage propre)
    setTimeout(() => {
      canvas.remove()
    }, 1000)
  }

  return (
    // 🖱️ Le bouton shadcn qui déclenche la magie au clic
    <Button ref={buttonRef} onClick={handleClick}>
      {children}
    </Button>
  )
}

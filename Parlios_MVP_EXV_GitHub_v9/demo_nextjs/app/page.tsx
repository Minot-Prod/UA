'use client';
import { useState, useEffect } from 'react';
import './globals.css';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';

export default function Page(){
  const [theme, setTheme] = useState('human');
  const [open, setOpen] = useState(false);
  useEffect(()=>{ document.documentElement.setAttribute('data-theme', theme); },[theme]);
  return (
    <main className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Parlios — UI Demo</h1>
        <div className="flex gap-2">
          <Button onClick={()=>setTheme('human')} variant="outline">Human</Button>
          <Button onClick={()=>setTheme('future')} variant="outline">Future</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h2 className="font-semibold mb-3">Boutons</h2>
          <div className="flex gap-3 flex-wrap">
            <Button>Primary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold mb-3">Inputs</h2>
          <div className="space-y-2">
            <Input placeholder="Votre email" />
            <Input placeholder="Secteur (coiffure, tattoo, coaching…)" />
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold mb-3">Modal</h2>
          <Button onClick={()=>setOpen(true)}>Ouvrir la modal</Button>
          <Modal open={open} onClose={()=>setOpen(false)} title="Exemple de dialogue">
            <p>Contenu de démonstration. Thème: {theme}</p>
          </Modal>
        </Card>
      </div>
    </main>
  );
}
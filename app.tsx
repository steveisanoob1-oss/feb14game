import React, { useState } from 'react';
import { ProfileCreation, UserProfile } from './components/ProfileCreation';
import { MatchingDeck, Character } from './components/MatchingDeck';
import { OutcomeDisplay } from './components/OutcomeDisplay';

const INITIAL_CHARACTERS: Character[] = [
  {
    id: '1',
    name: 'Sebastian',
    age: 15,
    gender: 'Male',
    likes: ['Coding', 'Rain', 'Video Games'],
    avatar: 'https://v3b.fal.media/files/b/0a8cbea6/rdfg0L4HvTmDQiqQfP_HF.png',
  },
  {
    id: '2',
    name: 'Haley',
    age: 16,
    gender: 'Female',
    likes: ['Fashion', 'Photography', 'Coconuts'],
    avatar: 'https://v3b.fal.media/files/b/0a8cbea7/9v4Q4XLOjowyIniWwooQS.png',
  },
  {
    id: '3',
    name: 'Alex',
    age: 14,
    gender: 'Male',
    likes: ['Sports', 'Steak', 'Gridball'],
    avatar: 'https://v3b.fal.media/files/b/0a8cbea7/YauHaZt_0mPUxAcGpYdsS.png',
  },
  {
    id: '4',
    name: 'Abigail',
    age: 15,
    gender: 'Female',
    likes: ['Quartz', 'Caves', 'Drums'],
    avatar: 'https://v3b.fal.media/files/b/0a8cbea7/mnAAYqQWgNUaac3ITNPi-.png',
  },
  {
    id: '5',
    name: 'Sam',
    age: 16,
    gender: 'Male',
    likes: ['Guitar', 'Skateboarding', 'Pizza'],
    avatar: 'https://v3b.fal.media/files/b/0a8cbea7/gM-U8Se8W5Doo0UJtn4hq.png',
  },
  {
    id: '6',
    name: 'Penny',
    age: 14,
    gender: 'Female',
    likes: ['Books', 'Melons', 'Teaching'],
    avatar: 'https://v3b.fal.media/files/b/0a8cbea7/U3MQjrefyko23ps1uP_i6.png',
  },
  {
    id: '7',
    name: 'Elliott',
    age: 15,
    gender: 'Male',
    likes: ['Writing', 'Crab Cakes', 'The Ocean'],
    avatar: 'https://v3b.fal.media/files/b/0a8cbea7/f9_Cu2ccO-30DU7bauFJ5.png',
  },
  {
    id: '8',
    name: 'The Mysterious One',
    age: 16,
    gender: 'Unknown',
    likes: ['Secrets', 'Night', 'Magic'],
    avatar: 'https://v3b.fal.media/files/b/0a8cbea7/UxAIijG-PtpbICYJtf2NG.png',
    isSpecial: true,
  },
];

function App() {
  const [view, setView] = useState<'register' | 'matching' | 'outcome'>('register');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRegister = (profile: UserProfile) => {
    setUserProfile(profile);
    setView('matching');
  };

  const handleMatch = () => {
    const character = INITIAL_CHARACTERS[currentIndex];
    if (character.isSpecial) {
      setView('outcome');
    } else {
      // Logic for regular match could be added here
      handleContinue();
    }
  };

  const handleContinue = () => {
    if (currentIndex < INITIAL_CHARACTERS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back or show "No more profiles"
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center font-mono selection:bg-accent/30 p-4">
      <div className="phone-frame bg-[#F3E9D2] flex flex-col">
        {/* Status Bar */}
        <div className="h-10 bg-primary flex items-center justify-between px-8 text-white/80">
          <span className="text-[10px] pixel-font">9:41</span>
          <div className="flex gap-2">
             <div className="w-4 h-2 bg-white/40 border border-white/60" />
             <div className="w-1 h-2 bg-white/80" />
          </div>
        </div>

        <main className="flex-1 relative overflow-hidden">
          {view === 'register' && <ProfileCreation onRegister={handleRegister} />}
          
          {view === 'matching' && (
            <MatchingDeck 
              characters={INITIAL_CHARACTERS}
              currentIndex={currentIndex}
              onMatch={handleMatch}
              onContinue={handleContinue}
            />
          )}

          {view === 'outcome' && userProfile && (
            <OutcomeDisplay 
              userName={userProfile.fullName}
              characterName={INITIAL_CHARACTERS[currentIndex].name}
              onBack={() => setView('matching')}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

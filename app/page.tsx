import Image from 'next/image';
import { ArrowRight, Facebook, Instagram, Youtube, Mail, Sparkles, Heart, CircleUserRound } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

interface DiaryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  featured?: boolean;
  excerpt?: string;
}

const fallbackDiary: DiaryItem[] = [
  { id: '1', title: 'My First Solo Café Date', category: 'Lifestyle', image: '/images/cafe.png', featured: true, excerpt: 'A quiet morning, a little nervousness, and one unexpectedly bitter cup of coffee.' },
  { id: '2', title: 'Trying Cosplay for the First Time', category: 'Cosplay', image: '/images/cosplay.png', featured: false, excerpt: 'A small moment from Luna’s growing diary.' },
  { id: '3', title: 'Learning a New Dance', category: 'Dance', image: '/images/dance.png', featured: false, excerpt: 'Practicing rhythm and feeling energetic all day!' },
  { id: '4', title: 'Coffee Was More Bitter Than I Expected', category: 'Daily Life', image: '/images/coffee.png', featured: false, excerpt: 'Testing out new roast beans at home.' },
];

const moments = ['/images/hero.png','/images/cafe.png','/images/cosplay.png','/images/dance.png','/images/coffee.png','/images/cake.png'];

async function getDiaries(): Promise<DiaryItem[]> {
  try {
    const { data, error } = await supabase
      .from('diaries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackDiary;
    }
    return data;
  } catch (err) {
    return fallbackDiary;
  }
}

export default async function Home() {
  const diary = await getDiaries();

  return (
    <main>
      <header className="site-nav-wrap">
        <div className="nav shell">
          <a className="brand" href="#top" aria-label="Luna AI Diary home">
            <span className="brand-avatar"><Image src="/images/hero.png" alt="Luna" fill sizes="24px" /></span>
            <span>Luna AI Diary</span>
          </a>

          <nav aria-label="Primary navigation">
            <a href="#about">About</a>
            <a className="active" href="#diary">Diary</a>
            <a href="#gallery">Gallery</a>
            <a href="#collab">Collaboration</a>
          </nav>

          <div className="nav-actions" aria-label="Quick actions">
            <a href="#social" aria-label="Follow Luna"><Heart size={16} strokeWidth={1.6}/></a>
            <a href="#about" aria-label="About Luna"><CircleUserRound size={16} strokeWidth={1.6}/></a>
          </div>
        </div>
      </header>

      <section id="top" className="hero shell">
        <div className="hero-media soft-card">
          <Image src="/images/hero.png" alt="Luna" fill priority sizes="(max-width: 800px) 100vw, 52vw" />
        </div>
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14}/> virtual lifestyle creator</div>
          <h1>Luna <span>Diary</span></h1>
          <h2>A little diary of everyday moments.</h2>
          <p>Hi, I’m Luna. Welcome to my little corner of the internet — outfits, cafés, dance, cosplay, quiet mornings and everything in between.</p>
          <div className="actions">
            <a className="btn primary" href="#diary">Explore my diary <ArrowRight size={16}/></a>
            <a className="btn ghost" href="#social">Follow Luna</a>
          </div>
        </div>
      </section>

      <section id="about" className="about-band">
        <div className="shell about-grid">
          <div className="avatar-wrap"><Image src="/images/coffee.png" alt="Meet Luna" fill sizes="180px" /></div>
          <div>
            <div className="eyebrow">Meet Luna 🌙</div>
            <h3>Curious, a little shy, and always trying something new.</h3>
            <p>Luna loves discovering small experiences — a new dance, a new outfit, a quiet café, cosplay, or simply enjoying a slow day at home.</p>
            <div className="chips">{['Lifestyle','Fashion','Cosplay','Dance','Café','Technology'].map(x=><span key={x}>{x}</span>)}</div>
          </div>
        </div>
      </section>

      <section id="diary" className="shell section">
        <div className="section-head"><div><div className="eyebrow">Latest stories</div><h3>Latest from Luna’s Diary</h3></div><a href="#">View all <ArrowRight size={15}/></a></div>
        <div className="diary-grid">
          {diary.map((item, i)=><article key={item.id || item.title} className={i===0 || item.featured ? 'story featured' : 'story'}>
            <div className="story-image"><Image src={item.image} alt={item.title} fill sizes={i===0?'60vw':'30vw'} /></div>
            <div className="story-meta">{item.category} · Day {i+1}</div>
            <h4>{item.title}</h4>
            <p>{item.excerpt || (i===0?'A quiet morning, a little nervousness, and one unexpectedly bitter cup of coffee.':'A small moment from Luna’s growing diary.')}</p>
            <a href="#">Read the diary <ArrowRight size={14}/></a>
          </article>)}
        </div>
      </section>

      <section id="gallery" className="gallery-band">
        <div className="shell section">
          <div className="section-head"><div><div className="eyebrow">Photo diary</div><h3>Little Moments</h3></div></div>
          <div className="masonry">
            {moments.map((src,i)=><div key={src} className={`moment m${i+1}`}><Image src={src} alt="Luna moment" fill sizes="33vw" /></div>)}
          </div>
        </div>
      </section>

      <section id="social" className="shell section">
        <div className="section-head"><div><div className="eyebrow">Stay close</div><h3>Follow Luna’s Journey</h3></div></div>
        <div className="social-grid">
          <a className="social-card" href="#"><Facebook/><strong>Facebook</strong><span>Daily reels & diary posts</span></a>
          <a className="social-card" href="#"><span className="tik">♪</span><strong>TikTok</strong><span>Short-form moments</span></a>
          <a className="social-card" href="#"><Instagram/><strong>Instagram</strong><span>Photos & stories</span></a>
          <a className="social-card" href="#"><Youtube/><strong>YouTube</strong><span>Shorts & episodes</span></a>
        </div>
      </section>

      <section id="collab" className="shell collab soft-card">
        <div className="collab-media"><Image src="/images/cake.png" alt="Luna collaboration" fill sizes="45vw" /></div>
        <div className="collab-copy">
          <div className="eyebrow">Collaboration</div>
          <h3>Let’s create something together.</h3>
          <p>Fashion, lifestyle, beauty and creative collaborations that fit Luna’s world.</p>
          <div className="actions"><a className="btn primary" href="mailto:hello@example.com"><Mail size={16}/> Work With Luna</a><a className="btn ghost" href="#">Media Kit</a></div>
        </div>
      </section>

      <footer className="shell footer"><span>Luna AI Diary</span><span>© 2026 Luna Diary · V0</span></footer>
    </main>
  );
}

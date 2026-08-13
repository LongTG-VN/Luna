import Image from 'next/image';
import { ArrowRight, Facebook, Instagram, Youtube, Mail, Heart, CircleUserRound } from 'lucide-react';
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
  { id: '2', title: 'Trying Cosplay for the First Time', category: 'Cosplay', image: '/images/cosplay.png', excerpt: 'A playful first step into a completely different look.' },
  { id: '3', title: 'Learning a New Dance', category: 'Dance', image: '/images/dance.png', excerpt: 'A few missed steps, a lot of practice, and finally getting the rhythm.' },
  { id: '4', title: 'A Quiet Morning at Home', category: 'Daily Life', image: '/images/coffee.png', excerpt: 'Slow light, a warm drink, and a calm start to the day.' },
];

const galleryGroups = [
  ['/images/hero.png','/images/cafe.png','/images/cake.png','/images/coffee.png'],
  ['/images/cosplay.png','/images/hero.png','/images/dance.png','/images/cafe.png'],
  ['/images/coffee.png','/images/cake.png','/images/hero.png','/images/cosplay.png'],
];

async function getDiaries(): Promise<DiaryItem[]> {
  try {
    const { data, error } = await supabase.from('diaries').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return fallbackDiary;
    return data;
  } catch {
    return fallbackDiary;
  }
}

export default async function Home() {
  const diary = await getDiaries();
  const featured = diary[0] || fallbackDiary[0];
  const supporting = (diary.length > 1 ? diary.slice(1, 4) : fallbackDiary.slice(1, 4));

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

          <div className="nav-actions">
            <a href="#social" aria-label="Follow Luna"><Heart size={16} strokeWidth={1.6}/></a>
            <a href="#about" aria-label="About Luna"><CircleUserRound size={16} strokeWidth={1.6}/></a>
          </div>
        </div>
      </header>

      <section id="top" className="hero shell">
        <div className="hero-media">
          <Image src="/images/hero.png" alt="Luna" fill priority sizes="(max-width: 800px) 100vw, 48vw" />
        </div>
        <div className="hero-copy">
          <p className="hero-kicker">Virtual Creator</p>
          <h1>Luna <span>Diary</span></h1>
          <h2>A little diary of everyday moments.</h2>
          <p className="hero-text">Hi, I’m Luna. Welcome to my little corner of the internet — outfits, cafés, dance, cosplay, quiet mornings and everything in between.</p>
          <div className="actions">
            <a className="btn primary" href="#diary">Explore my diary</a>
            <a className="btn ghost" href="#social">Follow Luna</a>
          </div>
        </div>
      </section>

      <section id="about" className="about-band">
        <div className="shell about-grid">
          <div className="avatar-wrap"><Image src="/images/coffee.png" alt="Meet Luna" fill sizes="170px" /></div>
          <div className="about-copy">
            <p className="section-kicker">Meet Luna 🌙</p>
            <h3>Curious, a little shy, and always trying something new.</h3>
            <p>Luna loves discovering small experiences — a new dance, a new outfit, a quiet café, cosplay, or simply enjoying a slow day at home.</p>
            <div className="chips">{['Lifestyle','Fashion','Cosplay','Dance','Café','Technology'].map((x)=><span key={x}>{x}</span>)}</div>
          </div>
        </div>
      </section>

      <section id="diary" className="shell section diary-section">
        <div className="section-title"><h3>Latest from Luna’s Diary</h3></div>
        <div className="editorial-diary">
          <article className="featured-story">
            <div className="featured-image"><Image src={featured.image} alt={featured.title} fill sizes="(max-width: 800px) 100vw, 58vw" /></div>
            <p className="story-meta">{featured.category} · Day 2</p>
            <h4>{featured.title}</h4>
            <p>{featured.excerpt}</p>
            <a href="#">Read the diary <ArrowRight size={14}/></a>
          </article>

          <div className="story-list">
            {supporting.map((item, i)=><article className="mini-story" key={item.id || item.title}>
              <div className="mini-story-image"><Image src={item.image} alt={item.title} fill sizes="180px" /></div>
              <div className="mini-story-copy">
                <p className="story-meta">{item.category} · Day {i + 1}</p>
                <h4>{item.title}</h4>
                <p>{item.excerpt}</p>
                <a href="#">Read more <ArrowRight size={13}/></a>
              </div>
            </article>)}
          </div>
        </div>
        <div className="center-action"><a className="btn ghost compact" href="#">View all diaries</a></div>
      </section>

      <section id="gallery" className="gallery-band">
        <div className="shell section">
          <div className="section-title"><h3>Little Moments</h3></div>
          <div className="gallery-groups">
            {galleryGroups.map((group, groupIndex)=><div className="gallery-card" key={groupIndex}>
              {group.map((src, imageIndex)=><div className={`gallery-tile tile-${imageIndex+1}`} key={`${groupIndex}-${src}-${imageIndex}`}>
                <Image src={src} alt="Luna moment" fill sizes="25vw" />
              </div>)}
            </div>)}
          </div>
        </div>
      </section>

      <section id="social" className="shell section social-section">
        <div className="section-title"><h3>Follow Luna’s Journey</h3></div>
        <div className="social-grid">
          <a className="social-card" href="#"><Facebook/><strong>Facebook</strong><span>Daily reels & diary posts</span></a>
          <a className="social-card" href="#"><span className="tik">♪</span><strong>TikTok</strong><span>Short-form moments</span></a>
          <a className="social-card" href="#"><Instagram/><strong>Instagram</strong><span>Photos & stories</span></a>
          <a className="social-card" href="#"><Youtube/><strong>YouTube</strong><span>Shorts & episodes</span></a>
        </div>
      </section>

      <section id="collab" className="collab-band">
        <div className="shell collab-grid">
          <div className="collab-media"><Image src="/images/cake.png" alt="Luna collaboration" fill sizes="45vw" /></div>
          <div className="collab-copy">
            <p className="section-kicker">Collaboration</p>
            <h3>Let’s create something together.</h3>
            <p>Fashion, lifestyle, beauty and creative collaborations that feel natural inside Luna’s world.</p>
            <div className="actions">
              <a className="btn primary" href="mailto:hello@example.com"><Mail size={15}/> Work With Luna</a>
              <a className="btn ghost" href="#">Media Kit</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="shell footer"><span>Luna AI Diary</span><span>© 2026 Luna Diary</span></footer>
    </main>
  );
}

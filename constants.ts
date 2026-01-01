
import { StoryChapter, StickyNote } from './types';

// Target date: January 2, 2026 (02-01-2026)
// JavaScript months are 0-indexed, so January is 0.
export const TARGET_DATE = new Date(2026, 0, 2, 0, 0, 0);

/**
 * CUSTOMIZE YOUR AUDIO HERE
 * Replace these URLs with your own audio file links (e.g., from Dropbox, Google Drive, or your own server)
 */
export const AUDIO_ASSETS = {
  // Main background music that loops across all sections
  BACKGROUND_MUSIC: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  
  // Sound when a sticky note is clicked
  STICKY_NOTE_WHOOSH: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3',
  
  // Sound for the final birthday celebration
  FINAL_CELEBRATION: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  
  // Optional: Add a specific "Happy Birthday" song URL here if you want to swap the background music during the cake section
  BIRTHDAY_SONG: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
};

export const STICKY_NOTES: StickyNote[] = [
  { id: 1, text: "You light up every room you walk into!", emoji: "✨", color: "bg-yellow-200" },
  { id: 2, text: "Your kindness is your greatest superpower.", emoji: "💖", color: "bg-pink-200" },
  { id: 3, text: "The world is better because you are in it.", emoji: "🌍", color: "bg-blue-200" },
  { id: 4, text: "Keep shining, beautiful soul!", emoji: "🌟", color: "bg-green-200" },
  { id: 5, text: "You are stronger than you realize.", emoji: "💪", color: "bg-purple-200" },
  { id: 6, text: "Your smile is truly contagious.", emoji: "😊", color: "bg-orange-200" },
  { id: 7, text: "Every day with you is a gift.", emoji: "🎁", color: "bg-red-200" },
  { id: 8, text: "You inspire me every single day.", emoji: "🌈", color: "bg-indigo-200" },
];

export const CHAPTERS: StoryChapter[] = [
  {
    id: 1,
    year: "2019",
    title: "A Random Pop-Up",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    content: `It was just another YouTube live class. Polity. Questions. Quizzes. Nothing special.
Then a message popped up: "Your Telegram ID?"
I stared at it. "Annie" - probably some guy using a fake name, right? I ignored it. 
But the next day, the same message appeared.
Something made me create a Telegram ID. Something made me reply.
Maybe curiosity. Maybe fate. Maybe both.
"Hi, I'm Rashid from Bihar."
"Hi, I'm Annie from Rajasthan."
Little did I know, this simple exchange would become the beginning of something I can't quite name, but can't imagine my life without.`
  },
  {
    id: 2,
    year: "2019-2020",
    title: "When Short Chats Became Long Nights",
    imageUrl: "https://images.unsplash.com/photo-1521310192545-4ac7951413f0?q=80&w=800&auto=format&fit=crop",
    content: `At first, it was just UPSC prep. Notes. Study schedules. Polity questions.
Safe. Simple. Easy.
But slowly, somewhere between "Good morning" and "Good night," we started talking about... everything else.
Your dreams. My fears. Your daily routine. My weird habits.
What made us laugh. What kept us awake.
I didn't notice when our 10-minute chats turned into 2 AM conversations.
I didn't notice when checking Telegram became the first thing I did every morning.
And then one day you told me your real name: Anisha.
Not Annie. Anisha.
It felt like you trusted me with something precious.
And maybe, just maybe, I was starting to feel something I wasn't ready to admit.`
  },
  {
    id: 3,
    year: "2020-2021",
    title: "The Distance",
    imageUrl: "https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=800&auto=format&fit=crop",
    content: `Life has a way of testing things, doesn't it?
You told me you were in a relationship. I stepped back. I had to.
Then I got into one too.
Our daily messages became weekly check-ins.
Our long calls became quick "How are you?"s.
Days turned to weeks. Weeks turned to months.
The person I talked to every single day suddenly felt like a distant memory.
And then... heartbreak found us both.
Your boyfriend cheated. Mine did too.
We were both broken, both hurting, both trying to piece ourselves back together.
The timing was cruel, wasn't it?
But maybe... maybe it brought us back when we needed each other the most.`
  },
  {
    id: 4,
    year: "2021-2022",
    title: "When Everyone Left, You Stayed",
    imageUrl: "https://images.unsplash.com/photo-1499209974431-9dac3adaf471?q=80&w=800&auto=format&fit=crop",
    content: `Depression is a strange beast.
It makes you feel alone even in a crowded room.
It convinces you that no one cares, no one understands.
When my world fell apart, most people said:
"You'll be fine." "Just move on." "Time heals everything."
But you? You just... listened.
You didn't try to fix me.
You didn't tell me to "be strong."
You just stayed.
At 3 AM when I couldn't sleep.
On days when I couldn't get out of bed.
When I was angry, when I was numb, when I was broken.
You were there. Always there.
And somewhere in those dark months, I realized something important:
Everyone else was temporary. You were constant.
Everyone else left. You stayed.
That's when our bond changed.
It wasn't just friendship anymore.
It was something deeper. Something rare.
Something I didn't want to lose.`
  },
  {
    id: 5,
    year: "2022-2024",
    title: "Complicated But Real",
    imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
    content: `I wish I could say it's been smooth sailing since then.
But that would be a lie.
I caught feelings. Real ones.
I tried to hide them. I failed.
I confessed. You said no.
"I'm not ready for commitment."
"I'm not ready for a relationship."
Fair enough. I understood.
But my heart didn't.
So I tried showing care in small ways:
Good morning texts. Checking if you ate.
Asking about your day.
And sometimes? You'd react in the most horrible way.
We'd fight. I'd pull back. You'd come back.
This became our pattern.
I'd try to move on. You'd send a message.
You'd push me away. I'd give you space.
Then we'd somehow end up talking again.
It's messy. It's confusing. I still don't know what's in your heart.
But here's what I DO know:
In November, we fought again. I stopped messaging.
I told myself: "That's it. I'm done."
But then you started calling.
You, who never shared your personal number.
You, who kept that boundary for years.
You called. From YOUR number.
"Save this. It's my personal number."
And just like that, we were back.
But different this time. You talked more.
You opened up. You let me in.
Maybe you don't know what we are.
Hell, I don't either.
But whatever this is - this complicated, messy, frustrating, beautiful thing between us - it's REAL.
And real is better than perfect.`
  },
  {
    id: 6,
    year: "2024-Present",
    title: "Today & Tomorrow",
    imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800&auto=format&fit=crop",
    content: `On my last birthday, you did something unexpected.
You woke up at 3 AM.
You wrote me a handwritten letter.
You told me to imagine we were together:
"Let's go to the hills. Let's cut the cake.
Let's ride around the city on a scooty."
You created a whole celebration over chat.
Do you know what that meant to me?
That someone, 1,200 kilometers away,
stayed awake just to make me feel special?
Six years, Anisha.
Six years from that random YouTube pop-up.
Six years from "Annie from Rajasthan."
Six years of late-night talks and long silences.
Six years of fights and forgiveness.
Six years of not knowing what we are,
but knowing we matter to each other.
Today is YOUR day.
And I want you to feel even a fraction
of what you made me feel on mine.
I don't know what tomorrow holds for us.
I don't know if we're friends, something more, or something undefined.
But I know this:
You've been my 3 AM person.
You've been my "when everyone left" person.
You've been my constant in a changing world.
So here's to you, Anisha.
To your kindness that you hide behind arguments.
To your care that you show in weird ways.
To your presence that makes my world better.
Happy Birthday. 💛
Thank you for being exactly who you are.
Thank you for staying.
Thank you for being... us.
Whatever that means.`
  }
];

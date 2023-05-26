import Link from 'next/link';
import Image from 'next/image';
import { getBlogViews, getStarCount } from '../lib/metrics';
import {
  ArrowIcon,
  GitHubIcon,
  TwitterIcon,
  ViewsIcon,
} from '../components/icons';
import { name, about, bio, avatar } from '../lib/info';
import NowPlaying from '@/components/indexgrid/spotify';
import TopPost from '@/components/indexgrid/top-post';
import FollowTwitter from '@/components/indexgrid/twitter';
import NowButton from '@/components/indexgrid/now';
import UsesButton from '@/components/indexgrid/uses';
import HobbiesButton from '@/components/indexgrid/hobbies';


export const revalidate = 60;

export default async function Home() {
  let starCount, views
  // This is the / route
  try {
    [starCount, views] = await Promise.all([
      getStarCount(),
      getBlogViews()
    ]);
  } catch (error) {
    console.error(error);
  }
  return (
     <section>
      <h1 className="font-bold text-3xl font-serif">{name}</h1>
      <p className="my-5 max-w-[460px] text-neutral-800 dark:text-neutral-200">
        {about()}
      </p>
      <div className="flex items-start md:items-center my-8 flex-col md:flex-row">
        <Image
          alt={name}
          className="rounded-full grayscale"
          src={avatar}
          placeholder="blur"
          width={100}
          priority
        />
        <div className="mt-8 md:mt-0 ml-0 md:ml-6 space-y-2 text-neutral-500 dark:text-neutral-400">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/leerob"
            className="flex items-center gap-2"
          >
            <GitHubIcon />
            {`${starCount?.toLocaleString()} stars on this repo`}
          </a>
          <Link href="/blog" className="flex items-center">
            <ViewsIcon />
            {`${views?.toLocaleString()} blog views all time`}
          </Link>
        </div>
      </div>
      {/* <p className="my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200">
        {bio()}
      </p> */}
      <hr />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mt-4'>
        <NowPlaying />
        <TopPost />
        <FollowTwitter />
        <NowButton />
        <UsesButton />
        <HobbiesButton />
        {/* <Location /> */}  
        {/* <CommandBar /> */}
        {/* Last Book */}
        {/* Calories  */}
      </div>
    </section>
  )
}

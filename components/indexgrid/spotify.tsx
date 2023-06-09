'use client';

import useSWR from 'swr';
import Image from 'next/image';
import fetcher from '@/lib/fetcher';
import { Song } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

interface NowPlayingData {
	albumImageUrl: string;
	isPlaying: boolean;
	songUrl: string | null;
	title: string | null;
	artist: string | null;
}

export default function NowPlaying() {
	//@ts-ignore
	const { data }: Song = useSWR<NowPlayingData>('/api/now-playing', { fetcher });

	return (
		<div className="h-90 p-4 rounded-md shadow-md max-w-md mx-auto border border-gray-200">
			{data?.isPlaying ? isPlaying({ data }) : isNotPlaying()}
		</div>
	);
}

const isNotPlaying = () => {
	return (
		<>
			<div className="relative h-38 mb-4">
				<Skeleton className="h-[320px] w-[325px] mb-4 bg-neutral-600 opacity-60" />
			</div>

			<div className="flex flex-col">
				<div className="flex flex-row justify-between items-center">
					<Skeleton className="bg-neutral-400 h-4 w-48 mb-2" />
					<svg className="h-5 w-5 ml-auto mt-1" viewBox="0 0 168 168">
						<path
							fill="#1ED760"
							d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
						/>
					</svg>
				</div>
				<div className="flex flex-row justify-between items-center">
					<Skeleton className="h-3 w-24 mr-3 bg-neutral-600" />
					<p className="text-neutral-400 text-sm">Not playing</p>
				</div>
			</div>
		</>
	);
};

const isPlaying = ({ data }: { data: NowPlayingData }) => {
	return (
		<>
			<div className="relative h-38 w-full mb-4">
				<Image
					src={data?.albumImageUrl}
					className="rounded-lg grayscale"
					alt="album cover"
					width={350}
					height={100}
				/>
			</div>
			<div className="flex flex-col">
				<div className="flex flex-row justify-between items-center">
					<h2 className="text-gray-100 text-sm font-semibold mb-2">{data?.title}</h2>
					<svg className="h-5 w-5 ml-auto mt-1" viewBox="0 0 168 168">
						<path
							fill="#1ED760"
							d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
						/>
					</svg>
				</div>
				<div className="flex flex-row justify-between items-center">
					<p className="text-gray-400 text-sm">{data?.artist}</p>
					<p className="text-gray-400 text-sm">Now playing</p>
				</div>
			</div>
		</>
	);
};

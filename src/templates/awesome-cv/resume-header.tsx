import type { Resume } from '@/@types/resume'
import {
	IconBrandBehance,
	IconBrandDiscord,
	IconBrandDribbble,
	IconBrandFacebook,
	IconBrandFigma,
	IconBrandGithub,
	IconBrandGitlab,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandMedium,
	IconBrandPinterest,
	IconBrandProducthunt,
	IconBrandReddit,
	IconBrandSkype,
	IconBrandSlack,
	IconBrandStackoverflow,
	IconBrandTeams,
	IconBrandTelegram,
	IconBrandTiktok,
	IconBrandTwitter,
	IconBrandWhatsapp,
	IconBrandX,
	IconBrandYoutube,
	IconBrandZoom,
	IconWorld,
} from '@tabler/icons-react'
import { Home, Mail, Smartphone } from 'lucide-react'
import { Fragment } from 'react'

const socialNetworkIcons: Record<
	string,
	React.ComponentType<{ className?: string }>
> = {
	github: IconBrandGithub,
	linkedin: IconBrandLinkedin,
	twitter: IconBrandTwitter,
	x: IconBrandX,
	youtube: IconBrandYoutube,
	instagram: IconBrandInstagram,
	facebook: IconBrandFacebook,
	discord: IconBrandDiscord,
	telegram: IconBrandTelegram,
	whatsapp: IconBrandWhatsapp,
	tiktok: IconBrandTiktok,
	pinterest: IconBrandPinterest,
	reddit: IconBrandReddit,
	medium: IconBrandMedium,
	behance: IconBrandBehance,
	dribbble: IconBrandDribbble,
	figma: IconBrandFigma,
	gitlab: IconBrandGitlab,
	stackoverflow: IconBrandStackoverflow,
	producthunt: IconBrandProducthunt,
	slack: IconBrandSlack,
	skype: IconBrandSkype,
	zoom: IconBrandZoom,
	teams: IconBrandTeams,
}

export default function ResumeHeader({ resume }: { resume: Resume }) {
	const basics = resume.basics
	const { awesomeCV: settings } = resume.settings
	return (
		<div
			className={`flex flex-col items-${settings.headerAlignment} justify-${settings.headerAlignment}`}
		>
			<div className="flex flex-row my-0 ">
				<h1 className="leading-none text-[32pt] font-thin text-[#5D5D5D] mx-2">
					{basics.firstName}
				</h1>
				<h1 className="leading-none text-[32pt] font-bold">
					{basics.lastName}
				</h1>
			</div>
			<div className="flex flex-row my-2">
				{basics.phone.length > 0 && (
					<div className="flex flex-row mx-1">
						<Smartphone className="text-[#333333] mx-1" size={16} />
						<p className="text-xs">{basics.phone}</p>
					</div>
				)}
				{basics.phone.length > 0 &&
					(basics.email.length > 0 ||
						basics.url.length > 0 ||
						basics.profiles.length > 0) && <span className="text-xs">|</span>}
				{basics.email.length > 0 && (
					<div className="flex flex-row mx-1">
						<Mail className="text-[#333333] mx-1" size={16} />
						<a href={`mailto:${basics.email}`} className="text-xs">
							{basics.email}
						</a>
					</div>
				)}
				{basics.email.length > 0 &&
					(basics.url.length > 0 || basics.profiles.length > 0) && (
						<span className="text-xs">|</span>
					)}
				{basics.url.length > 0 && (
					<div className="flex flex-row mx-1">
						<Home className="text-[#333333] mx-1" size={16} />
						<a
							href={
								basics.url.startsWith('http')
									? basics.url
									: `http://${basics.url}`
							}
							target="_blank"
							rel="noreferrer"
							className="text-xs"
						>
							{basics.url}
						</a>
					</div>
				)}
				{basics.url.length > 0 && basics.profiles.length > 0 && (
					<span className="text-xs">|</span>
				)}
				{basics.profiles.length > 0 &&
					basics.profiles.map((profile, index) => {
						const Icon =
							socialNetworkIcons[profile.network.toLowerCase()] || IconWorld

						return (
							<Fragment key={profile.id}>
								<div className="flex flex-row mx-1">
									<Icon className="text-[#333333] mx-1 size-4" />
									<a
										href={profile.url}
										target="_blank"
										rel="noreferrer"
										className="text-xs"
									>
										{profile.username}
									</a>
								</div>
								{index < basics.profiles.length - 1 && (
									<span className="text-xs">|</span>
								)}
							</Fragment>
						)
					})}
			</div>
			{basics.quote.length > 0 && (
				<span className="text-xs my-4">{`"${basics.quote}"`}</span>
			)}
		</div>
	)
}

import { Linkedin, Gitlab, Twitter, Mail, Home, Github } from "lucide-react";
import { CVProps } from "@/types/cv-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileScreenButton,
  faEnvelope,
  faHouseChimney,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareGithub, faLinkedin, faSquareGitlab, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Smartphone } from "lucide-react";

export default function CVHeader(props: CVProps) {
  const { awesomeCV: settings } = props.settings;
  return (
    <div
      className={`flex flex-col items-${settings.headerAlignment} justify-${settings.headerAlignment}`}
    >
      <div className="flex flex-row my-0 ">
        <h1 className="leading-none text-[32pt] font-thin text-[#5D5D5D] mx-2">
          {props.header.firstName}
        </h1>
        <h1 className="leading-none text-[32pt] font-bold">
          {props.header.lastName}
        </h1>
      </div>
      <div className="flex flex-row my-2">
        {props.header.phoneEnabled && (
          <div className="flex flex-row mx-1">
            <Smartphone className="text-[#333333] mx-1" size={16} />
            {/* <FontAwesomeIcon
              icon={faMobileScreenButton}
              size="1x"
              className="text-[#333333] mx-1"
            /> */}
            <p className="text-xs">{props.header.phone}</p>
          </div>
        )}
        {props.header.phoneEnabled &&
          (props.header.emailEnabled ||
            props.header.homepageEnabled ||
            props.header.githubEnabled ||
            props.header.linkedinEnabled ||
            props.header.gitlabEnabled ||
            props.header.twitterEnabled) && <span className="text-xs">|</span>}
        {props.header.emailEnabled && (
          <div className="flex flex-row mx-1">
            {/* <FontAwesomeIcon
              icon={faEnvelope}
              size="1x"
              className="text-[#333333] mx-1"
            /> */}
            <Mail className="text-[#333333] mx-1" size={16} />
            <a href={`mailto:${props.header.email}`} className="text-xs">
              {props.header.email}
            </a>
          </div>
        )}
        {props.header.emailEnabled &&
          (props.header.homepageEnabled ||
            props.header.githubEnabled ||
            props.header.linkedinEnabled ||
            props.header.gitlabEnabled ||
            props.header.twitterEnabled) && <span className="text-xs">|</span>}
        {props.header.homepageEnabled && (
          <div className="flex flex-row mx-1">
            {/* <FontAwesomeIcon
              icon={faHouseChimney}
              size="1x"
              className="text-[#333333] mx-1"
            /> */}
            <Home className="text-[#333333] mx-1" size={16} />
            <a href={`http://${props.header.homepage}`} className="text-xs">
              {props.header.homepage}
            </a>
          </div>
        )}
        {props.header.homepageEnabled &&
          (props.header.githubEnabled ||
            props.header.linkedinEnabled ||
            props.header.gitlabEnabled ||
            props.header.twitterEnabled) && <span className="text-xs">|</span>}
        {props.header.githubEnabled && (
          <div className="flex flex-row mx-1">
            {/* <FontAwesomeIcon
              icon={faSquareGithub}
              size="1x"
              className="text-[#333333] mx-1"
            /> */}
            <Github className="text-[#333333] mx-1" size={16} />
            <a
              href={`http://github.com/${props.header.github}`}
              className="text-xs"
            >
              {props.header.github}
            </a>
          </div>
        )}
        {props.header.githubEnabled &&
          (props.header.linkedinEnabled ||
            props.header.gitlabEnabled ||
            props.header.twitterEnabled) && <span className="text-xs">|</span>}
        {props.header.linkedinEnabled && (
          <div className="flex flex-row mx-1">
            {/* <FontAwesomeIcon
              icon={faLinkedin}
              size="1x"
              className="text-[#333333] mx-1"
            /> */}
            <Linkedin className="text-[#333333] mx-1" size={16} />
            <a
              href={`http://linkedin.com/in/${props.header.linkedin}`}
              className="text-xs"
            >
              {props.header.linkedin}
            </a>
          </div>
        )}
        {props.header.linkedinEnabled &&
          (props.header.gitlabEnabled || props.header.twitterEnabled) && (
            <span className="text-xs">|</span>
          )}
        {props.header.gitlabEnabled && (
          <div className="flex flex-row mx-1">
            {/* <FontAwesomeIcon
              icon={faSquareGitlab}
              size="1x"
              className="text-[#333333] mx-1"
            /> */}
            <Gitlab className="text-[#333333] mx-1" size={16}/>
            <a
              href={`http://gitlab.com/${props.header.gitlab}`}
              className="text-xs"
            >
              {props.header.gitlab}
            </a>
          </div>
        )}
        {props.header.gitlabEnabled && props.header.twitterEnabled && (
          <span className="text-xs">|</span>
        )}
        {props.header.twitterEnabled && (
          <div className="flex flex-row mx-1">
            {/* <FontAwesomeIcon
              icon={faTwitter}
              size="1x"
              className="text-[#333333] mx-1"
            /> */}
            <Twitter className="text-[#333333] mx-1" size={16} />
            <a
              href={`http://twitter.com/${props.header.twitter}`}
              className="text-xs"
            >
              {props.header.twitter}
            </a>
          </div>
        )}
      </div>
      {props.header.quoteEnabled && (
        <span className="text-xs my-4">{`"${props.header.quote}"`}</span>
      )}
    </div>
  );
}

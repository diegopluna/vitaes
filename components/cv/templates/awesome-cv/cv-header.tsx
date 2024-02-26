import {
  Smartphone,
  Mail,
  Home,
  Github,
  Linkedin,
  Gitlab,
  Twitter,
} from "lucide-react";
import {CVProps} from "@/types/cv-types";

export default function CVHeader(props: CVProps) {
  return (
    <div className="text-gray-700">
      <div
        className={`flex flex-col items-${props.settings.headerAlignment} justify-${props.settings.headerAlignment}`}
      >
        <div className="flex flex-row ">
          <h1 className="text-4xl  mx-2">{props.header.firstName}</h1>
          <h1 className="text-4xl font-bold text-black">{props.header.lastName}</h1>
        </div>
        <div className="flex flex-row my-2">
          {props.header.phoneEnabled && (
            <div className="flex flex-row mx-1">
              <Smartphone className="text-black mx-1" size={16} />
              <p className="text-xs">{props.header.phone}</p>
            </div>
          )}
          {props.header.emailEnabled && (
            <div className="flex flex-row mx-1">
              <Mail className="text-black mx-1" size={16} />
              <a href={`mailto:${props.header.email}`} className="text-xs">
                {props.header.email}
              </a>
            </div>
          )}
          {props.header.homepageEnabled && (
            <div className="flex flex-row mx-1">
              <Home className="text-black mx-1" size={16} />
              <a href={`http://${props.header.homepage}`} className="text-xs">
                {props.header.homepage}
              </a>
            </div>
          )}
          {props.header.githubEnabled && (
            <div className="flex flex-row mx-1">
              <Github className="text-black mx-1" size={16} />
              <a href={`http://github.com/${props.header.github}`} className="text-xs">
                {props.header.github}
              </a>
            </div>
          )}
          {props.header.linkedinEnabled && (
            <div className="flex flex-row mx-1">
              <Linkedin className="text-black mx-1" size={16} />
              <a
                href={`http://linkedin.com/in/${props.header.linkedin}`}
                className="text-xs"
              >
                {props.header.linkedin}
              </a>
            </div>
          )}
          {props.header.gitlabEnabled && (
            <div className="flex flex-row mx-1">
              <Gitlab className="text-black mx-1" size={16} />
              <a href={`http://gitlab.com/${props.header.gitlab}`} className="text-xs">
                {props.header.gitlab}
              </a>
            </div>
          )}
          {props.header.twitterEnabled && (
            <div className="flex flex-row mx-1">
              <Twitter className="text-black mx-1" size={16} />
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
    </div>
  );
}

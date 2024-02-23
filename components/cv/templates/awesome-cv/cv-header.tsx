import {
  Smartphone,
  Mail,
  Home,
  Github,
  Linkedin,
  Gitlab,
  Twitter,
} from "lucide-react";
import { CVHeaderProps } from "@/types/cv-types";

export default function CVHeader(props: CVHeaderProps) {
  return (
    <div className="text-gray-700">
      <div
        className={`flex flex-col items-${props.alignment} justify-${props.alignment}`}
      >
        <div className="flex flex-row">
          <h1 className="text-4xl  mx-2">{props.firstName}</h1>
          <h1 className="text-4xl font-bold text-black">{props.lastName}</h1>
        </div>
        <div className="flex flex-row my-2">
          {props.phoneEnabled && (
            <div className="flex flex-row mx-1">
              <Smartphone className="text-black mx-1" size={16} />
              <p className="text-xs">{props.phone}</p>
            </div>
          )}
          {props.emailEnabled && (
            <div className="flex flex-row mx-1">
              <Mail className="text-black mx-1" size={16} />
              <a href={`mailto:${props.email}`} className="text-xs">
                {props.email}
              </a>
            </div>
          )}
          {props.homepageEnabled && (
            <div className="flex flex-row mx-1">
              <Home className="text-black mx-1" size={16} />
              <a href={`http://${props.homepage}`} className="text-xs">
                {props.homepage}
              </a>
            </div>
          )}
          {props.githubEnabled && (
            <div className="flex flex-row mx-1">
              <Github className="text-black mx-1" size={16} />
              <a href={`http://github.com/${props.github}`} className="text-xs">
                {props.github}
              </a>
            </div>
          )}
          {props.linkedinEnabled && (
            <div className="flex flex-row mx-1">
              <Linkedin className="text-black mx-1" size={16} />
              <a
                href={`http://linkedin.com/in/${props.linkedin}`}
                className="text-xs"
              >
                {props.linkedin}
              </a>
            </div>
          )}
          {props.gitlabEnabled && (
            <div className="flex flex-row mx-1">
              <Gitlab className="text-black mx-1" size={16} />
              <a href={`http://github.com/${props.gitlab}`} className="text-xs">
                {props.gitlab}
              </a>
            </div>
          )}
          {props.twitterEnabled && (
            <div className="flex flex-row mx-1">
              <Twitter className="text-black mx-1" size={16} />
              <a
                href={`http://twitter.com/${props.twitter}`}
                className="text-xs"
              >
                {props.twitter}
              </a>
            </div>
          )}
        </div>
        {props.quoteEnabled && (
          <span className="text-xs my-4">{`"${props.quote}"`}</span>
        )}
      </div>
    </div>
  );
}

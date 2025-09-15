import { Font, Image, Link, Text, View } from "@react-pdf/renderer";
import type { StaticImageData } from "next/image";
import { Fragment } from "react";
import type { Resume } from "@/convex/resume/type";
import Home from "./icons/home.png";
import IconBrandBehance from "./icons/icon-brand-behance.png";
import IconBrandDiscord from "./icons/icon-brand-discord.png";
import IconBrandDribbble from "./icons/icon-brand-dribbble.png";
import IconBrandFacebook from "./icons/icon-brand-facebook.png";
import IconBrandFigma from "./icons/icon-brand-figma.png";
import IconBrandGithub from "./icons/icon-brand-github.png";
import IconBrandGitlab from "./icons/icon-brand-gitlab.png";
import IconBrandInstagram from "./icons/icon-brand-instagram.png";
import IconBrandLinkedin from "./icons/icon-brand-linkedin.png";
import IconBrandMedium from "./icons/icon-brand-medium.png";
import IconBrandPinterest from "./icons/icon-brand-pinterest.png";
import IconBrandProducthunt from "./icons/icon-brand-producthunt.png";
import IconBrandReddit from "./icons/icon-brand-reddit.png";
import IconBrandSlack from "./icons/icon-brand-slack.png";
import IconBrandStackoverflow from "./icons/icon-brand-stackoverflow.png";
import IconBrandTeams from "./icons/icon-brand-teams.png";
import IconBrandTelegram from "./icons/icon-brand-telegram.png";
import IconBrandTiktok from "./icons/icon-brand-tiktok.png";
import IconBrandTwitter from "./icons/icon-brand-twitter.png";
import IconBrandWhatsapp from "./icons/icon-brand-whatsapp.png";
import IconBrandX from "./icons/icon-brand-x.png";
import IconBrandYoutube from "./icons/icon-brand-youtube.png";
import IconBrandZoom from "./icons/icon-brand-zoom.png";
import IconWorld from "./icons/icon-world.png";
import Mail from "./icons/mail.png";
import Smartphone from "./icons/smartphone.png";

const socialNetworkIcons: Record<string, StaticImageData> = {
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
  zoom: IconBrandZoom,
  teams: IconBrandTeams,
};

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/roboto/Roboto-Regular.ttf" },
    { src: "/fonts/roboto/Roboto-Thin.ttf", fontWeight: "thin" },
    { src: "/fonts/roboto/Roboto-Bold.ttf", fontWeight: "bold" },
  ],
});

export default function ResumeHeader({ resume }: { resume: Resume }) {
  const basics = resume.basics;
  const { awesomeCV: settings } = resume.settings;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent:
          settings.headerAlignment === "center"
            ? "center"
            : settings.headerAlignment === "end"
              ? "flex-end"
              : "flex-start",
        alignItems:
          settings.headerAlignment === 'center'
            ? 'center'
            : settings.headerAlignment === 'end'
              ? 'flex-end'
              : 'flex-start',
      }}
    >
      <View
        style={{ display: "flex", flexDirection: "row", marginVertical: 0 }}
      >
        <Text
          style={{
            lineHeight: 1,
            fontSize: 32,
            color: "#5D5D5D",
            marginRight: 6,
            fontFamily: "Roboto",
            fontWeight: "thin",
          }}
        >
          {basics.firstName}
        </Text>
        <Text
          style={{
            lineHeight: 1,
            fontSize: 32,
            fontWeight: "bold",
            fontFamily: "Roboto",
            color: "#333333",
          }}
        >
          {basics.lastName}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginVertical: 6,
          alignItems: "center",
        }}
      >
        {basics.phone.length > 0 && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginRight: 3,
              alignItems: "center",
            }}
          >
            <Image
              src={Smartphone.src}
              style={{
                marginHorizontal: 3,
                width: 12,
                height: 12,
              }}
            />
            <Text
              style={{ fontSize: 9, fontFamily: "Roboto", color: "#333333" }}
            >
              {basics.phone}
            </Text>
          </View>
        )}
        {basics.phone.length > 0 &&
          (basics.email.length > 0 ||
            basics.url.length > 0 ||
            basics.profiles.length > 0) && (
            <Text
              style={{ fontSize: 9, fontFamily: "Roboto", color: "#333333" }}
            >
              |
            </Text>
          )}
        {basics.email.length > 0 && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginHorizontal: 3,
              alignItems: "center",
            }}
          >
            <Image
              src={Mail.src}
              style={{ marginHorizontal: 3, width: 12, height: 12 }}
            />
            <Link
              src={`mailto:${basics.email}`}
              style={{
                fontSize: 9,
                color: "#333333",
                textDecoration: "none",
                fontFamily: "Roboto",
              }}
            >
              {basics.email}
            </Link>
          </View>
        )}
        {basics.email.length > 0 &&
          (basics.url.length > 0 || basics.profiles.length > 0) && (
            <Text
              style={{ fontSize: 9, fontFamily: "Roboto", color: "#333333" }}
            >
              |
            </Text>
          )}
        {basics.url.length > 0 && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginHorizontal: 3,
              alignItems: "center",
            }}
          >
            <Image
              src={Home.src}
              style={{ marginHorizontal: 3, width: 12, height: 12 }}
            />
            <Link
              src={
                basics.url.startsWith("http")
                  ? basics.url
                  : `http://${resume.basics.url}`
              }
              style={{
                fontSize: 9,
                color: "#333333",
                textDecoration: "none",
                fontFamily: "Roboto",
              }}
            >
              {basics.url}
            </Link>
          </View>
        )}
        {basics.url.length > 0 && basics.profiles.length > 0 && (
          <Text style={{ fontSize: 9, fontFamily: "Roboto", color: "#333333" }}>
            |
          </Text>
        )}
        {basics.profiles.length > 0 &&
          basics.profiles.map((profile, index) => {
            const image =
              socialNetworkIcons[
                profile.network.toLowerCase() || IconWorld.src
              ];

            return (
              <Fragment key={profile.id}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginRight: 3,
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={image.src}
                    style={{
                      marginHorizontal: 3,
                      width: 12,
                      height: 12,
                    }}
                  />
                  <Link
                    src={profile.url}
                    style={{
                      fontSize: 9,
                      color: "#333333",
                      textDecoration: "none",
                      fontFamily: "Roboto",
                    }}
                  >
                    {profile.username}
                  </Link>
                </View>
                {index < resume.basics.profiles.length - 1 && (
                  <Text
                    style={{
                      fontSize: 9,
                      fontFamily: "Roboto",
                      color: "#333333",
                    }}
                  >
                    |
                  </Text>
                )}
              </Fragment>
            );
          })}
      </View>
      {basics.quote.length > 0 && (
        <Text
          style={{
            fontSize: 9,
            fontFamily: "Roboto",
            marginVertical: 12,
            color: "#333333",
          }}
        >{`"${basics.quote}"`}</Text>
      )}
    </View>
  );
}

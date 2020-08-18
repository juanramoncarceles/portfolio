<template>
  <div id="itemsContainer">
    <div id="profile">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250">
        <defs>
          <radialGradient
            id="myGradient"
            gradientUnits="userSpaceOnUse"
            cx="203.5"
            cy="45"
          >
            <stop offset="0%" stop-color="#2d2d2d" stop-opacity="1" />
            <stop offset="60%" stop-opacity="0" />
          </radialGradient>
        </defs>
        <g style="display:none;fill:none;stroke:#2d2d2d;stroke-width:0.5px">
          <line x1="226" x2="181" y2="90" style="stroke:url(#myGradient);" />
          <line x1="109" x2="64" y2="90" />
          <line x1="64" x2="18" y2="90" />
          <line x1="82" x2="37" y2="90" />
          <line y1="9" x2="250" y2="9" />
          <line x1="145" x2="190" y2="90" />
          <line x1="118" x2="162" y2="90" />
          <line x1="163" x2="207" y2="90" />
          <line x1="55" x2="99" y2="90" />
          <line x1="19" x2="63" y2="90" />
          <line x1="64" x2="108" y2="90" />
          <line x1="167" x2="167" y2="90" />
          <line x1="212" x2="212" y2="90" />
          <line x1="140" x2="140" y2="90" />
          <line x1="104" x2="104" y2="90" />
          <line x1="226" x2="226" y2="90" />
          <line x1="136" x2="136" y2="90" />
          <line x1="77" x2="77" y2="90" />
          <line x1="14" x2="14" y2="90" />
          <line y1="45" x2="250" y2="45" />
          <line y1="81" x2="250" y2="81" />
          <line x1="41" x2="41" y2="90" />
          <line x1="37" x2="81" y2="90" />
          <line x1="181" x2="135" y2="90" />
          <line x1="73" x2="117" y2="90" />
          <line x1="136" x2="180" y2="90" />
        </g>
        <g
          style="fill:none;stroke:#3c3c3c;stroke-linejoin:bevel;stroke-miterlimit:0;stroke-width:2px"
        >
          <path d="M226,45h-4a9,9,0,0,0,0,18h4Z" />
          <path d="M226,81h4a9,9,0,0,0,0-18h-4Z" />
          <polygon points="212 81 212 45 185 45 194 63 185 81 212 81" />
          <polygon points="167 45 167 81 185 81 167 45" />
          <polygon points="167 81 167 45 140 45 149 63 140 81 167 81" />
          <path d="M136,81h-9a18,18,0,0,1,0-36h9Z" />
          <path d="M104,81,98,70a14,14,0,0,0-8-25H77V81Z" />
          <polygon points="77 81 59 45 41 81 77 81" />
          <path d="M41,81H32a18,18,0,0,1,0-36h9Z" style="fill: #456e8a;" />
          <polygon points="167 9 167 45 149 9 167 9" />
          <polygon points="140 45 140 9 158 45 140 45" />
          <circle cx="122" cy="27" r="18" />
          <polygon points="77 45 77 9 91 36 104 9 104 45 77 45" />
          <polygon points="77 45 59 9 41 45 77 45" />
          <path
            d="M41,45H32A18,18,0,0,0,14,63V9H28a14,14,0,0,1,8,25Z"
            style="fill: #36566b;"
          />
        </g>
        <text y="112" id="subtitle">
          <tspan x="240">web</tspan>
          <tspan x="240" dy="24">developer</tspan>
        </text>
        <g id="profile-links">
          <a href="cv/index.html" target="_blank">
            <text y="175" x="35">resume</text>
          </a>
          <a href="https://github.com/juanramoncarceles" target="_blank">
            <text y="195" x="35">github</text>
          </a>
          <a href="https://www.linkedin.com/in/ramoncarceles/" target="_blank">
            <text y="215" x="35">linkedin</text>
          </a>
          <a href="https://codepen.io/jrcr" target="_blank">
            <text y="235" x="35">codepen</text>
          </a>
        </g>
      </svg>
    </div>
    <ProjectItem
      v-for="(data, i) in projectsData"
      :key="i"
      :projectData="data"
      :mediaQueryHover="mediaQueryHover"
      @make-currently-active="saveActiveItem"
      @make-not-currently-active="unsetActiveItem"
      @make-currently-selected="saveSelectedItem"
    />
    <div
      id="bgmask"
      ref="bgmask"
      @click="
        () => {
          if (activeItem) activeItem.deactivateItem();
        }
      "
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProjectData, LinkData } from "@/types";
import ProjectItem from "./ProjectItem.vue";
import { LinkIconId, LinkTitle } from "../enums";

@Component({
  components: {
    ProjectItem
  }
})
export default class ItemsWrapper extends Vue {
  @Prop() readonly mediaQueryHover!: MediaQueryList;

  private activeItem: ProjectItem | undefined;
  private selectedItem: ProjectItem | undefined;
  private projectsData: Array<ProjectData> = [
    {
      title: "BIM Drawings",
      description:
        "<p>Master's degree thesis project. App for managing documentation of BIM projects. The core idea are the smart drawings, which are building blueprints with attached BIM data. It is possible to check the data of a building element in the drawing, to add comments to them and tag collaborators, and to mesure distances, angles and areas.</p><p>It is a serverless app connected to Google Drive to allow to store data and collaborate, and Firebase for cloud messaging. An exporter is required for each target platform to generate a file with all the data.</p>",
      tags: ["TypeScript", "SVG", "Google API", "Firebase"],
      image: "bimDrawings.png",
      svgTitle: ["BIM", "drawings"],
      links: [
        new LinkData(
          "https://github.com/juanramoncarceles/bim-drawings",
          LinkTitle.GitHub,
          LinkIconId.GitHub
        ),
        new LinkData(
          "https://bimdrawings.ramoncarceles.com/",
          LinkTitle.External,
          LinkIconId.External
        )
      ]
    },
    {
      title: "Nutrition facts",
      description:
        "<p>Small React app that allows to check food nutrition values. It fetches the data from a JSON file. CSS is written inside the TypeScript files thanks to Emotion. It has a responsive SVG user interface with conditional mediaqueries. CountUp.js is used to do the numbers transition. I created all the vector graphics including the user interface using SVG produced with Inkscape.</p>",
      tags: ["React", "TypeScript", "SVG"],
      image: "nutritionFacts.png",
      svgTitle: ["nutrition", "facts"],
      links: [
        new LinkData(
          "https://github.com/juanramoncarceles/nutrition-facts",
          LinkTitle.GitHub,
          LinkIconId.GitHub
        ),
        new LinkData(
          "https://nutritionfactsapp.ramoncarceles.com",
          LinkTitle.External,
          LinkIconId.External
        )
      ]
    },
    {
      title: "User votes emailing",
      description:
        "<p>Web app designed to help with the task of sending emails to a group of users that have reported some issue or request at some time during a product development. When the issue or request is fullfilled and all the users should be notified it reads a Google Sheet where all the data was stored and sends emails to the users to notify them.</p><p>All the data is processed before sending the emails to avoid that a single user receives more than one email. It uses NodeJS with Nodemailer and Pug.</p>",
      tags: ["NodeJS", "Google Sheet API", "Pug"],
      image: "usersVotesReport.png",
      svgTitle: ["user votes", "emailing"],
      links: [
        new LinkData(
          "https://github.com/juanramoncarceles/users-votes-emailing",
          LinkTitle.GitHub,
          LinkIconId.GitHub
        )
      ]
    },
    {
      title: "UOCFlix",
      description:
        "<p>Serverless app to check data about movies (votes, summaries, genres, date, images, etc.). All the data is fetched from The Movie Database REST API. It was developed with Vanilla JavaScript and it is a PWA (progressive web app) hence offering the possibility to be installed.</p>",
      tags: ["PWA", "Vanilla JavaScript", "API"],
      image: "uocFlix.png",
      svgTitle: ["UOCFlix"],
      links: [
        new LinkData(
          "https://github.com/juanramoncarceles/uoc-flix",
          LinkTitle.GitHub,
          LinkIconId.GitHub
        ),
        new LinkData(
          "https://juanramoncarceles.github.io/uoc-flix/",
          LinkTitle.External,
          LinkIconId.External
        )
      ]
    },
    {
      title: "News portal",
      description:
        "<p>Master's degree back-end development course's final project. It consists on a web app to read news. Only certain parts of the application were developed. It uses Laravel on the back-end, which is used to create a REST API that is used from the front-end to perform all the operations. The front-end was developed with Vue.</p>",
      tags: ["Laravel", "Vue", "API REST"],
      image: "newsPortal.png",
      svgTitle: ["news", "portal"],
      links: [
        new LinkData(
          "https://github.com/juanramoncarceles/news-portal",
          LinkTitle.GitHub,
          LinkIconId.GitHub
        )
        // new LinkData("", LinkTitle.External, LinkIconId.External)
      ]
    },
    {
      title: "SettleApp",
      description:
        "<p>Web app to add expenses and split them among several people. Project developed during a full-stack development course. It uses ReactJS, NodeJS and MongoDB. It was not finished.</p>",
      tags: ["React", "NodeJS", "MongoDB"],
      image: "settleApp.png",
      svgTitle: ["settle", "app"],
      links: [
        new LinkData(
          "https://github.com/juanramoncarceles/settle-app",
          LinkTitle.GitHub,
          LinkIconId.GitHub
        )
      ]
    },
    {
      title: "Language message",
      description:
        "<p>Laguage message box that can be added to an existing multilanguage web site like a WordPress site. The goal is to advise to the user that the site is available on it's preferred language. First time it uses the browser's language to know which could be the preferred language. Once the user has made a decision it is stored and used next time. It can be configured to for example offer automatic redirect or to postion it relative to another element like a tooltip or centered in the viewport.</p>",
      tags: ["Vanilla JavaScript"],
      image: "languageMessage.png",
      svgTitle: ["language", "message"],
      links: [
        new LinkData(
          "https://github.com/juanramoncarceles/language-message",
          LinkTitle.GitHub,
          LinkIconId.GitHub
        )
        // new LinkData("", LinkTitle.External, LinkIconId.External)
      ]
    },

    // {
    //   title: "Mon Oncle",
    //   description:
    //     "Interactive scene of the movie Mon Oncle by Jacques Tati. SVG created with Illustrator. A mix of CSS animations is used for continuous background elements and JavaScript for interactive elements.",
    //   image: "monOncle.png",
    //   svgTitle: ["Mon", "Oncle"],
    //   links: [
    //     new LinkData("", LinkTitle.CodePen, LinkIconId.CodePen),
    //     new LinkData("", LinkTitle.External, LinkIconId.External)
    //   ]
    // },
    {
      title: "Beverages morph",
      description:
        "<p>Several beverages can be transitioned. Each one has a subtle animation. It is a mix of CSS animations and the library Snap.svg to morph SVG paths. The idea is to create a digital beverages menu, which is currently work in progress.</p>",
      tags: ["SVG", "Snap.svg"],
      image: "beveragesMorph.png",
      svgTitle: ["beverages", "morph"],
      links: [
        new LinkData(
          "https://github.com/juanramoncarceles/beverages-animation",
          LinkTitle.GitHub,
          LinkIconId.GitHub
        ),
        new LinkData(
          "https://juanramoncarceles.github.io/beverages-animation/",
          LinkTitle.External,
          LinkIconId.External
        )
      ]
    },
    {
      title: "Logo animations",
      description:
        "<p>GreenSock SVG animations of existing logos from Lands Design and VisualARQ. CSS properties like stroke dasharray and linear gradient are animated.</p><p>Also the MorphSVGPlugin from GreenSock in the case of Lands Design was used to achieve the transition from a leaf to all the letters.</p><p>The original SVG drawings were restructured with Inkscape to have the right structre for the animations to be possible.</p>",
      tags: ["SVG", "GreenSock"],
      image: "logoAnimations.png",
      svgTitle: ["logo", "animations"],
      links: [
        new LinkData(
          "https://codepen.io/jrcr/pen/wvwZYRb",
          LinkTitle.CodePen,
          LinkIconId.CodePen
        ),
        new LinkData(
          "https://codepen.io/jrcr/pen/WVEzoZ",
          LinkTitle.CodePen,
          LinkIconId.CodePen
        )
      ]
    },
    {
      title: "Round layout",
      description:
        "<p>System to distribute a set of images in a round layout. On hover over an image it grows and if selected it is placed in the center.</p><p>It was developed as a part of a bigger application, an with the idea to make it possible to be integrated in any project. Currently it is a work in progress.</p>",
      tags: ["Vanilla JavaScript"],
      image: "roundPicsLayout.png",
      svgTitle: ["round", "layout"],
      links: [
        new LinkData(
          "https://codepen.io/jrcr/pen/mYNooK",
          LinkTitle.CodePen,
          LinkIconId.CodePen
        )
      ]
    },
    {
      title: "Flying birds",
      description:
        "<p>Small excercise animating a single SVG symbol with window.requestAnimationFrame(). It is generated randomly as a SVG &lt;use&gt; element that references the symbol and then attached to the DOM as a shadow element. Once it has passed the right side of the viewport it is deleted to avoid the DOM growing excessively. Since a single SVG symbol is used, the movement is shared among all the birds, and only properties like scale and fill color can be set differently by instance.</p>",
      tags: ["SVG", "Vanilla JavaScript"],
      image: "flyingBirds.png",
      svgTitle: ["flying", "birds"],
      links: [
        new LinkData(
          "https://codepen.io/jrcr/pen/GRKyQgL",
          LinkTitle.CodePen,
          LinkIconId.CodePen
        )
      ]
    }
  ];

  private saveActiveItem(item: ProjectItem) {
    this.activeItem = item;
    (this.$refs.bgmask as HTMLElement).classList.add("active");
  }

  private unsetActiveItem() {
    this.activeItem = undefined;
    (this.$refs.bgmask as HTMLElement).classList.remove("active");
  }

  private saveSelectedItem(item: ProjectItem) {
    if (this.selectedItem) {
      this.selectedItem.deselectItem();
    }
    this.selectedItem = item;
  }
}
</script>

<style lang="scss">
#itemsContainer {
  display: grid;
  max-width: 1300px;
  grid-template-columns: 1fr 1fr;
  gap: 0.3rem;
  grid-gap: 0.3rem;
  margin: auto;
}

#profile {
  grid-area: 1 / 1 / 3 / 3;
  font-family: "Raleway", sans-serif;
  --theme-color: #456e8a;
  & > svg {
    display: block;
  }
}

#profile-links {
  font-size: 16px;
  font-weight: 400;
  fill: #666;
  & > a:visited {
    fill: #666;
  }
  & > a:hover {
    fill: var(--theme-color);
  }
}

#subtitle {
  text-anchor: end;
  font-size: 26px;
  font-weight: 700;
  fill: var(--theme-color);
}

#bgmask {
  position: fixed;
  height: 0;
  width: 100vw;
  left: 0;
  background-color: rgba(60, 60, 60, 0.7);
  transition: height 1s;
}

#bgmask.active {
  height: 100vh;
}

@media (min-width: 400px) {
  #itemsContainer {
    grid-template-columns: repeat(3, 1fr);
  }
  #profile {
    grid-area: 1 / 2 / 3 / 4;
  }
}

@media (min-width: 700px) {
  #itemsContainer {
    grid-template-columns: repeat(4, 1fr);
  }
  #profile {
    grid-area: 1 / 3 / 3 / 5;
  }
}

@media (min-width: 1000px) {
  #itemsContainer {
    grid-template-columns: repeat(5, 1fr);
  }
  #profile {
    grid-area: 1 / 4 / 3 / 6;
  }
}
</style>

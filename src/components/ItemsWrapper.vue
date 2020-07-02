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
          <tspan x="240">front-end</tspan>
          <tspan x="240" dy="24">developer</tspan>
        </text>
        <g id="profile-links">
          <a href="cv/index.html" target="_blank">
            <text y="175" x="35">curriculum</text>
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
        "Master's thesis project. App for managing documentation of BIM projects. The core idea are the smart drawings, which are building blueprints with attached BIM data. It is possible to check the data of a building element in the drawing, to add comments to them and tag collaborators, and to mesure distances, angles and areas. It is a serverless app connected to Google Drive to allow to store data and collaborate, and Firebase for cloud messaging. An exporter is required for each target platform to generate a file with all the data.",
      // tags: ["SVG", "TypeScript", "Google API", "Firebase"],
      image: "bimDrawings.png",
      svgTitle: ["BIM", "Drawings"],
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
      title: "Round layout",
      description:
        "Images are distributed on a round layout. Selected image is placed in the center. Fusce a congue urna. Ut ac blandit odio. Sed condimentum lacus non magna tincidunt volutpat. Morbi interdum suscipit nisl sed convallis. Aliquam sed finibus augue, quis gravida risus. Maecenas sit amet semper dolor. Nullam orci enim, volutpat in vestibulum vitae, dapibus nec quam. In mollis, nulla a bibendum elementum, sem est iaculis purus, nec condimentum lacus nibh vitae tortor.",
      image: "roundPicsLayout.png",
      svgTitle: ["Round", "layout"],
      links: [
        new LinkData("", LinkTitle.CodePen, LinkIconId.CodePen),
        new LinkData("", LinkTitle.External, LinkIconId.External)
      ]
    },
    {
      title: "Nutrition facts",
      description:
        "Small front-end app that allows to check food nutrition values. I created all the vector graphics including the user interface using SVG produced with Illustrator and Inkscape. It is connected to a Google spreadsheet where the food items data is stored. Logic is all Vanilla JavaScript, styles with SASS and responsive SVG user interface with conditional mediaqueries.",
      image: "nutritionFacts.png",
      svgTitle: ["Nutrition", "facts"],
      links: [
        new LinkData(
          "https://github.com/juanramoncarceles/nutritional-facts",
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
      title: "Flying birds",
      description:
        "Small excercise animating a single SVG symbol which is then attached randonmly as a shadow dom element with a random generator of <use> element. Once it has passed the right side it is deleted to avoid the DOM gronwing excessively. Since a single SVG symbol is used the movement is shared among all the birds and properties like scale and fill color can be set differently by instance.",
      image: "flyingBirds.png",
      svgTitle: ["Flying", "birds"],
      links: [
        new LinkData("", LinkTitle.CodePen, LinkIconId.CodePen),
        new LinkData("", LinkTitle.External, LinkIconId.External)
      ]
    },
    {
      title: "Logo animations",
      description:
        "Green Sock SVG animations of existing logos from Lands Design and VisualARQ. Properties like stroke dasharray, linear gradient ... are animated .  Also the GSAP morph plugin in the case of Lands Design to achieve the transition from a leaf to all the letters. Original SVG drawings were redone with Inkscape to have the right structre for the animation to be possible.",
      image: "logoAnimations.png",
      svgTitle: ["Logo", "animations"],
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
      title: "Split App",
      description: "App to add expenses and split.",
      image: "monOncle.png",
      svgTitle: ["Split", "App"],
      links: [
        new LinkData("", LinkTitle.CodePen, LinkIconId.CodePen),
        new LinkData("", LinkTitle.External, LinkIconId.External)
      ]
    },
    {
      title: "Beverages morph",
      description:
        "Transition between different animated beverages and some data associated. The idea was to create a dynamic menu. Nullam orci enim, volutpat in vestibulum vitae, dapibus nec quam. In mollis, nulla a bibendum elementum, sem est iaculis purus, nec condimentum lacus nibh vitae tortor.",
      image: "beveragesMorph.png",
      svgTitle: ["Beverages", "morph"],
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
      title: "UOCFlix",
      description:
        "Serverless app that fetches the data from the movie database REST API. PWA that can be installed. Fusce a congue urna. Ut ac blandit odio. Sed condimentum lacus non magna tincidunt volutpat. Morbi interdum suscipit nisl sed convallis. Aliquam sed finibus augue, quis gravida risus. Maecenas sit amet semper dolor. Nullam orci enim, volutpat in vestibulum vitae, dapibus nec quam. In mollis, nulla a bibendum elementum, sem est iaculis purus, nec condimentum lacus nibh vitae tortor.",
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
      title: "Language tooltip",
      description:
        "Laguage tooltip to be added to an existing multilanguage web site like a WordPress site that uses an url pattern like www.example.com/lang/restofpath. The goal is to advise that the site is available in the browser language and if the user takes a decision it is stored by a cookie and used to redirect automatically to the desired language. Tooltip can be positioned relative to an existing element or centered.",
      image: "uocFlix.png",
      svgTitle: ["Language", "tooltip"],
      links: [
        new LinkData(
          "https://github.com/juanramoncarceles/language-tooltip",
          LinkTitle.GitHub,
          LinkIconId.GitHub
        )
        // new LinkData("", LinkTitle.External, LinkIconId.External)
      ]
    },
    {
      title: "User votes emailing",
      description:
        "App designed to help with the task of sending emails to a set of users that have asked something at some time. When the time comes and all the users should be notified it reads the Google spreadsheet prepares the emails and after the confirmation it sends them. It uses Nodemailer and Pug.",
      image: "usersVotesReport.png",
      svgTitle: ["User", "votes", "emailing"],
      links: [
        new LinkData("", LinkTitle.CodePen, LinkIconId.CodePen),
        new LinkData("", LinkTitle.External, LinkIconId.External)
      ]
    },
    {
      title: "News portal",
      description:
        "Master's back-end course project of a news portal. Laravel app with Vue front-end, Laravel creates the REST API.",
      image: "uocFlix.png",
      svgTitle: ["News", "portal"],
      links: [
        new LinkData(
          "https://github.com/juanramoncarceles/laravel-vue-exercise",
          LinkTitle.GitHub,
          LinkIconId.GitHub
        )
        // new LinkData("", LinkTitle.External, LinkIconId.External)
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

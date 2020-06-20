<template>
  <div id="itemsContainer">
    <div id="profile">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 90">
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
          style="fill:#191919;stroke:#3c3c3c;stroke-miterlimit:10;stroke-width:2px"
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
      </svg>
      <span class="subtitle">front-end<br />developer</span>
      <ul id="profile-links">
        <li>
          <a href="cv/index.html" class="profile-link" target="_blank"
            >curriculum</a
          >
        </li>
        <li>
          <a
            href="https://github.com/juanramoncarceles"
            class="profile-link"
            target="_blank"
            >github</a
          >
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/ramoncarceles/"
            class="profile-link"
            target="_blank"
            >linkedin</a
          >
        </li>
        <li>
          <a href="https://codepen.io/jrcr" class="profile-link" target="_blank"
            >codepen</a
          >
        </li>
      </ul>
    </div>
    <ProjectItem
      v-for="(data, i) in projectsData"
      :key="i"
      :projectData="data"
      :mediaQueryHover="mediaQueryHover"
      @make-current="setItem"
      @make-not-current="unsetItem"
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
  private projectsData: Array<ProjectData> = [
    {
      title: "BIM Drawings",
      description:
        "Master thesis project. App for managing smart drawings of a BIM project. Connected to Google Drive to store. Morbi interdum suscipit nisl sed convallis. Aliquam sed finibus augue, quis gravida risus. Maecenas sit amet semper dolor. Nullam orci enim, volutpat in vestibulum vitae, dapibus nec quam. In mollis, nulla a bibendum elementum, sem est iaculis purus, nec condimentum lacus nibh vitae tortor.",
      image: "bimDrawings.png",
      svgTitle: ["BIM", "DRAWINGS"],
      links: [
        new LinkData("", LinkTitle.GitHub, LinkIconId.GitHub),
        new LinkData("", LinkTitle.External, LinkIconId.External)
      ]
    },
    {
      title: "Round layout",
      description:
        "Images are distributed on a round layout. Selected image is placed in the center. Fusce a congue urna. Ut ac blandit odio. Sed condimentum lacus non magna tincidunt volutpat. Morbi interdum suscipit nisl sed convallis. Aliquam sed finibus augue, quis gravida risus. Maecenas sit amet semper dolor. Nullam orci enim, volutpat in vestibulum vitae, dapibus nec quam. In mollis, nulla a bibendum elementum, sem est iaculis purus, nec condimentum lacus nibh vitae tortor.",
      image: "roundPicsLayout.png",
      svgTitle: ["ROUND", "LAYOUT"],
      links: [
        new LinkData("", LinkTitle.CodePen, LinkIconId.CodePen),
        new LinkData("", LinkTitle.External, LinkIconId.External)
      ]
    },
    {
      title: "Nutrition facts",
      description:
        "Small front-end / serverless app that allows to check food nutrition values. I created all the vector graphics including the UI using SVG. Vanilla JavaScript, SASS, conditional mediaqueries. Responsive SVG user interface. Sed condimentum lacus non magna tincidunt volutpat. Morbi interdum suscipit nisl sed convallis. Aliquam sed finibus augue, quis gravida risus. Maecenas sit amet semper dolor. Nullam orci enim, volutpat in vestibulum vitae, dapibus nec quam. In mollis, nulla a bibendum elementum, sem est iaculis purus, nec condimentum lacus nibh vitae tortor.",
      image: "nutritionFacts.png",
      svgTitle: ["NUTRITION", "FACTS"],
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
        "Small excercise animating a single SVG symbol which is then created and moved randomly with the <use> element. Morbi interdum suscipit nisl sed convallis. Aliquam sed finibus augue, quis gravida risus. Maecenas sit amet semper dolor. Nullam orci enim, volutpat in vestibulum vitae, dapibus nec quam. In mollis, nulla a bibendum elementum, sem est iaculis purus, nec condimentum lacus nibh vitae tortor.",
      image: "flyingBirds.png",
      svgTitle: ["FLYING", "BIRDS"],
      links: [
        new LinkData("", LinkTitle.CodePen, LinkIconId.CodePen),
        new LinkData("", LinkTitle.External, LinkIconId.External)
      ]
    },
    {
      title: "Logo animations",
      description:
        "Green Sock SVG animations of existing logos. Pellentesque placerat ligula dui, at iaculis justo dapibus sed. Fusce a congue urna. Ut ac blandit odio. Sed condimentum lacus non magna tincidunt volutpat. Morbi interdum suscipit nisl sed convallis. Aliquam sed finibus augue, quis gravida risus. Maecenas sit amet semper dolor. Nullam orci enim, volutpat in vestibulum vitae, dapibus nec quam. In mollis, nulla a bibendum elementum, sem est iaculis purus, nec condimentum lacus nibh vitae tortor.",
      image: "logoAnimations.png",
      svgTitle: ["LOGO", "ANIMATIONS"],
      links: [
        new LinkData("", LinkTitle.CodePen, LinkIconId.CodePen),
        new LinkData("", LinkTitle.CodePen, LinkIconId.CodePen)
      ]
    },
    {
      title: "Mon Oncle",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placerat ligula dui, at iaculis justo dapibus sed. Fusce a congue urna. Ut ac blandit odio. Sed condimentum lacus non magna tincidunt volutpat. Morbi interdum suscipit nisl sed convallis. Aliquam sed finibus augue, quis gravida risus. Maecenas sit amet semper dolor. Nullam orci enim, volutpat in vestibulum vitae, dapibus nec quam. In mollis, nulla a bibendum elementum, sem est iaculis purus, nec condimentum lacus nibh vitae tortor.",
      image: "monOncle.png",
      svgTitle: ["MON", "ONCLE"],
      links: [
        new LinkData("", LinkTitle.CodePen, LinkIconId.CodePen),
        new LinkData("", LinkTitle.External, LinkIconId.External)
      ]
    },
    {
      title: "Beverages morph",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placerat ligula dui, at iaculis justo dapibus sed. Fusce a congue urna. Ut ac blandit odio. Sed condimentum lacus non magna tincidunt volutpat. Morbi interdum suscipit nisl sed convallis. Aliquam sed finibus augue, quis gravida risus. Maecenas sit amet semper dolor. Nullam orci enim, volutpat in vestibulum vitae, dapibus nec quam. In mollis, nulla a bibendum elementum, sem est iaculis purus, nec condimentum lacus nibh vitae tortor.",
      image: "beveragesMorph.png",
      svgTitle: ["BEVERAGES", "MORPH"],
      links: [
        new LinkData("", LinkTitle.CodePen, LinkIconId.CodePen),
        new LinkData("", LinkTitle.External, LinkIconId.External)
      ]
    },
    {
      title: "UOCFlix",
      description:
        "Serverless app that fetches the data from the movie database REST API. Pellentesque placerat ligula dui, at iaculis justo dapibus sed. Fusce a congue urna. Ut ac blandit odio. Sed condimentum lacus non magna tincidunt volutpat. Morbi interdum suscipit nisl sed convallis. Aliquam sed finibus augue, quis gravida risus. Maecenas sit amet semper dolor. Nullam orci enim, volutpat in vestibulum vitae, dapibus nec quam. In mollis, nulla a bibendum elementum, sem est iaculis purus, nec condimentum lacus nibh vitae tortor.",
      image: "uocFlix.png",
      svgTitle: ["UOCFLIX"],
      links: [
        new LinkData("", LinkTitle.CodePen, LinkIconId.CodePen),
        new LinkData("", LinkTitle.External, LinkIconId.External)
      ]
    }
  ];

  private setItem(item: ProjectItem) {
    this.activeItem = item;
    (this.$refs.bgmask as HTMLElement).classList.add("active");
  }

  private unsetItem() {
    this.activeItem = undefined;
    (this.$refs.bgmask as HTMLElement).classList.remove("active");
  }
}
</script>

<style lang="scss">
#itemsContainer {
  display: grid;
  max-width: 1300px;
  grid-template-columns: 1fr;
  margin: auto;
  &.small-screen {
    padding-top: 100vw;
  }
}

#profile {
  display: flex;
  flex-direction: column;
  font-family: "Raleway", sans-serif;
  --theme-color: #456e8a;
}

#profile-links {
  padding: 0;
  margin: 1.8rem 0 0 4rem;
  line-height: 2rem;
  list-style-type: none;
}

.profile-link {
  font-size: 1.4rem;
  font-weight: 400;
  color: #666;
  &:hover {
    color: var(--theme-color);
  }
}

#profile > .subtitle {
  margin-right: 1.6rem;
  margin-top: 1rem;
  line-height: 2.8rem;
  text-align: right;
  font-size: 3rem;
  font-weight: 700;
  color: var(--theme-color);
}

#bgmask {
  position: absolute;
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

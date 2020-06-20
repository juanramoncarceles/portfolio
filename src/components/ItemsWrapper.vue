<template>
  <div id="itemsContainer">
    <div id="profile">
      <a href="cv/index.html" class="profile-link" target="_blank"
        >curriculum</a
      >
      <a
        href="https://github.com/juanramoncarceles"
        class="profile-link"
        target="_blank"
        >github</a
      >
      <a href="https://codepen.io/jrcr" class="profile-link" target="_blank"
        >codepen</a
      >
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
      title: "Round layout",
      description:
        "Images are distributed on a round layout. Selected image is placed in the center. Fusce a congue urna. Ut ac blandit odio. Sed condimentum lacus non magna tincidunt volutpat. Morbi interdum suscipit nisl sed convallis. Aliquam sed finibus augue, quis gravida risus. Maecenas sit amet semper dolor. Nullam orci enim, volutpat in vestibulum vitae, dapibus nec quam. In mollis, nulla a bibendum elementum, sem est iaculis purus, nec condimentum lacus nibh vitae tortor.",
      image: "roundPicsLayout.png",
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
      links: [
        new LinkData("", LinkTitle.CodePen, LinkIconId.CodePen),
        new LinkData("", LinkTitle.External, LinkIconId.External)
      ]
    },
    {
      title: "UOC Flix",
      description:
        "Serverless app that fetches the data from the movie database REST API. Pellentesque placerat ligula dui, at iaculis justo dapibus sed. Fusce a congue urna. Ut ac blandit odio. Sed condimentum lacus non magna tincidunt volutpat. Morbi interdum suscipit nisl sed convallis. Aliquam sed finibus augue, quis gravida risus. Maecenas sit amet semper dolor. Nullam orci enim, volutpat in vestibulum vitae, dapibus nec quam. In mollis, nulla a bibendum elementum, sem est iaculis purus, nec condimentum lacus nibh vitae tortor.",
      image: "uocFlix.png",
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
  justify-content: center;
  align-items: center;
}

.profile-link {
  font-family: sans-serif;
  font-size: 1.4rem;
  color: #666;
  &:hover {
    color: #456e8a;
  }
  &:not(:first-child) {
    margin-left: 1rem;
  }
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

<template>
  <div id="itemsContainer">
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

#bgmask {
  position: absolute;
  height: 0;
  width: 100vw;
  background-color: rgba(60, 60, 60, 0.7);
  transition: height 1s;
}

#bgmask.active {
  height: 100vh;
}

@media (min-width: 400px) {
  #itemsContainer {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 700px) {
  #itemsContainer {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1000px) {
  #itemsContainer {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1300px) {
  #itemsContainer {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>

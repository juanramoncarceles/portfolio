<template>
  <div id="itemsContainer">
    <ProjectItem
      v-for="data in projectsData"
      :key="data.id"
      :projectData="data"
      :mediaQueryHover="mediaQueryHover"
      @make-current="setItem"
      @make-not-current="unsetItem"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProjectData } from "@/types";
import ProjectItem from "./ProjectItem.vue";
import { LinkIconId } from "../enums";

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
      id: 0,
      title: "Round layout",
      description:
        "Images are distributed on a round layout. Selected image is placed in the center. Fusce a congue urna. Ut ac blandit odio. Sed condimentum lacus non magna tincidunt volutpat. Morbi interdum suscipit nisl sed convallis. Aliquam sed finibus augue, quis gravida risus. Maecenas sit amet semper dolor. Nullam orci enim, volutpat in vestibulum vitae, dapibus nec quam. In mollis, nulla a bibendum elementum, sem est iaculis purus, nec condimentum lacus nibh vitae tortor.",
      links: [
        {
          type: "codepen",
          value: "",
          title: "View CodePen",
          iconId: LinkIconId.CodePen
        },
        {
          type: "project",
          value: "",
          title: "View live",
          iconId: LinkIconId.External
        }
      ]
    }
  ];

  private setItem(item: ProjectItem) {
    this.activeItem = item;
  }

  private unsetItem() {
    this.activeItem = undefined;
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

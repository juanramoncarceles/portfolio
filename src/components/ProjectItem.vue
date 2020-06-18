<template>
  <div
    class="itemWrapper"
    :class="{ selected: isSelected, active: isActive }"
    :style="itemContainerStyle"
    @mouseenter="!isActive ? selectItem() : ''"
    @mouseleave="deselectItem"
    @click="manageItemClick"
    @transitionend="openCloseTransitionendHandler"
  >
    <span class="offscreen">{{ projectData.title }}</span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <image
        xlink:href="../assets/roundPicsLayoutThumb.png"
        height="200"
        width="200"
      />
      <rect class="itemBorder" width="200" height="200" style="fill:none;" />
      <text class="itemTitle">
        <tspan x="10" y="155">ROUND</tspan>
        <tspan x="10" y="185">LAYOUT</tspan>
      </text>
    </svg>
    <div
      class="projectInfoContainer"
      ref="infoContainer"
      :style="infoContainerStyle"
    >
      <div>
        <button class="closeItemBtn" @click="deactivateItem">
          <svg>
            <use href="#crossIcon" />
          </svg>
        </button>
        <h2>{{ projectData.title }}</h2>
        <p>{{ projectData.description }}</p>
      </div>
      <div>
        <a
          :href="link.value"
          target="_blank"
          :title="link.title"
          v-for="(link, i) in projectData.links"
          :key="i"
        >
          <p>link</p>
        </a>
        <!-- <a href="#" target="_blank" title="View CodePen">
          <svg class="iconBtn">
            <use href="#codepenIcon" />
          </svg>
        </a>
        <a href="#" target="_blank" title="View live">
          <svg class="iconBtn">
            <use href="#externalLinkIcon" />
          </svg>
        </a> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProjectData } from "@/types";

@Component
export default class ProjectItem extends Vue {
  @Prop({ required: true }) readonly projectData!: ProjectData;
  @Prop() readonly mediaQueryHover!: MediaQueryList;

  private isSelected = false;
  private isActive = false;
  private activeItemMaxDimension = 780;
  private itemContainerStyle = {
    transform: "unset",
    transitionDelay: "0s",
    zIndex: "unset"
  };
  private infoContainerStyle = {
    display: "none",
    fontSize: "inherit",
    left: "0",
    top: "0"
  };

  private selectItem(): void {
    console.log("Selected");
    this.isSelected = true;
  }

  private deselectItem(): void {
    console.log("Deselected");
    this.isSelected = false;
  }

  /**
   * Opens the project item by scaling it, moving it to the center of the
   * screen and showing its info container.
   * TODO Make it responsive so it opens vertically on portrait windows.
   */
  private activateItem(): void {
    console.log("Activated");
    const itemDomRect = this.$el.getBoundingClientRect();
    const itemWidth = itemDomRect.width;
    const itemCenterX = itemDomRect.x + itemWidth / 2;
    const itemHeight = itemDomRect.height;
    const itemCenterY = itemDomRect.y + itemHeight / 2;
    // The scale value is calculated based on the dimensions of the component root element when is active.
    let scaleValue = 1;
    let horizontal: boolean;
    let finalX = itemCenterX;
    let finalY = itemCenterY;
    // infoContainer font size based on the scale will controll all its children sizes since they are 'em'.
    // TODO Update on resize window...
    // TODO Reorganize to optimize.
    if (window.innerWidth >= this.activeItemMaxDimension) {
      // Wider
      horizontal = true;
      scaleValue = this.activeItemMaxDimension / (itemWidth * 2);
      finalX = window.innerWidth / 2 - (itemWidth * scaleValue) / 2;
      finalY = window.innerHeight / 2;
      this.infoContainerStyle.fontSize = (1 / scaleValue) * 16 + "px";
    } else if (window.innerWidth / window.innerHeight >= 1) {
      // Horizontal or square and smaller
      horizontal = true;
      scaleValue = window.innerWidth / (itemWidth * 2);
      finalX = window.innerWidth / 2 - (itemWidth * scaleValue) / 2;
      finalY = window.innerHeight / 2;
      this.infoContainerStyle.fontSize =
        ((1 / scaleValue) * 16 * window.innerWidth) /
          this.activeItemMaxDimension +
        "px";
    } else if (window.innerHeight >= this.activeItemMaxDimension) {
      // Vertical and higher
      horizontal = false;
      scaleValue = this.activeItemMaxDimension / (itemWidth * 2);
      finalX = window.innerWidth / 2;
      finalY = window.innerHeight / 2 - (itemHeight * scaleValue) / 2;
      this.infoContainerStyle.fontSize = (1 / scaleValue) * 16 + "px";
    } else if (window.innerWidth / window.innerHeight < 1) {
      // Vertical and smaller
      horizontal = false;
      scaleValue = window.innerHeight / (itemWidth * 2);
      finalX = window.innerWidth / 2;
      finalY = window.innerHeight / 2 - (itemHeight * scaleValue) / 2;
      this.infoContainerStyle.fontSize =
        ((1 / scaleValue) * 16 * window.innerHeight) /
          this.activeItemMaxDimension +
        "px";
    }
    this.itemContainerStyle.transform = `translate(${finalX -
      itemCenterX}px,${finalY - itemCenterY}px) scale(${scaleValue})`;
    this.infoContainerStyle.display = "flex";
    this.itemContainerStyle.zIndex = "1";
    setTimeout(() => {
      if (horizontal) this.infoContainerStyle.left = "100%";
      else this.infoContainerStyle.top = "100%";
    }, 500);
    // TODO indicate to the parent that this is the active item, maybe emit?
    //activeItem = item;
  }

  /**
   * Closes the project item.
   */
  private deactivateItem(): void {
    console.log("Deactivated");
    this.infoContainerStyle.left = "0";
    this.infoContainerStyle.top = "0";
    this.itemContainerStyle.transform = `translate(0px,0px) scale(1)`;
    // TODO tell the parent that this item is not active anymore
    //activeItem = undefined;
  }

  /**
   * Manages the active state of the project item at the end of the open / close transition.
   */
  private openCloseTransitionendHandler(e: TransitionEvent): void {
    if (e.target === this.$el) {
      console.log("Item transitionend");
      if (!this.isActive) {
        this.isActive = true;
        // Same as the duration of the css transition duration for the .projectInfoContainer
        this.itemContainerStyle.transitionDelay = "1s";
      } else if (this.isActive) {
        this.isActive = false;
        this.itemContainerStyle.zIndex = "unset";
        this.itemContainerStyle.transitionDelay = "0s";
        this.infoContainerStyle.display = "none";
      }
    }
  }

  /**
   * Manages the click event on the item according to its active state
   * and to the hover presence.
   */
  private manageItemClick(): void {
    if (!this.isActive) {
      if (this.mediaQueryHover.matches) {
        // If there is hover.
        this.activateItem();
        this.deselectItem();
      } else {
        // If there is no hover.
        if (this.isSelected) {
          // If the item is already selected but not active then activate it.
          this.activateItem();
          this.deselectItem();
        } else {
          // Set as selected and deselect any other that is selected.
          console.log("TODO");
          // for (let j = 0; j < itemsContainer.children.length; j++) {
          //   // If the item is the one with the buttons then skip it.
          //   if (itemsContainer.children[j].id === "coverButtons") continue;
          //   if (i !== j) {
          //     // Another option e.target.id !== itemsContainer.children[j].id
          //     deselectItem(itemsContainer.children[j]);
          //   } else {
          //     selectItem(itemsContainer.children[i]);
          //   }
          // }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.itemWrapper {
  cursor: pointer;
  transition-property: transform;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  & > svg {
    display: block;
    & > image {
      transition: filter 1s; /* this doesnt work with svg filters, use <animate> instead */
      /* filter: grayscale(0.7);  */
      filter: url(#grayscale); /* a svg filter is used because css filters are not supported on svg elements on chrome */
    }
    & > .itemBorder {
      stroke: rgb(238, 61, 208);
      stroke-width: 0px;
      stroke-dasharray: 0px 800px;
      transition: stroke-dasharray 1s ease-in-out, stroke-width 1.5s ease-in-out;
    }
    & > .itemTitle {
      fill: #f1f1f1;
      fill-opacity: 0;
      stroke: #f1f1f1;
      stroke-width: 1px;
      stroke-dasharray: 0px, 120px;
      filter: url(#drop-shadow);
      font-size: 28px;
      font-family: sans-serif;
      transition-property: stroke-dasharray, stroke-width, fill-opacity;
      transition-delay: 0s, 1s, 1s;
      transition-duration: 1.5s, 0.5s, 0.5s;
    }
  }
}

.itemWrapper.active {
  cursor: unset;
  box-shadow: 0px 0px 12px #555;
  & > svg > image {
    filter: none;
  }
}

.itemWrapper.selected > svg {
  & > image {
    filter: none;
  }
  & > .itemBorder {
    stroke-dasharray: 800px 800px;
    stroke-width: 9px;
  }
  & > .itemTitle {
    fill-opacity: 1;
    stroke-width: 0px;
    stroke-dasharray: 120px, 120px;
  }
}

.projectInfoContainer {
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 1.2em;
  position: absolute;
  top: 0;
  left: 0%;
  z-index: -1;
  background-color: #f6f6f6;
  transition: left 1s, top 1s;
  & .iconBtn {
    width: 2em;
    height: 2em;
    display: block;
  }
  & .closeItemBtn {
    float: right;
    font-size: inherit;
    & > svg {
      width: 1em;
      height: 1em;
    }
  }
  & > div:first-child {
    & > h2 {
      text-align: center;
      margin: 0 1.2em 0.5em;
      font-size: 1.8em;
    }
    & > p {
      text-align: justify;
      font-family: "Bellota Text", sans-serif;
      font-size: 1em;
    }
  }
  & > div:last-child {
    display: flex;
    justify-content: space-evenly;
    & > a {
      transition: transform 0.4s;
    }
    & > a:hover {
      transform: translateY(-4px);
    }
  }
}
</style>

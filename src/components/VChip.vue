<script setup lang="ts">
  defineProps<{
    value: number;
  }>();
</script>

<template>
  <svg
    :class="['v-chip', `v-chip--bet-${value}`]"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    version="1.0"
    style="
      shape-rendering: geometricPrecision;
      text-rendering: geometricPrecision;
      image-rendering: optimizeQuality;
      fill-rule: evenodd;
      clip-rule: evenodd;
    "
    viewBox="500 500 3000 3000"
  >
    <circle
      transform="matrix(0.709526 0.40964 -0.409645 0.709518 2000 2000)"
      r="1831"
    />
    <path
      d="M1729 3475c181,33 365,32 542,-1l0 -328 -542 0 0 329zm833 -751l42 72c-67,51 -140,93 -217,125l-42 -73c77,-31 150,-73 217,-124zm-437 183l0 84c-82,11 -166,11 -250,1l0 -84c84,11 168,11 250,-1zm-729 -110l42 -73c32,25 67,49 104,70 36,21 74,39 112,55l-42 73c-38,-16 -75,-35 -112,-56 -37,-21 -71,-44 -104,-69zm-808 -295l284 -164 271 469 -285 165c-119,-140 -209,-300 -270,-470zm2261 -156l73 42c-16,38 -35,75 -56,112 -21,37 -44,71 -69,104l-73 -42c25,-32 49,-67 70,-104 21,-36 39,-74 55,-112zm-1646 -950l73 42c-25,32 -49,67 -70,104 -21,36 -39,74 -55,112l-73 -42c16,-38 35,-75 56,-112 21,-37 44,-71 69,-104zm410 -317l42 73c-77,31 -150,73 -217,124l-42 -72c67,-51 140,-93 217,-125zm512 -71l0 84c-84,-11 -168,-11 -250,1l0 -84c83,-11 166,-11 250,-1zm221 143l42 -73c38,16 75,35 112,56 37,21 71,44 104,69l-42 73c-32,-25 -67,-49 -104,-70 -36,-21 -74,-39 -112,-55zm561 724l84 0c11,83 11,166 1,250l-84 0c11,-83 11,-168 -1,-250zm-1899 0l84 0c-11,84 -11,168 1,250l-84 0c-11,-82 -11,-166 -1,-250zm1716 -437l72 -42c51,67 93,140 125,217l-73 42c-31,-77 -73,-150 -124,-217zm-1645 949l73 -42c31,77 73,150 124,217l-72 42c-51,-67 -93,-140 -125,-217zm2333 -889c-61,-170 -151,-330 -270,-470l-285 165 271 469 284 -164zm-1141 -973l0 329 -542 0 0 -328c178,-33 361,-34 542,-1zm-1413 503l285 165 -271 469 -285 -165c30,-84 68,-167 114,-247 46,-80 99,-154 157,-222zm2284 1944c58,-68 111,-142 157,-222 46,-80 84,-163 114,-247l-285 -165 -271 469 285 165z"
    />
    <text
      x="2000"
      y="2000"
      text-anchor="middle"
      dominant-baseline="middle"
      font-size="800"
    >
      {{ value }}
    </text>
  </svg>
</template>

<style scoped lang="scss">
  .v-chip {
    text {
      font-weight: bold;
    }

    &--bet-1 {
      circle {
        fill: $bet-1;
      }

      path {
        fill: $color-black;
      }

      text {
        fill: $color-black;
      }
    }

    &--bet-2,
    &--bet-3,
    &--bet-4,
    &--bet-5 {
      path {
        fill: $color-white;
      }

      text {
        fill: $color-white;
      }
    }

    &--bet-2 {
      circle {
        fill: $bet-2;
      }
    }

    &--bet-3 {
      circle {
        fill: $bet-3;
      }
    }

    &--bet-4 {
      circle {
        fill: $bet-4;
      }
    }

    &--bet-5 {
      circle {
        fill: $bet-5;
      }
    }
  }
</style>

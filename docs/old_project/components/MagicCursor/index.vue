<template>
  <div class="xl:hidden cursor">
    <div ref="cursorSmall" class="cursor--small"></div>
    <div ref="cursorLarge" class="cursor--large"></div>
    <div ref="cursorText" class="cursor--text">
      <div ref="cursorTextInner" class="text heti--sans">GO GO GO GO</div>
    </div>
  </div>
</template>

<script setup>
import {gsap} from 'gsap'
import CircleType from 'circletype'
import {useIsMobile, useIsTablet} from "~/utils/composables.js";

const cursorSmall = ref()
const cursorLarge = ref()
const cursorText = ref()
const cursorTextInner = ref()

const isMobile = useIsMobile()
const isTablet = useIsTablet()

onMounted(() => {
  if (isMobile.value || isTablet.value) {
    return
  }
  const cursorOuter = cursorLarge.value;
  const cursorInner = cursorSmall.value;
  const cursorTextContainerEl = cursorText.value;
  const cursorTextEl = cursorTextInner.value;

  const hoverItems = document.querySelectorAll(".cursor-hover-item");
  const hoverEffectDuration = 0.3;
  let isHovered = false;

  const cursorRotationDuration = 8;

  let circleType = new CircleType(cursorTextEl);

  hoverItems.forEach((item) => {
    item.addEventListener("pointerenter", handlePointerEnter);
    item.addEventListener("pointerleave", handlePointerLeave);
  });

  let mouse = {
    x: -100,
    y: -100
  };

  document.body.addEventListener("pointermove", updateCursorPosition);

  function updateCursorPosition(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function updateCursor() {
    gsap.set([cursorInner, cursorTextContainerEl], {
      x: mouse.x,
      y: mouse.y
    });

    gsap.to(cursorOuter, {
      duration: 0.15,
      x: mouse.x,
      y: mouse.y
    });

    if (!isHovered) {
      gsap.to(cursorTextContainerEl, hoverEffectDuration * 0.5, {
        opacity: 0
      });
      gsap.set(cursorTextContainerEl, {
        rotate: 0
      });
    }

    requestAnimationFrame(updateCursor);
  }

  updateCursor();

  function handlePointerEnter(e) {
    isHovered = true;

    const target = e.currentTarget;
    updateCursorText(target);

    gsap.fromTo(
        cursorTextContainerEl,
        {
          rotate: 0
        },
        {
          duration: cursorRotationDuration,
          rotate: 360,
          ease: "none",
          repeat: -1
        }
    );

    gsap.to(cursorInner, hoverEffectDuration, {
      scale: 5
    });

    gsap.fromTo(
        cursorTextContainerEl,
        hoverEffectDuration,
        {
          scale: 1.25,
          opacity: 0
        },
        {
          delay: hoverEffectDuration * 0.75,
          scale: 1,
          opacity: 1
        }
    );
    gsap.to(cursorOuter, hoverEffectDuration, {
      scale: 1.2,
      opacity: 0
    });
  }

  function handlePointerLeave() {
    isHovered = false;
    gsap.to([cursorInner, cursorOuter], hoverEffectDuration, {
      scale: 1,
      opacity: 1
    });
  }

  function updateCursorText(textEl) {
    const cursorTextRepeatTimes = textEl.getAttribute("data-cursor-text-repeat") || 4;
    const cursorText = returnMultipleString(
        textEl.getAttribute("data-cursor-text") || '',
        cursorTextRepeatTimes
    );

    circleType.destroy();

    cursorTextEl.innerHTML = cursorText;
    circleType = new CircleType(cursorTextEl);
  }

  function returnMultipleString(string, count) {
    let s = "";
    for (let i = 0; i < count; i++) {
      s += ` ${string} `;
    }
    return s;
  }
})
</script>

<style>

.cursor .cursor--small,
.cursor .cursor--large,
.cursor .cursor--text {
  @apply z-2147483646;
  position: fixed;
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  width: var(--cursor-size);
  height: var(--cursor-size);
  /*mix-blend-mode: difference;*/
  pointer-events: none;
  user-select: none;
}

.cursor .cursor--text {
  --cursor-size: fit-content;
  font-size: 0.75rem;
  color: #fff;
  opacity: 0;
  mix-blend-mode: difference;
}

.cursor .cursor--text .text {
  font-weight: bold;
  line-height: normal;
  font-size: 10px;
}

.cursor .cursor--small {
  --cursor-size: 8px;
  background: rgba(105, 144, 87, 0.8);
}

.cursor .cursor--large {
  --cursor-size: 40px;
  border: 2px solid #fff;
  mix-blend-mode: difference;
}
</style>

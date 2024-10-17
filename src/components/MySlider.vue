<template>
 
    <div class="slider">
      <div class="slider__text-date">
        <button
          class="slider__text"
          @click="handlerToggle"
          :style="activeSlider(visibleMounth)"
        >
          Все года
        </button>
        <button
          class="slider__text"
          @click="handlerToggle"
          :style="activeSlider(!visibleMounth)"
        >
          Месяц
        </button>
      </div>
      <div class="slider__inner">
        <div class="slider__control">
          <div class="slider__bg-line"></div>
          <span :style="progressStyle" class="slider__progress"></span>

          <div
            :style="calcDistanceLeft"
            class="slider__tooltip slider__tooltip--left"
          >
            <p class="slider__tooltip-text">
              {{
                visibleMounth
                  ? monthTooltip(fromValue, stepValue)
                  : monthTooltip(fromValue, stepValueYearAndMonth)
              }}
            </p>
            <p class="slider__tooltip-text">
              {{
                visibleMounth
                  ? yearTooltip(fromValue, stepValue, dateObject)
                  : yearTooltip(
                      fromValue,
                      stepValueYearAndMonth,
                      dateYearAndMounth
                    )
              }}
            </p>
            <span
              class="slider__tooltip-triangle slider__tooltip-triangle--left"
            ></span>
          </div>

          <div
            :style="calcDistanceRight"
            class="slider__tooltip slider__tooltip--right"
          >
            <p class="slider__tooltip-text">
              {{
                visibleMounth
                  ? monthTooltip(toValue, stepValue)
                  : monthTooltip(toValue, stepValueYearAndMonth)
              }}
            </p>
            <p class="slider__tooltip-text">
              {{
                visibleMounth
                  ? yearTooltip(toValue, stepValue, dateObject)
                  : yearTooltip(
                      toValue,
                      stepValueYearAndMonth,
                      dateYearAndMounth
                    )
              }}
            </p>
            <span
              class="slider__tooltip-triangle slider__tooltip-triangle--right"
            ></span>
          </div>

          <div
            @mousedown="startDragging('left')"
            ref="outerCircleFrom"
            :style="{ left: `${fromValue}%` }"
            class="slider__circle-outside slider__circle-outside--left"
          ></div>
          <div
            @mousedown="startDragging('right')"
            ref="outerCircleTo"
            :style="{ left: `${toValue}%` }"
            class="slider__circle-outside slider__circle-outside--right"
          ></div>
        </div>

        <ul class="slider__list" ref="containerWidth" v-if="visibleMounth">
          <li
            class="slider__item"
            v-for="(months, year) in dateYearObject"
            :key="year"
          >
            <p class="slider__year-text">
              {{ year }}
            </p>
          </li>
        </ul>

        <ul class="slider__list" ref="containerWidth" v-if="!visibleMounth">
          <li
            class="slider__item"
            v-for="(months, year) in dateYearAndMounth"
            :key="year"
          >
            <p
              class="slider__year-text"
              :class="{ 'slider__year-color': !visibleMounth }"
            >
              {{ year }}
            </p>

            <ul
              class="slider__month-list"
              v-for="(month, index) in months"
              :key="index"
            >
              <li class="slider__month-item">
                <p class="slider__month-text">{{ month }}</p>
              </li>
            </ul>
          </li>
        </ul>
   
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  defineProps,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";

import {
  month,
  createObjYear,
  createObjMonth,
  removingExtraYears,
  getFilteredMonths,
  calculateStepValue,
} from "@/assets/utils/dateUtils";

interface DateObject {
  [year: number]: Month[];
}

interface Month {
  [month: number]: string;
}

interface Props {
  minDate: Date;
  maxDate: Date;
  minYearWithDate: Date;
  maxYearWithDate: Date;
}

const props = defineProps<Props>();

const minDate = computed(() => props.minDate);
const maxDate = computed(() => props.maxDate);
const minYearWithDate = computed(() => props.minYearWithDate);
const maxYearWithDate = computed(() => props.maxYearWithDate);

const containerWidth = ref<HTMLElement | null>(null);

const outerCircleFrom = ref<HTMLElement | null>(null);
const outerCircleTo = ref<HTMLElement | null>(null);

const width = ref<number>(window.innerWidth);

const dateObject = ref<DateObject>(
  createObjYear(minDate.value.getFullYear(), maxDate.value.getFullYear(), month)
);

const dateYearAndMounth = ref<DateObject>(
  createObjMonth(dateObject.value, minYearWithDate.value)
);

const dateYearObject = ref<DateObject>(
  removingExtraYears(containerWidth.value, dateObject.value)
);
const originalDateYearObject = ref<DateObject>({});

const visibleMounth = ref<boolean>(true);

let objRedrawFlag: boolean = false;
let draggingSide: string | null = null;

const onResize = (): void => {
  width.value = window.innerWidth;
};

onMounted(() => {
  updateDateObject();
  window.addEventListener("resize", onResize);
  removingExtraYears(containerWidth.value, dateObject.value);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});

watch(
  () => minDate.value,
  () => {
    dateObject.value = createObjYear(
      minDate.value.getFullYear(),
      maxDate.value.getFullYear(),
      month
    );

    dateYearObject.value = removingExtraYears(
      containerWidth.value,
      dateObject.value
    );
  }
);

watch(
  () => maxDate.value,
  () => {
    nextTick(() => {
      dateYearObject.value = removingExtraYears(
        containerWidth.value,
        dateObject.value
      );
    });
  },
  { immediate: true }
);

watch(
  () => minYearWithDate.value,
  () => {

    
    dateYearAndMounth.value = createObjMonth(
      dateObject.value,
      minYearWithDate.value
    );
    fromValue.value = interestСalcFrom()
  }
);

watch(
  () => maxYearWithDate.value,
  () => {
    toValue.value = interestСalcTo()
  }
);

const startDragging = (side: string): void => {
  draggingSide = side;
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", stopDragging);
};

function onMouseMove(event: MouseEvent): void {
  if (outerCircleFrom.value && containerWidth.value) {
    const containerRect = containerWidth.value.getBoundingClientRect();

    if (draggingSide === "left") {
      const newLeft = event.clientX - containerRect.left;
      const percentage = (newLeft / containerRect.width) * 100;
      fromValue.value = Math.min(Math.max(percentage, 0), toValue.value);
    }

    if (draggingSide === "right") {
      const newRight =
        containerRect.width - (containerRect.right - event.clientX);
      const percentage = (newRight / containerRect.width) * 100;
      toValue.value = Math.max(Math.min(percentage, 100), fromValue.value);
    }
  }
}

const stopDragging = (): void => {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", stopDragging);
};

const interestСalcFrom = (): number =>
  (minYearWithDate.value.getMonth() / 24) * 100;
const interestСalcTo = (): number =>
  ((maxYearWithDate.value.getMonth() + 12) / 24) * 100;

const fromValue = ref(interestСalcFrom());
const toValue = ref(interestСalcTo());

const handlerToggle = (): void => {
  visibleMounth.value = !visibleMounth.value;
};

const updateDateObjects = (monthsFilter: string[]): void => {
  dateObject.value = createObjYear(
    minDate.value.getFullYear(),
    maxDate.value.getFullYear(),
    monthsFilter
  );
  dateYearAndMounth.value = createObjMonth(
    dateObject.value,
    minYearWithDate.value
  );
};

const adjustDateYearObject = (): DateObject | void => {
  if (!containerWidth.value) return;

  const distanceToRightEdge =
    window.innerWidth - containerWidth.value.getBoundingClientRect().right;

  if (distanceToRightEdge < 10) {
    const keys = Object.keys(dateYearObject.value);
    const visibleKeys = keys.filter((_, i) => i % 3 === 0).map(Number);

    originalDateYearObject.value = { ...dateYearObject.value };
    objRedrawFlag = true;

    dateYearObject.value = visibleKeys.reduce((obj, key) => {
      obj[key] = dateObject.value[key];
      return obj;
    }, {} as DateObject);
  }

  if (distanceToRightEdge > 85 && objRedrawFlag) {
    dateYearObject.value = originalDateYearObject.value;
    objRedrawFlag = false;
  }
};

const updateDateObject = (): void => {
  const filteredMonths = getFilteredMonths(width.value);
  updateDateObjects(filteredMonths);
  adjustDateYearObject();
};

watch(width, updateDateObject);

window.addEventListener("resize", onResize);

const stepValue = computed(() => calculateStepValue(dateObject.value));
const stepValueYearAndMonth = computed(() =>
  calculateStepValue(dateYearAndMounth.value)
);

const monthTooltip = (value: number, step: string): string => {
  const stepIndex = Math.round(value / Number(step));
  const monthIndex = stepIndex % 12;
  return month[monthIndex];
};

const yearTooltip = (value: number, step: string, obj: DateObject): string => {
  const stepIndex = Math.round(value / Number(step));
  const monthsPerYear = 12;
  const keys = Object.keys(obj);

  const yearIndex = Math.floor(stepIndex / monthsPerYear);
  return keys[Math.min(yearIndex, keys.length - 1)];
};

const progressStyle = computed(() => ({
  left: `${fromValue.value}%`,
  width: `${toValue.value - fromValue.value}%`,
}));

const calcDistanceLeft = computed(() => ({
  left: `${fromValue.value}%`,
}));

const calcDistanceRight = computed(() => ({
  right: `${100 - toValue.value}%`,
}));

const activeSlider = (isActive: boolean) => ({
  opacity: isActive ? "1" : "0.6",
  borderBottom: isActive ? "none" : "1px solid rgba(120, 169, 205, 0.5)",
});
</script>

<style scoped lang="scss">

.slider {
  display: flex;
  width: 90%;

  grid-gap: 20px;
  align-items: center;

  &__text-date {
    width: 100px;
    display: flex;
    flex-direction: column;
    grid-gap: 16px;
    min-width: fit-content;
    margin: 11px 5px 0 0;
  }

  &__text {
    color: #1672b7;
    width: fit-content;
    border-bottom: 1px solid rgba(120, 169, 205, 0.6);
    transition: color 0.4s;

    &:hover {
      color: #2790e0;
    }
    &:active {
      color: #014f8c;
    }
  }

  &__inner {
    width: 100%;
  }

  &__control {
    position: relative;
    min-height: 50px;
    display: flex;
    align-items: center;
  }

  &__progress {
    position: absolute;
    width: 100%;
    height: 10px;
    background-color: #5cadea;
    z-index: 1;
  }

  &__bg-line {
    appearance: none;
    height: 10px;
    width: 100%;
    position: absolute;
    background-color: #edf1f1;
    pointer-events: none;
    left: 0;
    right: 0;
  }

  &__circle-outside {
    appearance: none;
    position: relative;
    pointer-events: all;
    width: 20px;
    height: 20px;
    background-color: #5cadea;
    border-radius: 50%;
    z-index: 2;
    cursor: pointer;

    &::after {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #edf1f1;
      position: absolute;
      z-index: 4;
      transform: translateX(50%) translateY(50%);
    }
  }

  &__circle-outside--right {
    transform: translateX(-175%);
  }

  &__circle-outside--left {
    transform: translateX(-25%);
  }

  &__list {
    display: flex;
    justify-content: space-between;
    width: 104%;
    margin-left: -16px;
  }

  &__item {
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
  }

  &__item:not(:last-child) {
    width: 100%;
    margin-right: 14px;
  }

  &__year-text {
    color: #adadad;
  }

  &__year-color {
    color: #525252;
  }

  &__month-text {
    color: #adadad;
  }
}

.slider__tooltip {
  position: absolute;
  background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  text-align: center;

  &-text {
    background-color: #fff;
  }

  &--right {
    top: 50px;
    right: 0;
    transform: translateX(50%);
  }

  &--left {
    bottom: 50px;
    left: 0;
    transform: translateX(-50%);
  }

  &-triangle {
    background-color: #fff;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      border: 10px solid transparent;
    }

    &--left::after {
      border-top: 8px solid #fff;
      right: 0px;
      transform: translateX(50%);
      bottom: -22px;
    }

    &--right::after {
      border-bottom: 8px solid #fff;
      right: 0px;
      transform: translateX(50%);
      bottom: 38px;
    }
  }
}
</style>

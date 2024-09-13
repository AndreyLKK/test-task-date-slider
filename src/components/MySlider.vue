<template>
  <div class="container">
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
          <div class="slider__circle-inside" ref="circleFrom"></div>
          <input
            class="slider__input"
            v-model="fromValue"
            id="fromSlider"
            type="range"
            min="0"
            max="100"
            :step="visibleMounth ? stepValue : stepValueYearAndMonth"
            @input="updateCirclePositions"
          />
          <div class="slider__circle-inside" ref="circleTo"></div>
          <input
            class="slider__input"
            v-model="toValue"
            id="toSlider"
            type="range"
            min="0"
            max="100"
            :step="visibleMounth ? stepValue : stepValueYearAndMonth"
            @input="updateCirclePositions"
          />
        </div>
        <ul class="slider__year-list" ref="containerWidth" v-if="visibleMounth">
          <li
            class="slider__year-item"
            v-for="(months, year) in dateYearObject"
            :key="year"
          >
            <div class="slider__year">
              <p class="slider__year-text">
                {{ year }}
              </p>
              <template v-if="false">
                <ul
                  class="slider__month-list"
                  v-for="(month, index) in months"
                  :key="index"
                >
                  <li class="slider__month-item">
                    <p class="slider__month-text">
                      {{ month }}
                    </p>
                  </li>
                </ul>
              </template>
            </div>
          </li>
        </ul>

        <ul class="slider__list" v-if="!visibleMounth">
          <li
            class="slider__item"
            v-for="(months, year) in dateYearAndMounth"
            :key="year"
          >
            <div class="slider__year">
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
            </div>
          </li>
        </ul>
      </div>
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
  nextTick
} from 'vue';

import {
  createObjYear,
  createObjMonth,
  removingExtraYears,
  getFilteredMonths,
  calculateStepValue,
  month
} from '@/assets/utils/dateUtils';

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
const circleFrom = ref<HTMLElement | null>(null);
const circleTo = ref<HTMLElement | null>(null);

const width = ref<number>(window.innerWidth);

const dateObject = ref<DateObject>(createObjYear(
  minDate.value.getFullYear(),
  maxDate.value.getFullYear(),
  month
));

const dateYearAndMounth = ref<DateObject>(createObjMonth(dateObject.value, minYearWithDate.value));

const dateYearObject = ref<DateObject>(removingExtraYears(containerWidth.value, dateObject.value));
const originalDateYearObject = ref<DateObject>({});

const visibleMounth = ref<boolean>(true);
let objRedrawFlag = false;


const onResize = () => {
width.value = window.innerWidth;
};

onMounted(() => {
  originalDateYearObject.value = { ...dateYearObject.value };

  updateDateObject();
  window.addEventListener('resize', onResize);
  removingExtraYears(containerWidth.value, dateObject.value);
  updateCirclePositions();
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});

watch(
  () => maxDate.value,
  () => {
    nextTick(() => {
      dateYearObject.value = removingExtraYears(containerWidth.value, dateObject.value);
    });
  },
  { immediate: true }
);

const updateCirclePositions = () => {
  if (circleFrom.value) {
    circleFrom.value.style.left = `calc(${fromValue.value}%`;
  }
  if (circleTo.value) {
    circleTo.value.style.left = `calc(${toValue.value}%`;
  }
};

const interestСalc = () => (minYearWithDate.value.getMonth() / 24) * 100;
const interestСalcRight = () => ((maxYearWithDate.value.getMonth() + 12) / 24) * 100;

let fromValue = ref(interestСalc());
let toValue = ref(interestСalcRight());

const handlerToggle = () => {
  visibleMounth.value = !visibleMounth.value;
};

const updateDateObjects = (monthsFilter: string[]): void => {
  dateObject.value = createObjYear(
    minDate.value.getFullYear(),
    maxDate.value.getFullYear(),
    monthsFilter
  );
  dateYearAndMounth.value = createObjMonth(dateObject.value, minYearWithDate.value);
};

const adjustDateYearObject = (): DateObject | void => {
  if (!containerWidth.value) return;

  const distanceToRightEdge = window.innerWidth - containerWidth.value.getBoundingClientRect().right;

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

window.addEventListener('resize', onResize);

const stepValue = computed(() => calculateStepValue(dateObject.value));
const stepValueYearAndMonth = computed(() => calculateStepValue(dateYearAndMounth.value));

const monthTooltip = (value: number, step: string): string  => {
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
  width: `${toValue.value - fromValue.value}%`
}));

const calcDistanceLeft = computed(() => ({
  left: `${fromValue.value}%`
}));

const calcDistanceRight = computed(() => ({
  right: `${100 - toValue.value}%`
}));

const activeSlider = (isActive: boolean) => ({
  opacity: isActive ? '1' : '0.6',
  borderBottom: isActive ? 'none' : '1px solid rgba(120, 169, 205, 0.5)'
});

watch([fromValue, toValue], ([newFromValue, newToValue]) => {
  if (+newFromValue > +newToValue) {
    [fromValue.value, toValue.value] = [newToValue, newFromValue];
  }
});
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.slider__circle-inside {
  display: flex;
  align-items: center;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #edf1f1;
  position: absolute;
  z-index: 4;
  pointer-events: none;
}

.slider {
  display: flex;
  width: 90%;
  height: 100vh;
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

  &__year-list,
  &__list {
    display: flex;
    justify-content: space-between;
    width: 103%;
    margin-left: -16px;
  }

  &__year-item {
    margin-right: 5px;
  }

  &__item:not(:last-child) {
    width: 100%;
    margin-right: 14px;
  }

  &__year {
    display: flex;
    justify-content: space-between;
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

  &__input[type="range"] {
    appearance: none;
    height: 10px;
    width: 100%;
    position: absolute;
    background-color: #edf1f1;
    pointer-events: none;
    left: 0;
    right: 0;
  }

  &__input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    position: relative;
    pointer-events: all;
    width: 20px;
    height: 20px;
    background-color: #5cadea;
    border-radius: 50%;
    z-index: 2;
    cursor: pointer;
  }
}

#fromSlider::-webkit-slider-thumb {
  transform: translateX(-20%);
}

#fromSlider {
  height: 0;
  z-index: 2;
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

@media (max-width: 1118px) {
  .slider__list {
    width: 106%;
  }
  .slider .slider__item {
    margin-right: 26px;
  }
}

@media (max-width: 830px) {
  .slider .slider__item {
    margin-right: 38px;
  }

  .slider__list {
    width: 108%;
  }

  .slider .slider__item {
    margin-right: 29px;
  }
}

@media (max-width: 630px) {
  .slider__list {
    width: 112%;
    margin-left: -15px;
  }
  .slider__month-text,
  .slider__year-text,
  .slider__text {
    font-size: 12px;
  }
}

@media (max-width: 560px) {
  .slider .slider__item {
    margin-right: 14px;
  }
}

@media (max-width: 470px) {
  .slider__list {
    width: 116%;
    margin-left: -15px;
  }
}
</style>

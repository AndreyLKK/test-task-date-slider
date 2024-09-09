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
                  ? getMonth(fromValue, stepValue)
                  : getMonth(fromValue, stepValueYearAndMonth)
              }}
            </p>
            <p class="slider__tooltip-text">
              {{
                visibleMounth
                  ? getYear(fromValue, stepValue, dateObject)
                  : getYear(fromValue, stepValueYearAndMonth, dateYearAndMounth)
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
                  ? getMonth(toValue, stepValue)
                  : getMonth(toValue, stepValueYearAndMonth)
              }}
            </p>
            <p class="slider__tooltip-text">
              {{
                visibleMounth
                  ? getYear(toValue, stepValue, dateObject)
                  : getYear(toValue, stepValueYearAndMonth, dateYearAndMounth)
              }}
            </p>
            <span
              class="slider__tooltip-triangle slider__tooltip-triangle--right"
            ></span>
          </div>

          <input
            class="slider__input"
            v-model="fromValue"
            id="fromSlider"
            type="range"
            min="0"
            max="100"
            :step="visibleMounth ? stepValue : stepValueYearAndMonth"
          />

          <input
            class="slider__input"
            v-model="toValue"
            id="toSlider"
            type="range"
            min="0"
            max="100"
            :step="visibleMounth ? stepValue : stepValueYearAndMonth"
          />
        </div>
        <ul class="slider__list" v-if="visibleMounth">
          <li
            class="slider__item"
            v-for="(months, year) in dateObject"
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
import { ref, computed, watch, defineProps, onMounted } from "vue";

interface DateObject {
  [year: number]: Month[];
}

interface Month {
  month: string;
}

interface Props {
  startYear: number;
  endYear: number;
  startYearWithDate: number;
}

const props = defineProps<Props>();

const startYear = computed(() => props.startYear);
const endYear = computed(() => props.endYear);
const startYearWithDate = computed(() => props.startYearWithDate);

const dateObject = ref<DateObject>({});
const dateYearAndMounth = ref<DateObject>({});

const fromValue = ref<number>(5);
const toValue = ref<number>(70);

const visibleMounth = ref<boolean>(true);

const month: string[] = [
  "янв",
  "фев",
  "мар",
  "апр",
  "май",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
];

const handlerToggle = () => {
  visibleMounth.value = !visibleMounth.value;

  const firstKey = Number(Object.keys(dateObject.value)[0]);
  let currentStartYear = startYearWithDate.value;

  if (firstKey > currentStartYear) currentStartYear = firstKey;

  dateYearAndMounth.value = {
    [currentStartYear]: dateObject.value[currentStartYear],
    [currentStartYear + 1]: dateObject.value[currentStartYear + 1] || [],
    [currentStartYear + 2]: [],
  };
};

function createDateRangeObject(startYear: number, endYear: number): DateObject {
  const result: DateObject = {};
  for (let year = startYear; year <= endYear; year++) {
    result[year] = [...month];
    if (year === endYear) result[year] = [];
  }
  return result;
}

onMounted(() => {
  dateObject.value = createDateRangeObject(startYear.value, endYear.value);
});

const stepValue = computed(() => calculateStepValue(dateObject.value));
const stepValueYearAndMonth = computed(() =>
  calculateStepValue(dateYearAndMounth.value)
);

function calculateStepValue(obj: DateObject): string {
  const numberOfYears = Object.keys(obj).length;
  let numberOfmonth = 12;
  const numberOfSteps = numberOfmonth * numberOfYears - 12 + numberOfYears;
  return (numberOfSteps > 1 ? 100 / (numberOfSteps - 1) : 1).toFixed(3);
}

const getMonth = (value: number, step: string): string => {
  const stepIndex = Math.round(value / Number(step));
  const monthIndex = (stepIndex - 1) % 13;
  const firstCapitalLetter = month[monthIndex]
    ? month[monthIndex].charAt(0).toUpperCase() + month[monthIndex].substring(1)
    : "-";

  if (value == 0) return "-";
  return monthIndex < month.length ? firstCapitalLetter : "-";
};

const getYear = (value: number, step: string, obj: DateObject): string => {
  const stepIndex = Math.round(value / Number(step));
  const monthsPerYear = 13;
  const keys = Object.keys(obj);

  const numberOfYears = keys.length;
  const stepsPerYear = monthsPerYear;
  const yearIndex = Math.floor(stepIndex / stepsPerYear);
  return keys[Math.min(yearIndex, numberOfYears - 1)];
};

const progressStyle = computed(() => {
  return {
    left: `${fromValue.value}%`,
    width: `${toValue.value - fromValue.value}%`,
  };
});

const calcDistanceLeft = computed(() => {
  return {
    left: `${fromValue.value}%`,
  };
});

const calcDistanceRight = computed(() => {
  return {
    right: `${100 - toValue.value}%`,
  };
});

const activeSlider = (isActive: boolean) => {
  return {
    fontWeight: isActive ? "700" : "normal",
  };
};

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

.slider {
  display: flex;
  width: 90%;
  height: 100vh;
  grid-gap: 20px;
  align-items: center;

  &__text-date {
    width: 100px;
  }

  &__text {
    margin-bottom: 10px;
    color: #5cadea;
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

  &__list {
    display: flex;
    justify-content: space-between;
    width: 102%;
    margin-left: -8px;
  }

  &__item:not(:last-child) {
    width: 100%;
    margin-right: 8px;
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
    font-weight: 700;
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
    font-weight: 700;
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

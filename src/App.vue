<template>
  <div class="content">
    <div class="content__flex-container">
      <div class="container">
        <MySlider
          :minDate="minDate"
          :maxDate="maxDate"
          :minYearWithDate="minYearWithDate"
          :maxYearWithDate="maxYearWithDate"
        />
        <div class="settings__date">
          <label for="yearMin" class="setting__label settings__input-text"
            >Минимальный год для секции "Все года":
            <input
              id="yearMin"
              class="setting__input"
              placeholder="1990"
              type="text"
              v-model.number="yearMin"
              :style="{
                border: isValidYearMin
                  ? '1px solid #797979'
                  : '2px solid #fb9696',
              }"
            />
            <p class="setting__error" v-if="errorYearMin">Заполните поле</p>
            <p class="setting__error" v-if="errorOverflowYears">
              Большой диапазон годов. Уменьшите его
            </p>
          </label>

          <label for="yearMax" class="setting__label settings__input-text"
            >Макисмальынй год для секции "Все года":
            <input
              id="yearMax"
              class="setting__input"
              placeholder="2010"
              type="text"
              v-model.number="yearMax"
              :style="{
                border: isValidYearMax
                  ? '1px solid #797979'
                  : '2px solid #fb9696',
              }"
            />
            <p class="setting__error" v-if="errorYearMax">Заполните поле</p>
            <p class="setting__error" v-if="errorYearMaxLess">
              Макисмальынй год не должен быть меньше минимального
            </p>
          </label>
          <label for="yearMonthMin" class="setting__label settings__input-text"
            >Выбор года для секции "Месяц":
            <input
              id="yearMonthMin"
              class="setting__input"
              placeholder="2004"
              type="text"
              v-model.number="yearMonthMin"
              :style="{
                border: isValidYearMonthMax
                  ? '1px solid #797979'
                  : '2px solid #fb9696',
              }"
            />
            <p class="setting__error" v-if="errorCorrectYearRange">
              Год должен быть в диапазон
            </p>
          </label>

          <label class="setting__label setting__select-text"
            >Выберите месяц для секции "Месяц":
            <div class="setting__inner">
              <select
                class="setting__select"
                name="monthMin"
                v-model="monthMin"
              >
                <option
                  :value="monthNumber"
                  v-for="monthNumber in monthsInNumber"
                  :key="monthNumber"
                >
                  {{ monthNumber }}
                </option>
              </select>
              <my-icon
                class="setting-select-icon"
                type="arrow-select"
              ></my-icon>
            </div>
          </label>

          <label class="setting__label setting__select-text"
            >Выберите месяц для секции "Месяц":
            <div class="setting__inner">
              <select
                class="setting__select"
                name="monthMax"
                v-model="monthMax"
              >
                <option
                  :value="monthNumber"
                  v-for="monthNumber in monthsInNumber"
                  :key="monthNumber"
                >
                  {{ monthNumber }}
                </option>
              </select>
              <my-icon
                class="setting-select-icon"
                type="arrow-select"
              ></my-icon>
            </div>
          </label>
          <button class="setting__button" @click="handlerAddDate">
            Сформировать слайдер
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import MySlider from "./components/MySlider.vue";
import MyIcon from "./UI/MyIcon.vue";

const yearMin = ref<number | null>(null);
const yearMax = ref<number | null>(null);
const monthMin = ref<number>(1);
const yearMonthMin = ref<number | null>(null);
const monthMax = ref<number>(1);
const yearMonthMax = ref<number | null>(null);

const errorYearMin = ref<boolean>(false);
const errorYearMax = ref<boolean>(false);
const errorYearMaxLess = ref<boolean>(false);
const errorCorrectYearRange = ref<boolean>(false);
const errorOverflowYears = ref<boolean>(false);

const monthsInNumber = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

onMounted(() => {
  if (yearMin.value == null && yearMax.value == null) {
    errorYearMin.value = true;
    errorYearMax.value = true;
  }
});

watch(
  () => yearMin.value,
  (newValue) => {
    if (newValue) {
      errorYearMin.value = false;
    }
    if (!newValue) {
      errorYearMin.value = true;
    }
  }
);

watch(
  () => yearMax.value,
  (newValue) => {
    errorYearMaxLess.value = false;
    if (newValue) {
      errorYearMax.value = false;
    }
    if (!newValue) {
      errorYearMax.value = true;
    }
  }
);

const createDate = (year: number | null, month: number | null) => {
  return year !== null && month !== null
    ? new Date(year, month)
    : new Date(0);
};

const handlerAddDate = () => {
  if (!validate(yearMin.value, yearMax.value, yearMonthMin.value)) {
    return;
  }

  minDate.value = createDate(yearMin.value, 0);
  maxDate.value = createDate(yearMax.value, 0);

  minYearWithDate.value = createDate(
    yearMonthMin.value ? yearMonthMin.value : yearMin.value,
    Number(monthMin.value - 1)
  );

  maxYearWithDate.value = createDate(
    yearMonthMax.value + 2,
    Number(monthMax.value - 1)
  );
};

const validate = (
  yearMin: number | null,
  yearMax: number | null,
  yearMonthMin: number | null
) => {
  if (yearMin == null || yearMax == null) {
    return false;
  }

  if (yearMax !== null && yearMin !== null && yearMax < yearMin) {
    errorYearMaxLess.value = true;
    return false;
  }

  if (yearMonthMin !== null) {
    if (yearMax < yearMonthMin || yearMin > yearMonthMin) {
      errorCorrectYearRange.value = true;
      return false;
    }
  }

  console.log(yearMax, yearMin);

  if (yearMax - yearMin > 90) {
    errorOverflowYears.value = true;
    return false;
  }

  errorOverflowYears.value = false;
  errorYearMaxLess.value = false;
  errorCorrectYearRange.value = false;
  return true;
};

const isValidYearMin = computed(() => yearMin.value !== null);
const isValidYearMax = computed(
  () => yearMax.value !== null && yearMax.value >= (yearMin.value || 0)
);
const isValidYearMonthMax = computed(() => {
  if (yearMonthMin.value !== null) {
    if (yearMax.value === null || yearMin.value === null) return false;

    return (
      yearMax.value >= yearMonthMin.value && yearMin.value <= yearMonthMin.value
    );
  }
  return true;
});

let minDate = ref<Date>(new Date(2000, 1));
let maxDate = ref<Date>(new Date(2030, 1));
let minYearWithDate = ref<Date>(new Date(2000, 5));
let maxYearWithDate = ref<Date>(new Date(2008, 11));
</script>

<style lang="scss">
.content {
  height: 100vh;
  background-color: rgb(232, 232, 232);
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
}

.content__flex-container {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
}

.settings__date {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 50px;
}

.setting__label {
  display: grid;
  align-items: center;
  justify-items: start;
  grid-template-columns: 320px 120px 400px;
  margin-bottom: 20px;
}

.setting__input {
  padding: 5px;
  width: 100px;
  border-radius: 5px;
  color: #797979;
  background-color: #e0e0e0;
  &::placeholder {
    color: #adadad;
  }
}

.setting__error {
  color: #fb9696;
}

.setting__inner {
  position: relative;
  width: 100%;
}

.setting__select {
  background-color: #e0e0e0;
  color: #797979;
  max-width: 40px;
  width: 100%;
  cursor: pointer;
}

.setting-select-icon {
  position: absolute;
  left: 15px;
  top: 0;
  transform: translateY(-10%);
  pointer-events: none;
}

.setting__button {
  padding: 10px 15px;
  background-color: #5cadea;
  border-radius: 50px;
}
</style>

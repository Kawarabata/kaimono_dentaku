<template>
  <li :class="['formula-list-item', { 'min-result': isMinResult }]">
    <img
      v-if="isMinResult"
      src="@/assets/images/flag_icon.svg"
      alt="最安"
      class="flag-icon"
    />
    <div class="formula-container">
      <span class="bold">{{ price }}</span>
      <span class="unit">円</span>
      <span class="operator">÷</span>
      <span class="bold">{{ gram }}</span>
      <span class="unit">g</span>
      <span class="operator">=</span>
      <span class="bold">{{ result }}</span>
      <span class="unit">円</span>
    </div>
    <button class="garbage-icon" @click="removeFormula">
      <img src="@/assets/images/garbage_white_icon.svg" alt="削除" />
    </button>
  </li>
</template>

<script>
export default {
  props: {
    price: {
      type: String,
      required: true,
    },
    gram: {
      type: String,
      required: true,
    },
    result: {
      type: Number,
      required: true,
    },
    isMinResult: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    removeFormula() {
      this.$emit('remove-formula')
    },
  },
}
</script>

<style lang="postcss" scoped>
.formula-list-item {
  display: flex;
  padding: 16px 16px 16px 47px;
  background-color: #e0f1f1;
  border-radius: 8px;

  &.min-result {
    padding: 16px;
  }

  & + li {
    margin-top: 16px;
  }

  & .flag-icon {
    margin-right: 16px;
  }

  & .formula-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 24px;
    width: 100%;

    & span {
      display: block;
    }

    & .bold {
      font-weight: bold;
    }

    & .unit {
      font-size: 14px;
    }

    & .operator {
      font-size: 24px;
      margin-top: -6px;
    }
  }

  & .garbage-icon {
    display: block;
    margin-left: auto;
  }
}
</style>

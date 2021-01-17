<template>
  <div class="home">
    <header>
      <h1>買物電卓</h1>
      <button @click="resetList">All Reset</button>
    </header>
    <ul>
      <li
        v-for="(formula, index) in formulaList"
        :key="index"
        :class="{ 'min-result': isMinResult(index) }"
      >
        <img
          v-if="index === minResultIndex"
          src="@/assets/images/flag_icon.svg"
          alt="最安"
          class="flag-icon"
        />
        <div class="formula-container">
          <span class="bold">{{ formula.price }}</span>
          <span class="unit">円</span>
          <span class="operator">÷</span>
          <span class="bold">{{ formula.gram }}</span>
          <span class="unit">g</span>
          <span class="operator">=</span>
          <span class="bold">{{ formula.result }}</span>
          <span class="unit">円</span>
        </div>
        <button class="garbage-icon" @click="removeFormula(index)">
          <img src="@/assets/images/garbage_white_icon.svg" alt="削除" />
        </button>
      </li>
    </ul>
    <footer>
      <div class="footer-container">
        <div class="calculator">
          <input v-model="price" type="number" max="9999" />円 ÷
          <input v-model="gram" type="number" max="9999" />g =
          <span class="result">{{ result }}</span
          >円
        </div>
        <div class="button-container">
          <span
            v-show="
              price &&
              gram &&
              (price.toString().length > 5 || gram.toString().length > 5)
            "
            class="error-message"
          >
            5桁までにしてください
          </span>
          <span v-show="+price === 0 || +gram === 0" class="error-message">
            0や空白はダメです
          </span>
          <span
            v-show="price && gram && (price.match(/e/) || gram.match(/e/))"
            class="error-message"
          >
            バグらせようとしてます？
          </span>
          <button :disabled="isFormulaInvalid" @click="addFormula">
            比較リストに入れる
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    price: undefined,
    gram: undefined,
  }),
  computed: {
    formulaList() {
      return this.$store.state.formulaList
    },
    result() {
      if (this.isFormulaInvalid) {
        return 0
      }
      return Math.floor((this.price * 100) / this.gram) / 100
    },
    minResultIndex() {
      return this.$store.getters.minResultIndex
    },
    isMinResult() {
      return (index) => {
        return index === this.minResultIndex
      }
    },
    isFormulaInvalid() {
      return (
        !this.price ||
        !this.gram ||
        +this.price === 0 ||
        +this.gram === 0 ||
        this.price.toString().length > 5 ||
        this.gram.toString().length > 5 ||
        !!this.price.match(/e/) ||
        !!this.gram.match(/e/)
      )
    },
  },
  mounted() {
    this.$store.dispatch('setFormulaList')
  },
  methods: {
    addFormula() {
      if (!this.price || !this.gram) {
        return
      }

      this.$store.dispatch('addFormula', {
        price: this.price,
        gram: this.gram,
        result: this.result,
      })
      this.price = undefined
      this.gram = undefined
    },
    removeFormula(index) {
      this.$store.dispatch('removeFormula', index)
    },
    resetList() {
      this.$store.commit('resetFormulaList')
    },
  },
}
</script>

<style scoped lang="postcss">
.home {
  min-height: 100vh;

  & header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background-color: #aed265;
    color: #fff;

    & h1 {
      font-size: 20px;
      font-weight: bold;
    }

    & button {
      font-size: 16px;
      font-weight: bold;
    }
  }

  & ul {
    padding: 24px 12px;
    max-width: 380px;
    margin: 0 auto;

    & li {
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
  }

  & footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    padding: 24px 12px;
    background-color: #e0f1f1;

    & .footer-container {
      max-width: 380px;
      margin: 0 auto;
    }

    & .calculator {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      & input {
        padding: 8px 16px;
        width: 20%;
        border: none;
        border-radius: 4px;
      }

      & .result {
        padding: 4px 8px;
        min-width: 20%;
        background-color: #fff;
        border-radius: 4px;
      }
    }

    & .button-container {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      & .error-message {
        margin-right: 12px;
        color: red;
      }

      & button {
        padding: 8px;
        color: #fff;
        background-color: #5188b1;
        border-radius: 4px;

        &:disabled {
          cursor: default;
          opacity: 0.5;
        }
      }
    }
  }
}
</style>

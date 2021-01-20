<template>
  <div class="home">
    <header>
      <h1>買物電卓</h1>
      <button @click="resetList">All Reset</button>
    </header>
    <ul>
      <transition-group name="formulae">
        <formula-list-item
          v-for="(formula, index) in formulaList"
          :key="formula.id"
          :price="formula.price"
          :gram="formula.gram"
          :result="formula.result"
          :is-min-result="isMinResult(index)"
          @remove-formula="removeFormula(index)"
        />
      </transition-group>
    </ul>
    <footer>
      <div class="footer-container">
        <div class="calculator">
          <input
            v-model="price"
            type="number"
            max="9999"
            min="1"
            inputmode="numeric"
          />円 ÷
          <input
            v-model="gram"
            type="number"
            max="9999"
            min="1"
            inputmode="numeric"
          />g = <span class="result">{{ result }}</span
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
          <span v-show="+price <= 0 || +gram <= 0" class="error-message">
            0以下や空白はダメです
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
        +this.price <= 0 ||
        +this.gram <= 0 ||
        this.price.toString().length > 4 ||
        this.gram.toString().length > 4 ||
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
      if (this.isFormulaInvalid) {
        return
      }

      const id =
        this.formulaList.length > 0 ? this.formulaList.slice(-1)[0].id + 1 : 1
      this.$store.dispatch('addFormula', {
        id,
        price: +this.price,
        gram: +this.gram,
        result: this.result,
      })
      this.price = undefined
      this.gram = undefined
    },
    removeFormula(index) {
      this.$store.dispatch('removeFormula', index)
    },
    resetList() {
      this.$store.dispatch('resetFormulaList')
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
    padding: 24px 12px 200px;
    max-width: 380px;
    margin: 0 auto;
  }

  & .formula-list-item {
    transition: all 0.6s;
  }

  & footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 160px;
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
      margin-bottom: 24px;

      & input {
        padding: 8px 16px;
        width: 20%;
        height: 42px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
      }

      & .result {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 8px;
        min-width: 20%;
        height: 42px;
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
        padding: 12px;
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

.formulae-enter {
  opacity: 0;
  transform: translateY(350px);
}

.formulae-leave-to {
  opacity: 0;
  transform: translateX(350px);
}

.formulae-leave-active {
  position: absolute;
}
</style>

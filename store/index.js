export const state = () => ({
  formulaList: [],
})

export const getters = {
  minResultIndex(state) {
    const results = state.formulaList.map((formula) => formula.result)
    return results.indexOf(Math.min(...results))
  },
}

export const mutations = {
  addFormula(state, formula) {
    state.formulaList = [...state.formulaList, formula]
  },

  removeFormula(state, index) {
    state.formulaList.splice(index, 1)
  },

  setFormulaList(state, formulaList) {
    state.formulaList = formulaList
  },

  resetFormulaList(state) {
    state.formulaList = []
  },
}

export const actions = {
  addFormula(context, formula) {
    context.commit('addFormula', formula)
    context.dispatch('setFormulaListToLocalStorage')
  },

  removeFormula(context, index) {
    context.commit('removeFormula', index)
    context.dispatch('setFormulaListToLocalStorage')
  },

  setFormulaList(context) {
    const formulaList = localStorage.getItem('formulaList')
      ? JSON.parse(localStorage.getItem('formulaList'))
      : []
    context.commit('setFormulaList', formulaList)
  },

  resetFormulaList(context) {
    context.commit('resetFormulaList')
    context.dispatch('setFormulaListToLocalStorage')
  },

  setFormulaListToLocalStorage(context) {
    localStorage.setItem(
      'formulaList',
      JSON.stringify(context.state.formulaList)
    )
  },
}

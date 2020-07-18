import * as components from './components'

const Pragtify = {
    install (Vue, options = {}) {
        // Options
        // Components
        for (let componentKey in components) {
            Vue.use(components[componentKey])
        }
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Pragtify)
}

export default Pragtify

// export all components as vue plugin
export * from './components'

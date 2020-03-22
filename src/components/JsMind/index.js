import jsMind from './JsMind.vue'
jsMind.install = Vue => {
    Vue.component(jsMind.name, jsMind)
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component(jsMind.name, jsMind)
}

export default jsMind;

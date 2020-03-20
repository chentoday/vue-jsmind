import jsMind from './JsMind.vue'

jsMind.install = Vue => {
    Vue.component(jsMind.name, jsMind);
    import 'jsmind/style/jsmind'
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component(jsMind.name, jsMind)
    import 'jsmind/style/jsmind'
}

export default jsMind;

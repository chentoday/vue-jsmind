import jsMind from './JsMind.vue'
import 'jsmind/js/jsmind.draggable'
import 'jsmind/js/jsmind.screenshot'
jsMind.install = Vue => {
    Vue.component(jsMind.name, jsMind)
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component(jsMind.name, jsMind)
}

export default jsMind;

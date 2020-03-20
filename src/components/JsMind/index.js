import jsMind from './JsMind.vue'
jsMind.install = Vue => {
    console.log(Vue.component(jsMind.name, jsMind));
}

if (typeof window !== 'undefined' && window.Vue) {
    console.log(window.Vue.component(jsMind.name, jsMind))
}

export default jsMind;

import dragableDirective from './directive';

export default {
    install (Vue, options = {}) {
        Vue.directive(options.name || 'dragable' , dragableDirective)
    }
}
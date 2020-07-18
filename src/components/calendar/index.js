import Calendar from './Calendar'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install (Vue) {
        registerComponent(Vue, Calendar)
    }
}

use(Plugin)

export default Plugin

export {
    Calendar as PCalendar
}

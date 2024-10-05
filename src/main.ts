import { createApp, shallowRef, watch } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import '@icon-park/vue-next/styles/index.css'
import 'prosemirror-view/style/prosemirror.css'
import 'animate.css'
import '@/assets/styles/prosemirror.scss'
import '@/assets/styles/global.scss'
import '@/assets/styles/font.scss'

import Icon from '@/plugins/icon'
import Directive from '@/plugins/directive'
import type { vFile } from './vlist'
import useImport from './hooks/useImport'

export default function(element: HTMLElement){
    const app = createApp(App)
    app.use(Icon)
    app.use(Directive)
    app.use(createPinia())
    app.mount(element)
}

export const __v_store__ = shallowRef<{
    dir: string,
    file: vFile
}>()

watch(__v_store__, data => data && (async function(){
    const { importPPTXFile } = useImport();
    const dat = await (await fetch(data.file.url)).blob() as File,
        // @ts-expect-error
        flist = [ new File([dat], data.file.name) ] as FileList;
    flist.item = i => flist[i];
    importPPTXFile(flist);
})());

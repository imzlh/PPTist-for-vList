import { createApp, shallowRef } from 'vue'
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

export default async function(){
    const app = createApp(App)
    app.use(Icon)
    app.use(Directive)
    app.use(createPinia())
    app.mount(__v_store__.value!.root);

    const { importPPTXFile } = useImport();
    const dat = await (await fetch(__v_store__.value!.file.url)).blob() as File,
        // @ts-expect-error
        flist = [ new File([dat], __v_store__.value!.file.name) ] as FileList;
    flist.item = i => flist[i];
    importPPTXFile(flist);
}

export const __v_store__ = shallowRef<{
    dir: string,
    file: vFile,
    root: HTMLDivElement,
    shadow: ShadowRoot
}>()
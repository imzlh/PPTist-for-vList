<script lang="ts" setup>
    const emit = defineEmits<{
        change: [ data: FileList ]
    }>();

    (async function(){
        const file = Promise.all((await _G('fs.pick')({
            src: '/',
            type: 'file'
        })).map(async file => {
            const data = await (await fetch(file.url)).blob();
            new File([data], file.name, {
                "lastModified": file.ctime
            });
        }));

        // @ts-ignore
        const flist = file as FileList;
        flist.item = i => flist[i];
        emit('change', flist);
    })();
</script>
<script lang="ts" setup>
    const emit = defineEmits<{
        change: [ data: File ]
    }>();

    (async function(){
        const file = (await _G('fs.pick')({
            src: '/',
            type: 'file'
        }))[0];
        const data = await (await fetch(file.url)).blob();
        emit('change', new File([data], file.name, {
            "lastModified": file.ctime
        }));
    })();
</script>
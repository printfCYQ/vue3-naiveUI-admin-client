type SelectType = {
    label: string
    value: number
    disabled?: boolean
}

export default function useRoleList() {
    const roleList = ref<Array<SelectType>>([])
    onMounted(() => {
        console.log('useRoleList');
        setTimeout(() => {
            roleList.value = [
                {
                    label: "admin",
                    value: 1,
                },
                {
                    label: 'admin2',
                    value: 2
                }
            ]
        }, 200)
    });

    return {
        roleList,
    };
}

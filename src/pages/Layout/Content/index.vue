<template>
    <transition name="fade" mode="out-in" appear>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </transition>
</template>
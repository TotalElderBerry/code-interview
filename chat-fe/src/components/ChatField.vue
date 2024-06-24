<script setup>
import {ref} from 'vue'
const messages = ref([])
const chat = ref("")
const socket = new WebSocket('ws://localhost:3030')
socket.onopen = (event) =>{
  console.log("WebSocket connection opened:");
};

const submitChat = () => {
    socket.send(chat.value)
    messages.value.push({isSender: true, message: chat.value})
    chat.value = ""
}

socket.onmessage = (event) => {
    console.log(event.data)
    messages.value.push({isSender: false, message: event.data});
}
</script>

<template>
  <div class="h-screen flex flex-col justify-between border rounded-xl shadow-lg px-3 py-2 my-2">
    <h1 class="font-medium text-2xl border-b">Chat</h1>

    <div class="mb-2">
        <ul>
            <li class="flex" :class="message.isSender ? 'justify-end':''" v-for="(message, index) in messages" :key="index">
                <div class="rounded-lg p-1.5 font-medium my-1" :class="message.isSender ? 'bg-blue-600 text-white':'bg-gray-300' ">{{ message.message }}</div>
            </li>
        </ul>
        <form  >
            <div class="flex gap-2 items-center">
                <input v-model="chat" placeholder="Send a message" type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                <button type="submit" @click.prevent="submitChat" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
            </div>
        </form>
    </div>
  </div>
</template>

<style scoped>
</style>

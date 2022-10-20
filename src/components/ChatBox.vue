<template>
    <div class="container" style="height:80vh;">
      <div class="mx-5">
        <MessageComponent
          v-for="{ id, text, userPhotoURL, userName, userId } in messages"
          :key="id"
          :name="userName"
          :photo-url="userPhotoURL"
          :sender="userId === user?.uid"
        >
          {{ text }}
        </MessageComponent>
      </div>
    </div>
    <div ref="bottom" class="mt-20" />
    <div class="bottom">
      <div class="container-sm">
        <form v-if="isLogin" @submit.prevent="send">
          <input v-model="message" placeholder="Message" required />
          <button type="submit" class="btn btn-primary">
            <span>Send</span><SendIcon />
          </button>
        </form>
      </div>
    </div>
  </template>
  <script>
  import { ref, watch, nextTick } from 'vue'
  import { useAuth, useChat } from '@/firebase'
  import SendIcon from './SendIcon.vue'
  import MessageComponent from './MessageComponent.vue'
  export default {
    components: { MessageComponent, SendIcon },
    setup() {
      const { user, isLogin } = useAuth()
      const { messages, sendMessage } = useChat()
      console.log(messages);
      const bottom = ref(null)
      watch(
        messages,
        () => {
          nextTick(() => {
            bottom.value?.scrollIntoView({ behavior: 'smooth' })
          })
        },
        { deep: true }
      )
      const message = ref('')
      const send = () => {
        sendMessage(message.value)
        message.value = ''
      }
      return { user, isLogin, messages, bottom, message, send }
    }
  }
  </script>
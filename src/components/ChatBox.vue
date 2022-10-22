<template>
  <div class="container-fluid chat-container">
    <div class="mx-5">
      <MessageComponent v-for="{ id, text, userPhotoURL, userName, userId } in messages" :key="id" :name="userName"
        :photo-url="userPhotoURL" :sender="userId === user?.uid">
        {{ text }}
      </MessageComponent>
    </div>
    <div ref="bottom" class="mt-5" />
  </div>
  <div class="bottom fixed-bottom chat-input">
    <div class="container-sm">
      <form v-if="isLogin" @submit.prevent="send">
        <div class="input-group mb-3">
          <input v-model="message" placeholder="Message" required type="text" class="form-control" aria-label="message"
            aria-describedby="button-addon2">
          <button type="submit" class="btn btn-primary">
            Send
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send"
              viewBox="0 0 16 16">
              <path
                d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { ref, watch, nextTick } from 'vue'
import { useAuth, useChat } from '@/firebase'
import { useRoute } from 'vue-router'
import MessageComponent from './MessageComponent.vue'
export default {
  components: { MessageComponent },
  setup() {
    const { user, isLogin } = useAuth()
    const route = useRoute()
    const chatRoomId = route.params.chatroomid;
    const { messages, sendMessage } = useChat(chatRoomId)

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
      sendMessage(message.value, chatRoomId)
      message.value = ''
    }
    return { user, isLogin, messages, bottom, message, send }
  }
}
</script>

<style scoped>
.chat-container {
  max-height: 800px;
  overflow-y: scroll;
}
.chat-input {
  padding: 10px 0;
}
</style>
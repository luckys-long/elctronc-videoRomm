import { ref } from 'vue'

import audioOff from "@/assets/vite.svg";
import audioOn from "@/assets/vite.svg";

export const useAudioMuted = (context) => {

  const audioMuted = ref(false)
  const audioButton = ref(audioOff)
  const handleAudioMuted = () => {
    audioMuted.value = !audioMuted.value
    audioButton.value = audioMuted.value ? audioOn : audioOff
    // context.emit('audioMuted', audioMuted.value)
  }
  return {
    audioMuted,
    audioButton,
    handleAudioMuted
  }
}

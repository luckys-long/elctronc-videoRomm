import { ref } from "vue";

import videoOff from "@/assets/vite.svg";
import videoOn from "@/assets/vite.svg";

export const useVideoMuted = () => {
  const videoMuted = ref(false);
  const videoButton = ref(videoOff);
  const handleVideoMuted = () => {
    videoMuted.value = !videoMuted.value;
    videoButton.value = videoMuted.value ? videoOn : videoOff;
  };
  return {
    videoButton,
    handleVideoMuted,
  };
};

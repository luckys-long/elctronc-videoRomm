import { defineStore } from 'pinia';


export const useRoomStore = defineStore({
  id: 'room',
  state: () => ({
    sfuPlugin:undefined
  }),
  getters: {},
  actions: {
    changeJanusPlugin(plugin:any) {
      this.sfuPlugin = plugin;
    }
  }
});

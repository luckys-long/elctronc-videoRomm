import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/home/index.vue"),
  },
  {
    path: "/room",
    name: "room",
    component: () => import("@/pages/meetingRoom/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // const token = superStorage.get(TOKEN_KEY);
  // if (!token) {
  //   if (to.path.toLocaleLowerCase() !== '/login') {
  //     return next('/login');
  //   }
  // }
  // const { permission } = to.meta;
  // if (permission) {
  //   const perm:any = permission;
  //   const path:string | boolean = await checkRouter(perm[0]);
  //   if (path === true) {
  //     return next();
  //   }
  //   return next(path as string);
  // }
  // if (to.path === '/') {
  //   initRouter();
  // }
  return next();
});


// 全局后置钩子-常用于结束动画等
router.afterEach((to, from) => {
  // do something
})

export default router;

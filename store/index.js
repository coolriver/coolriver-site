export const state = () => ({
  pvUv: {
    sitePv: 0,
    siteUv: 0,
    pagePv: 0
  },
  recentList: [],
  tagList: [],
});

export const mutations = {
  updatePvUv(state, { sitePv, siteUv, pagePv }) {
    state.pvUv = {
      sitePv,
      siteUv,
      pagePv
    };
  }
};

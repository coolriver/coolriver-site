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
  },
  updateRecentList(state, list) {
    state.recentList = list;
  },
  updateTagList(state, list) {
    state.tagList = list;
  }
};

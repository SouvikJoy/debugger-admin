import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import router from '@/router';
import useClient from '@/hooks/sb-hooks';

import { createToast } from 'mosha-vue-toastify';
import { auth } from '@/auth';
import axios from 'axios';
import { darkModeKey } from '@/config.js';

const supabase = useClient();

export default createStore({
  state: {
    /* User */
    user: null,
    categories: [],
    profile: {},

    /* fullScreen - fullscreen form layout (e.g. login page) */
    isFullScreen: false,

    /* Aside */
    isAsideMobileExpanded: false,
    isAsideLgActive: false,

    /* Dark mode */
    darkMode: false,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_CATEGORY(state, data) {
      state.categories = data;
    },
    SET_PROFILE(state, data) {
      state.profile = data;
    },
    /* A fit-them-all commit */
    basic(state, payload) {
      state[payload.key] = payload.value;
    }
  },
  actions: {
    async signInAction({ commit }, form) {
      try {
        const { error, user } = await supabase.auth.signIn({
          email: form.email,
          password: form.password
        });

        if (!error) {
          createToast('Login Success',
            {
              type: 'success',
              transition: 'slide',
              showIcon: 'true',
              hideProgressBar: 'true'
            });
        }

        if (error) throw error;
        commit('SET_USER', user);

        await router.go();
      } catch (error) {
        createToast('Login Failed',
          {
            type: 'danger',
            transition: 'slide',
            showIcon: 'true',
            hideProgressBar: 'true'
          });
      }
    },

    async signUpAction({ dispatch }, form) {
      try {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password
        });
        if (error) throw error;
        alert("You've been registered successfully");
        await dispatch('signInAction', form);
      } catch (error) {
        // eslint-disable-next-line camelcase
        const { error_description, message } = error;
        // eslint-disable-next-line camelcase
        alert(error_description || message);
      }
    },

    async signOutAction({ commit }) {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        commit('SET_USER', null);
        createToast('Logout Success',
          {
            type: 'success',
            transition: 'slide',
            showIcon: 'true',
            hideProgressBar: 'true'
          });

        await router.go();
      } catch (error) {
        createToast('Logout Failed',
          {
            type: 'danger',
            transition: 'slide',
            showIcon: 'true',
            hideProgressBar: 'true'
          });
      }
    },

    async getAllCategories({ commit }) {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*');

        if (error || !data) {
          throw error || new Error('No data');
        }
        await commit('SET_CATEGORY', data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error.message);
      }
    },

    async getProfile({ commit }) {
      try {
        auth.user = supabase.auth.user();

        const { data, error, status } = await supabase
          .from('profiles')
          .select('username, website, avatar_url')
          .eq('id', auth.user.id)
          .single();

        if (error && status !== 406) throw error;

        await commit('SET_PROFILE', data);
      } catch (error) {
        alert(error.message);
      }
    },
    asideMobileToggle({ commit, state }, payload = null) {
      const isShow = payload !== null ? payload : !state.isAsideMobileExpanded;

      document.getElementById('app').classList[isShow ? 'add' : 'remove']('ml-60', 'lg:ml-0');

      document.documentElement.classList[isShow ? 'add' : 'remove']('m-clipped');

      commit('basic', {
        key: 'isAsideMobileExpanded',
        value: isShow
      });
    },

    asideLgToggle({ commit, state }, payload = null) {
      commit('basic', { key: 'isAsideLgActive', value: payload !== null ? payload : !state.isAsideLgActive });
    },

    fullScreenToggle({ commit, state }, value) {
      commit('basic', { key: 'isFullScreen', value });

      document.documentElement.classList[value ? 'add' : 'remove']('full-screen');
    },

    darkMode({ commit, state }) {
      const value = !state.darkMode;

      document.documentElement.classList[value ? 'add' : 'remove']('dark');

      localStorage.setItem(darkModeKey, value ? '1' : '0');

      commit('basic', {
        key: 'darkMode',
        value
      });
    }
  },
  modules: {
  },

  plugins: [createPersistedState()]
});

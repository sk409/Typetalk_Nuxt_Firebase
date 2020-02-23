import Vue from "vue";
Vue.prototype.$convert = (doc) => {
  const data = doc.data();
  data.id = doc.id;
  return data;
};

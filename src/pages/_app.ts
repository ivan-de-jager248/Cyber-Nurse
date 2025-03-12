import { createPinia } from 'pinia';
import  type { App } from 'vue';

// Create Pinia instance
const pinia = createPinia();

// Export for use in Vue components
export default (app: App) => {
  app.use(pinia);
};
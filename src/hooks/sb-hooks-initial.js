import { ref } from 'vue';

import useClient from '@/hooks/sb-hooks';

const supabase = useClient();

const categoryList = ref();
const displayError = ref();

const dataService = () => {
  const initialize = async() => {
    await loadCategories();
  };

  const loadCategories = async() => {
    const load = async() => {
      const { data, error } = await supabase.from('categories').select(`
    *,
    category_variants (
      *
    )
  `);
      categoryList.value = data;
      displayError.value = error;

      return { data, error };
    };

    supabase.from('categories')
      .on('*', async(payload) => {
        console.log('Change received!', payload);
        await load();
      })
      .subscribe();

    await load();
  };

  const loadCategoryById = async(categoryId) => {
    const { data, error } = await supabase.from('categories')
      .select('*, category_variants ( * ) ')
      .eq('id', categoryId);

    console.log(data, error);
    return { data, error };
  };

  return {
    displayError,
    categoryList,
    initialize,
    loadCategories,
    loadCategoryById
  };
};

dataService().initialize();

export default dataService;

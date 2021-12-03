import { ref } from 'vue';
import useClient from './sb-hooks';

export default function() {
  const error = ref(null);
  const data = ref([]);
  const loading = ref(true);

  const client = useClient();

  console.log('in update');

  /**
   *
   * @param {*} table
   * @param {*} id
   * @param columns
   * @returns
   */
  const doUpdate = async(table, id, columns) => {
    loading.value = true;
    const { data: qData, error: qError } = await client
      .from(table)
      .update(columns)
      .eq('id', id);

    loading.value = false;
    data.value = qData;
    error.value = qError;

    return qData;
  };

  return {
    error,
    data,
    loading,
    doUpdate
  };
}

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const itemId = route.params.itemId;

import { onMounted, ref } from 'vue';

// APIからデータを取得するための状態を保持するrefを定義
const item = ref([])


onMounted(async () => {
  try {
    // REST APIからデータを非同期に取得
    const response = await fetch(`/api/items/${itemId}`)
    if (!response.ok) {
      throw new Error('サーバーエラー');
    }
    const data = await response.json()
    item.value = data
    console.log("item.value", item.value)
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error)
  }
})
</script>

<template>
  <div id="table">
    <table>
        <thead>
            <tr>
                <th>商品ID</th>
                <th>商品名</th>
                <th>カテゴリ</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ item.itemId }}</td>
                <td>{{ item.itemName }}</td>
                <td>{{ item.itemCategory }}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>


<style>
/* 必要に応じてスタイルを追加 */
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>

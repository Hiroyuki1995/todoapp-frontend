<script setup>
// import { RouterView } from 'vue-router';
import { useRouter } from 'vue-router';
// import HelloWorld from './components/HelloWorld.vue'

import { onMounted, ref } from 'vue';

// APIからデータを取得するための状態を保持するrefを定義
const items = ref([])
const router = useRouter(); // ルーターインスタンスを取得

onMounted(async () => {
  try {
    // REST APIからデータを非同期に取得
    const response = await fetch('/api/items')
    if (!response.ok) {
      throw new Error('サーバーエラー');
    }
    const data = await response.json()
    items.value = data
    console.log("items.value", items.value)
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error)
  }
})
    const goToTodo= (id) => {
      // this.$router.push('/todo/1');
      router.push(`/todo/${id}`);
    }
</script>

<template>
  <div id="table">
    <table>
        <thead>
            <tr>
                <!-- <th>商品ID</th> -->
                <th>商品名</th>
                <th>カテゴリ</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.itemId">
                <!-- <td>{{ item.itemId }}</td> -->
                <td>{{ item.itemName }}</td>
                <td>{{ item.itemCategory }}</td>
                <!-- <td><input type="button" value="詳細"></td> -->
                <td><button @click="goToTodo(item.itemId)">詳細</button></td>
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

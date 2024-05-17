<template>
  <div class="login-container">
    <h2>Add New Todo</h2>
    <form @submit.prevent="addNewTodo">
      <div>
        <label for="itemName">商品名</label>
        <input id="itemName" v-model="credentials.itemName" type="text" required>
      </div>
      <div>
        <label for="itemCategory">カテゴリー</label>
        <input id="itemCategory" v-model="credentials.itemCategory" type="itemCategory" required>
      </div>
      <button type="submit">Add New Todo</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        itemName: '',
        itemCategory: '',
      },
    };
  },
  methods: {
    async addNewTodo() {
      // console.log(new URLSearchParams(Object.entries(this.credentials)).toString())
      try {
        const response = await fetch('/api/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.credentials),
        });
        
        if (!response.ok) {
          throw new Error('Add New Todo failed');
        }
      } catch (error) {
        console.error('Sign Up error:', error);
        // エラー処理をここで行います
      }
    },
  },
};
</script>

<style>
/* 必要に応じてスタイルを追加 */
.login-container {
  /* スタイリング */
}
</style>

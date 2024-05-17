<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input id="username" v-model="credentials.username" type="text" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="credentials.password" type="password" required>
      </div>
      <button type="submit">Login</button>
      <div>
      <a href="http://localhost:8081/login/google" type="submit">Googleアカウントからサインイン</a>
      <a href="http://localhost:8081/login/line" type="submit">LINEアカウントからサインイン</a>
      <a href="http://localhost:8081/login/bizsol-mock" type="submit">BizSOLモックアカウントからサインイン</a>
      <a href="./signup" type="submit">アカウントがない方はこちら</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
      // 任意: ログイン試行の成功/失敗を示す状態を追加することもできます
    };
  },
  methods: {
    async login() {
      console.log(new URLSearchParams(Object.entries(this.credentials)).toString())
      try {
        const response = await fetch('/api/login', { // APIのエンドポイントに置き換えてください
          method: 'POST',
          headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(Object.entries(this.credentials)).toString(),
        });
        
        if (!response.ok) {
          throw new Error('Login failed');
        }

        // window.location.href = './todo';
        window.location.href = './';

      } catch (error) {
        console.error('Login error:', error);
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

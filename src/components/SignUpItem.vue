<template>
  <div class="login-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
      <div>
        <label for="username">Username:</label>
        <input id="username" v-model="credentials.username" type="text" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="credentials.password" type="password" required>
      </div>
      <button type="submit">Sing Up</button>
      <div>
      <a href="http://localhost:8081/login/google" type="submit">Googleアカウントからサインアップ</a>
      <a href="http://localhost:8081/login/line" type="submit">LINEアカウントからサインアップ</a>
      <a href="http://localhost:8081/login/bizsol-mock" type="submit">BizSOLモックアカウントからサインアップ</a>
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
    async signup() {
      // console.log(new URLSearchParams(Object.entries(this.credentials)).toString())
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.credentials),
        });
        
        if (!response.ok) {
          throw new Error('Sign Up failed');
        }

        // TODO:ロケーション変更が良いか、router.pushが良いか。
        window.location.href = './';

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

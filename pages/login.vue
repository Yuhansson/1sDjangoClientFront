<template>
  <v-container>
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
      >
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            v-model="login"
            :rules="loginRules"
            label="ИНН"
            :counter="10"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            type="password"
            counter
            label="Пароль"
            required
          ></v-text-field>

          <div
            class="mb-3"
          ></div>

          <v-btn
            class="mr-4"
            @click="submit"
          >
            Войти
          </v-btn>
          <v-btn @click="clear">
            Очистить
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    valid: false,
    login: '',
    password: '',
    loginRules: [
      v => !!v || 'ИНН обязательное поле',
      v => (v && v.length >= 10) || 'Минимум 10 символов',
    ],
    passwordRules: [
      v => !!v || 'Пароль обязательное поле',
    ],
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          const login = {
            'username': this.login,
            'password': this.password
          }
          await this.$auth.loginWith('local', {data: login})
        } catch (err) {
          console.log(err)
        }
      }
    },
    clear() {
      this.$refs.form.reset()
    },
  },
}
</script>


<style scoped>

</style>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const verificationToken = useRoute().query.token as string

const { getSession, data } = useAuth()
const user = data.value?.user
const enteredEmail = ref(null as string | null)
const verificationError = ref(null as string | null)

if (verificationToken) {
  const { error } = await useFetch('/api/user/verification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      token: verificationToken,
    },
  })

  if (error.value)
    verificationError.value = error.value.data.code

  else
    navigateTo('/app')
}

async function resendVerification() {
  const body: { email?: string } = {}

  if (enteredEmail.value)
    body.email = enteredEmail.value

  try {
    const response
      = await $fetch<{ status: number, statusMessage?: string }>('/api/user/verification/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

    if ((response.status >= 200 && response.status < 300)
      || (response.status === 409 && response.statusMessage === 'EMAIL_ALREADY_VERIFIED')) {
      await getSession()
      navigateTo('/app')
    }
    else {
      verificationError.value = 'Unable to resend verification email'
    }
  }
  catch (e) {
    verificationError.value = 'Unable to resend verification email'
  }
}
</script>

<template>
  Verify Email

  <div v-if="verificationError">
    {{ verificationError }}
  </div>

  <div v-if="!user.email">
    <label for="email">Enter your email:</label>
    <input v-model="enteredEmail" name="email" type="email">
    <button @click="resendVerification">
      Submit
    </button>
  </div>
  <div v-else-if="!verificationToken || verificationError">
    <button @click="resendVerification">
      Resend Verification Email
    </button>
  </div>
</template>

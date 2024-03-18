import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User, Credentials } from '@/utils'
import { isValidUsername, isValidEmail, isValidPassword } from '@/utils'
import { supabase } from '@/supabase'

export const useUsersStore = defineStore('users', () => {
  const user = ref<User | null>(null); 
  const errorMessage = ref<string>('');
  const loading = ref<boolean>(false);
  const loadingUser = ref<boolean>(false);

  const handleLogin = async (credentials: Credentials) => {
    if (!isValidEmail(credentials.email)) {
      return errorMessage.value = 'Invalid email'
    }

    if (!credentials.password.length) {
      return errorMessage.value = 'Password is required'
    }

    loading.value = true

    const loginResponse = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    })

    if (loginResponse.error) {
      loading.value = false;
      return errorMessage.value = loginResponse.error.message
    }

    const {data: loggedInUser} = await supabase
      .from('users')
      .select()
      .eq('email', credentials.email)
      .single()

    user.value = {
      id: loggedInUser.id,
      username: loggedInUser.username,
      email: loggedInUser.email
    }
    loading.value = false;
    clearErrorMessage()
  }
  
  const handleSignup = async (credentials: Credentials) => {
    const { email, password, username } = credentials
    
    if (!isValidEmail(email)) {
      return errorMessage.value = 'Invalid email'
    }

    if (!isValidPassword(password)) {
      return errorMessage.value = 'Password must be at least 6 characters long'
    }

    if (username && !isValidUsername(username)) {
      return errorMessage.value = 'Invalid username'
    }

    loading.value = true

    // Validate user exists

    const userResponse = await supabase
      .from('users')
      .select()
      .eq('username', username)
      .single()

    if (userResponse.data) {
      loading.value = false
      return errorMessage.value = 'Username already exists'
    }

    // Signup user

    const response = await supabase.auth.signUp({
      email,
      password
    })

    if (response.error) {
      loading.value = false
      return errorMessage.value = response.error.message
    }

    await supabase.from('users').insert({
      email, 
      username
    })

    const { data: newUser } = await supabase 
      .from('users')
      .select()
      .eq('email', email)
      .single()

    user.value = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    }
    
    loading.value = false;
    clearErrorMessage()

}

  const handleLogout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  const fetchUser = async () => {
    loadingUser.value = true;
    const response = await supabase.auth.getUser()

    if (!response.data) {
      loadingUser.value = false;
      return user.value = null
    }

    const { data: loggedInUser } = await supabase
      .from('users')
      .select()
      .eq('email', response.data.user?.email)
      .single()
    
    if (!loggedInUser) {
      loadingUser.value = false;
      return user.value = null
    }

    user.value = {
      id: loggedInUser.id,
      username: loggedInUser.username,
      email: loggedInUser.email
    }

    loadingUser.value = false;
  }

  const clearErrorMessage = () => {
    errorMessage.value = ''
  }


  return { user, errorMessage, loading, loadingUser, handleLogin, handleSignup, handleLogout, fetchUser, clearErrorMessage}
})

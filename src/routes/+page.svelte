<script>
  import { goto } from '$app/navigation';
  import Notification from '../components/Notification.svelte';
  import { showNotificationMessage } from '../store/notification.js';

  let email = '';
  let password = '';

  async function login() {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        showNotificationMessage('success', 'Login successful!');
        setTimeout(() => goto('/admin'), 1000); 
      } else {
        showNotificationMessage('error', 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      showNotificationMessage('error', 'Error logging in. Please try again later.');
    }
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="css/color.css" />
</svelte:head>

<nav class="navbar navbar-light bg-light bg-header">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
      <img src="images/logo.png" alt="" width="auto" height="50" />
      <span class="logo-text">Apollo Medical Center Admin</span>
    </a>
  </div>
</nav>

<div class="mainContainer">
  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-11">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="justify-content-center align-items-center row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6 mx-auto">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Admin Login</h1>
                  </div>
                  <form class="user" on:submit|preventDefault={login}>
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control form-control-user"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                        bind:value={email}
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                        bind:value={password}
                      />
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small">
                        <input type="checkbox" class="custom-control-input" id="customCheck" />
                        <label class="custom-control-label" for="customCheck"> Remember Me </label>
                      </div>
                    </div>
                    <button class="btn btn-primary btn-user btn-block" type="submit">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<Notification />

<style>
  .mainContainer {
    height: calc(100vh - 76px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #323b5d;
    background-image: linear-gradient(180deg, white 10%, #2faec0 100%);
    background-size: cover;
    font-family: 'Poppins', sans-serif;
  }

  .logo-text {
    font-size: 16px;
    color: #323b5d;
    font-weight: bold;
  }

  .bg-header {
    background: #f9f9fd;
  }

  .navbar {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }

  .container-fluid {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
</style>

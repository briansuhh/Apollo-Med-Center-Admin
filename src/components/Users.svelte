<script>
    import Topbar from './Topbar.svelte';
    import { onMount } from 'svelte';
    import Notification from './Notification.svelte';
    import { showNotificationMessage } from '../store/notification.js';
    let users = [];
  
    onMount(async () => {
      try {
        const response = await fetch('/api/readusers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
            const result = await response.json();
            users = result.data;
            showNotificationMessage('success', 'Users loaded successfully!');
        } else {
            const result = await response.json();
            showNotificationMessage('error', 'Error loading users. Please try again later.');
        }
      } catch (error) {
        showNotificationMessage('error', 'Error loading users. Please try again later.');
      }
    });
</script>

<main class="main-content">
    <Topbar />

    <div class="users-section">
        <h1>Users</h1>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Created at</th>
                    </tr>
                </thead>
                <tbody>
                    {#each users as user}
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.created_at.split('T')[0]}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</main>

<Notification />

<style>
    .main-content {
        width: 80%;
    }

    .main-content h1 {
        font-size: 24px;
        margin-bottom: 20px;
        font-family: "Poppins", sans-serif;
        font-weight: 800;
        font-style: normal;
    }

    .users-section {
        margin-top: 20px;
        padding-left: 30px;
        padding-right: 30px;
    }

    .table-wrapper {
        width: 100%;
        overflow-x: auto;
    }

    table {
        width: calc(100% + 20px); 
        border-collapse: collapse;
        margin-bottom: 20px;
    }

    th, td {
        padding: 8px;
        border: 1px solid #ccc;
        white-space: nowrap; 
    }

    th {
        background-color: #d2edef;
        font-weight: 600;
    }
    td {
        font-size: 14px;
        font-weight: 400;
    }
</style>

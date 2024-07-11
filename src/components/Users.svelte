<script>
    import Topbar from './Topbar.svelte';
    import { onMount } from 'svelte';
    import Notification from './Notification.svelte';
    import ConfirmationMessage from '../components/ConfirmationMessage.svelte';
    import { showNotificationMessage } from '../store/notification.js';

    let users = [];
    let initialUsers = [];
    let showConfirmation = false;
    let userToDelete = null;
    let input = '';

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
                initialUsers = result.data;
                showNotificationMessage('success', 'Users loaded successfully!');
            } else {
                const result = await response.json();
                showNotificationMessage('error', 'Users table is empty.');
            }
        } catch (error) {
            showNotificationMessage('error', 'Error loading users. Please try again later.');
        }
    });

    function confirmDeleteUser(id) {
        userToDelete = id;
        showConfirmation = true;
    }

    async function deleteUser() {
        if (!userToDelete) return;

        try {
            const response = await fetch(`/api/deleteuser/${userToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                users = users.filter(user => user.id !== userToDelete);
                showNotificationMessage('success', 'User deleted successfully!');
            } else {
                showNotificationMessage('error', 'Error deleting user. Please try again later.');
            }
        } catch (error) {
            showNotificationMessage('error', 'Error deleting user. Please try again later.');
        } finally {
            showConfirmation = false;
            userToDelete = null;
        }
    }

    function cancelDelete() {
        showConfirmation = false;
        userToDelete = null;
    }

    async function findUserByMatch() {
    try {
          const response = await fetch(`/api/search/user/${input}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              },
              credentials: 'include'
          });

          if (response.ok) {
              const data = await response.json(); 
              users = data.data;
          } else {
              users = initialUsers;
          }
      } catch (error) {
          showNotificationMessage('error', 'Error loading applicant data. Please try again later.');
          users = initialUsers;
      }
  }

  function resetToDefault() {
    input = '';
    users = initialUsers;
  }
</script>

<main class="main-content">
    <Topbar />

    <div class="search-match">
        <label class="label-match" for="">MATCH:</label>
        <input type="text" bind:value="{input}" class="match-input" placeholder="Find record by match">
        <button type="button" class="find-button" on:click="{findUserByMatch}">Find</button>
        <button type="button" class="find-button" on:click="{resetToDefault}">Reset</button>
    </div>

    <div class="users-section">
        <h1>Users</h1>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Actions</th>
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
                            <td>
                                <button class="delButton" on:click={() => confirmDeleteUser(user.id)}><i class="fa-solid fa-trash"></i></button>
                            </td>
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
<ConfirmationMessage
        show={showConfirmation}
        message="Are you sure you want to delete this applicant?"
        on:confirm={deleteUser}
        on:cancel={cancelDelete}
    />


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
        white-space: nowrap; 
    }

    th {
        background-color: #d5dae9;
        font-weight: 600;
    }
    td {
        font-size: 14px;
        font-weight: 400;
    }

    .delButton {
        padding-left: 10px;
        padding-right: 10px;
        border: none;
    }

    .delButton i {
        font-size: 15px;
    }

    .find-button {
        background-color: #6e7ba2;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px;
        margin-left: 10px;
        margin-right: 10px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        font-style: normal;
        width: 100px;
    }
    .match-input {
        padding: 10px;
        margin-left: 10px;
        margin-right: 10px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        font-style: normal;
        width: 170px;
    }

    .label-match {
        margin-left: 45px;
        margin-right: 10px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        font-style: normal;
    }

    .search-match {
        display: flex;
        align-items: center;
        margin-top: 20px;
    }
</style>

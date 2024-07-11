<script>
    import Topbar from './Topbar.svelte';
    import { onMount } from 'svelte';
    import Notification from './Notification.svelte';
    import ConfirmationMessage from '../components/ConfirmationMessage.svelte';
    import { showNotificationMessage } from '../store/notification.js';

    let postresidencies = [];
    let initialPostResidencies = [];
    let showConfirmation = false;
    let postResidencyToDelete = null;
    let input = '';

    onMount(async () => {
        try {
            const response = await fetch('/api/readpostres', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                postresidencies = result.data;
                initialPostResidencies = result.data;
                showNotificationMessage('success', 'Post-Residency loaded successfully!');
            } else {
                const result = await response.json();
                showNotificationMessage('error', 'Post-Residency table is empty.');
            }
        } catch (error) {
            showNotificationMessage('error', 'Error loading postresidencies. Please try again later.');
        }
    });

    function confirmDeletePostResidency(id) {
        postResidencyToDelete = id;
        showConfirmation = true;
    }

    async function deletePostResidency() {
        if (!postResidencyToDelete) return;

        try {
            const response = await fetch(`/api/deletepostres/${postResidencyToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                postresidencies = postresidencies.filter(postresidency => postresidency.postResCode !== postResidencyToDelete);
                showNotificationMessage('success', 'Post-Residency deleted successfully!');
            } else {
                showNotificationMessage('error', 'Error deleting post-residency. Please try again later.');
            }
        } catch (error) {
            showNotificationMessage('error', 'Error deleting post-residency. Please try again later.');
        } finally {
            showConfirmation = false;
            postResidencyToDelete = null;
        }
    }

    function cancelDelete() {
        showConfirmation = false;
        postResidencyToDelete = null;
    }

    async function findPostResidencyByMatch() {
    try {
          const response = await fetch(`/api/search/postres/${input}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              },
              credentials: 'include'
          });

          if (response.ok) {
              const data = await response.json(); 
                postresidencies = data.data;
          } else {
              postresidencies = initialPostResidencies;
          }
      } catch (error) {
          showNotificationMessage('error', 'Error loading applicant data. Please try again later.');
          postresidencies = initialPostResidencies;
      }
  }

  function resetToDefault() {
    input = '';
    postresidencies = initialPostResidencies;
  }
</script>


<main class="main-content">
    <Topbar />

    <div class="search-match">
        <label class="label-match" for="">MATCH:</label>
        <input type="text" bind:value="{input}" class="match-input" placeholder="Find record by match">
        <button type="button" class="find-button" on:click="{findPostResidencyByMatch}">Find</button>
        <button type="button" class="find-button" on:click="{resetToDefault}">Reset</button>
    </div>

    <div class="postresidencies-section">
        <h1>Post-Residency</h1>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Actions</th>
                        <th>Applicant ID</th>
                        <th>Post-Residency Code</th>
                        <th>Post-Residency Specialty</th>
                        <th>Post-Residency Institution</th>
                        <th>Post-Residency Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {#each postresidencies as postresidency}
                        <tr>
                            <td>
                                <button class="delButton" on:click={() => confirmDeletePostResidency(postresidency.postResCode)}><i class="fa-solid fa-trash"></i></button>
                            </td>
                            <td>{postresidency.applicantID}</td>
                            <td>{postresidency.postResCode}</td>
                            <td>{postresidency.postResSpecialty}</td>
                            <td>{postresidency.postResInstitution}</td>
                            <td>{postresidency.postResDuration}</td>
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
    message="Are you sure you want to delete this post-residency?"
    on:confirm={deletePostResidency}
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

    .postresidencies-section {
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

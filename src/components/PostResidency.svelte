<script>
    import Topbar from './Topbar.svelte';
    import { onMount } from 'svelte';
    import Notification from './Notification.svelte';
    import { showNotificationMessage } from '../store/notification.js';
    let postresidencies = [];
  
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
            showNotificationMessage('success', 'Post-Residency loaded successfully!');
        } else {
            const result = await response.json();
            showNotificationMessage('error', 'Error loading postresidencies. Please try again later.');
        }
      } catch (error) {
        showNotificationMessage('error', 'Error loading postresidencies. Please try again later.');
      }
    });
</script>

<main class="main-content">
    <Topbar />

    <div class="postresidencies-section">
        <h1>Post-Residency</h1>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
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

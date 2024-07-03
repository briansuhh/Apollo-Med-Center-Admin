<script>
    import Topbar from './Topbar.svelte';
    import { onMount } from 'svelte';
    import Notification from './Notification.svelte';
    import { showNotificationMessage } from '../store/notification.js';
    let residencies = [];
  
    onMount(async () => {
      try {
        const response = await fetch('/api/readresidency', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
            const result = await response.json();
            residencies = result.data;
            showNotificationMessage('success', 'Residency loaded successfully!');
        } else {
            const result = await response.json();
            showNotificationMessage('error', 'Error loading residencies. Please try again later.');
        }
      } catch (error) {
        showNotificationMessage('error', 'Error loading residencies. Please try again later.');
      }
    });
</script>

<main class="main-content">
    <Topbar />

    <div class="residencies-section">
        <h1>Residency</h1>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Applicant ID</th>
                        <th>Residency Code</th>
                        <th>Department Specialty</th>
                        <th>Hospital</th>
                        <th>Residency Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {#each residencies as residency}
                        <tr>
                            <td>{residency.applicantID}</td>
                            <td>{residency.residencyCode}</td>
                            <td>{residency.departmentSpecialty}</td>
                            <td>{residency.hospital}</td>
                            <td>{residency.residencyDuration}</td>
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

    .residencies-section {
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

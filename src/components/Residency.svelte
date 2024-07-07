<script>
    import Topbar from './Topbar.svelte';
    import { onMount } from 'svelte';
    import Notification from './Notification.svelte';
    import ConfirmationMessage from '../components/ConfirmationMessage.svelte';
    import { showNotificationMessage } from '../store/notification.js';

    let residencies = [];
    let showConfirmation = false;
    let residencyToDelete = null;

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
                showNotificationMessage('error', 'Residency table is empty.');
            }
        } catch (error) {
            showNotificationMessage('error', 'Error loading residencies. Please try again later.');
        }
    });

    function confirmDeleteResidency(id) {
        residencyToDelete = id;
        showConfirmation = true;
    }

    async function deleteResidency() {
        if (!residencyToDelete) return;

        try {
            const response = await fetch(`/api/deleteresidency/${residencyToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                residencies = residencies.filter(residency => residency.residencyCode !== residencyToDelete);
                showNotificationMessage('success', 'Residency deleted successfully!');
            } else {
                showNotificationMessage('error', 'Error deleting residency. Please try again later.');
            }
        } catch (error) {
            showNotificationMessage('error', 'Error deleting residency. Please try again later.');
        } finally {
            showConfirmation = false;
            residencyToDelete = null;
        }
    }

    function cancelDelete() {
        showConfirmation = false;
        residencyToDelete = null;
    }
</script>


<main class="main-content">
    <Topbar />

    <div class="residencies-section">
        <h1>Residency</h1>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Actions</th>
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
                            <td>
                                <button class="delButton" on:click={() => confirmDeleteResidency(residency.residencyCode)}><i class="fa-solid fa-trash"></i></button>
                            </td>
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
<ConfirmationMessage
    show={showConfirmation}
    message="Are you sure you want to delete this residency?"
    on:confirm={deleteResidency}
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
</style>

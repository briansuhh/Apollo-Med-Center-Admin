<script>
  import Topbar from './Topbar.svelte';
  import { onMount } from 'svelte';
  import Notification from './Notification.svelte';
  import { showNotificationMessage } from '../store/notification.js';
  import ConfirmationMessage from '../components/ConfirmationMessage.svelte';

  let applicants = [];
  let initialApplicants = [];
  let showConfirmation = false;
  let applicantToDelete = null;
  let input = '';

  onMount(async () => {
    try {
      const response = await fetch('/api/readapplicants', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
          const result = await response.json();
          applicants = result.data;
          initialApplicants = result.data; // Save the initial data
          showNotificationMessage('success', 'Applicants loaded successfully!');
      } else {
          const result = await response.json();
          showNotificationMessage('error', 'Error loading applicants. Please try again later.');
      }
    } catch (error) {
      showNotificationMessage('error', 'Error loading applicants. Please try again later.');
    }
  });

  function confirmDeleteApplicant(id) {
    applicantToDelete = id;
    showConfirmation = true;
  }

  async function deleteApplicant() {
    if (!applicantToDelete) return;

    try {
      const response = await fetch(`/api/deleteapplicant/${applicantToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the deleted applicant from the list
        applicants = applicants.filter(applicant => applicant.applicantID !== applicantToDelete);
        showNotificationMessage('success', 'Applicant deleted successfully!');
      } else {
        showNotificationMessage('error', 'Error deleting applicant. Please try again later.');
      }
    } catch (error) {
      showNotificationMessage('error', 'Error deleting applicant. Please try again later.');
    } finally {
      showConfirmation = false;
      applicantToDelete = null;
    }
  }

  function cancelDelete() {
    showConfirmation = false;
    applicantToDelete = null;
  }

  async function findApplicantByMatch() {
    try {
          const response = await fetch(`/api/search/applicant/${input}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              },
              credentials: 'include'
          });

          if (response.ok) {
              const data = await response.json(); 
              applicants = data.data;
          } else {
              applicants = initialApplicants;
          }
      } catch (error) {
          showNotificationMessage('error', 'Error loading applicant data. Please try again later.');
          applicants = initialApplicants;
      }
  }

  function resetToDefault() {
    input = '';
    applicants = initialApplicants;
  }
</script>

<main class="main-content">
    <Topbar />

      <div class="search-match">
        <label class="label-match" for="">MATCH:</label>
        <input type="text" bind:value="{input}" class="match-input" placeholder="Find record by match">
        <button type="button" class="find-button" on:click="{findApplicantByMatch}">Find</button>
        <button type="button" class="find-button" on:click="{resetToDefault}">Reset</button>
    </div>

    <div class="applicants-section">
        <h1>Applicants</h1>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Actions</th>
                        <th>Status</th>
                        <th>User ID</th>
                        <th>Applicant ID</th>
                        <th>Full Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Civil Status</th>
                        <th>Birth Date</th>
                        <th>Birth Place</th>
                        <th>Citizenship</th>
                        <th>Home Address</th>
                        <th>Telephone No</th>
                        <th>Cellphone No</th>
                        <th>Email Address</th>
                        <th>TIN No</th>
                        <th>Insurance ID Type</th>
                        <th>Insurance ID No</th>
                        <th>PHIC No</th>
                        <th>Guardian Name</th>
                        <th>Guardian Occupation</th>
                        <th>Guardian Contact No</th>
                        <th>College Attended</th>
                        <th>Degree</th>
                        <th>Year Graduated</th>
                        <th>Medical School Attended</th>
                        <th>Medical School Grad Year</th>
                        <th>Internship Institution</th>
                        <th>Internship Grad Year</th>
                    </tr>
                </thead>
                <tbody>
                    {#each applicants as applicant}
                        <tr>
                            <td>
                                <button class="delButton" on:click={() => confirmDeleteApplicant(applicant.applicantID)}><i class="fa-solid fa-trash"></i></button>
                            </td>
                            <td>{applicant.status}</td>
                            <td>{applicant.userID}</td>
                            <td>{applicant.applicantID}</td>
                            <td>{applicant.fullName}</td>
                            <td>{applicant.age}</td>
                            <td>{applicant.gender}</td>
                            <td>{applicant.civilStatus}</td>
                            <td>{applicant.birthDate.split('T')[0]}</td>
                            <td>{applicant.birthPlace}</td>
                            <td>{applicant.citizenship}</td>
                            <td>{applicant.homeAddress}</td>
                            <td>{applicant.telephoneNo}</td>
                            <td>{applicant.cellphoneNo}</td>
                            <td>{applicant.emailAddress}</td>
                            <td>{applicant.tinNo}</td>
                            <td>{applicant.insuranceIDType}</td>
                            <td>{applicant.insuranceIDNo}</td>
                            <td>{applicant.phicNo}</td>
                            <td>{applicant.guardianName}</td>
                            <td>{applicant.guardianOccupation}</td>
                            <td>{applicant.guardianContactNo}</td>
                            <td>{applicant.collegeAttended}</td>
                            <td>{applicant.degree}</td>
                            <td>{applicant.yearGraduated}</td>
                            <td>{applicant.medSchoolAttended}</td>
                            <td>{applicant.medSchoolGradYear}</td>
                            <td>{applicant.internshipInstitution}</td>
                            <td>{applicant.internshipGradYear}</td>
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
    on:confirm={deleteApplicant}
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

    .applicants-section {
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

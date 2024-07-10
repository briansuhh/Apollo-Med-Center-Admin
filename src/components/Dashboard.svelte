<script>
    import Topbar from "./Topbar.svelte";
    import { onMount } from 'svelte';

    let currentSection = 'Section1';

    function nextField() {
        if (currentSection === 'Section1') {
            currentSection = 'Section2';
        } else if (currentSection === 'Section2') {
            currentSection = 'Section3';
        } else if (currentSection === 'Section3') {
            currentSection = 'Section4';
        } else if (currentSection === 'Section4') {
            currentSection = 'Section1';
        }
    }

    function prevField() {
        if (currentSection === 'Section2') {
            currentSection = 'Section1';
        } else if (currentSection === 'Section3') {
            currentSection = 'Section2';
        } else if (currentSection === 'Section4') {
            currentSection = 'Section3';
        } else if (currentSection === 'Section1') {
            currentSection = 'Section4';
        }
    }

    let applicantCount = 0, residencyCount = 0, postResCount = 0, approvedCount = 0, deniedCount = 0, underReviewCount = 0;
    let easy1 = [], easy2 = [], easy3 = [], medium1 = [], medium2 = [], medium3 = [], medium4 = [], hard1 = [], hard2 = [], hard3 = [];
    onMount(async () => {
        try {
            const [applicantResponse, residencyResponse, postResResponse, approvedResponse, deniedResponse, underReviewResponse, easy1Response, easy2Response, easy3Response, medium1Response, medium2Response, medium3Response, medium4Response, hard1Response, hard2Response, hard3Response] = await Promise.all([
                fetch('/api/dashboard/applicantcount', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('/api/dashboard/residencycount', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('/api/dashboard/postrescount', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('/api/dashboard/approvedcount', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('/api/dashboard/deniedcount', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('/api/dashboard/underreviewcount', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('/api/dashboard/easy/1', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('/api/dashboard/easy/2', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('/api/dashboard/easy/3', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('/api/dashboard/medium/1', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('/api/dashboard/medium/2', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('/api/dashboard/medium/3', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('/api/dashboard/medium/4', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('/api/dashboard/hard/1', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('/api/dashboard/hard/2', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('/api/dashboard/hard/3', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            ]);

            if (applicantResponse.ok && residencyResponse.ok && postResResponse.ok && approvedResponse.ok && deniedResponse.ok && underReviewResponse.ok && easy1Response.ok && easy2Response.ok && easy3Response.ok && medium1Response.ok && medium2Response.ok && medium3Response.ok && medium4Response.ok && hard1Response.ok && hard2Response.ok && hard3Response.ok) {
                const applicantData = await applicantResponse.json();
                const residencyData = await residencyResponse.json();
                const postResData = await postResResponse.json();
                const approvedData = await approvedResponse.json();
                const deniedData = await deniedResponse.json();
                const underReviewData = await underReviewResponse.json();

                const easy1Data = await easy1Response.json();
                const easy2Data = await easy2Response.json();
                const easy3Data = await easy3Response.json();
                const medium1Data = await medium1Response.json();
                const medium2Data = await medium2Response.json();
                const medium3Data = await medium3Response.json();
                const medium4Data = await medium4Response.json();
                const hard1Data = await hard1Response.json();
                const hard2Data = await hard2Response.json();
                const hard3Data = await hard3Response.json();
                
                applicantCount = applicantData.data.count;
                residencyCount = residencyData.data.TotalResidencyCount;
                postResCount = postResData.data.TotalPostResidencyCount;
                approvedCount = approvedData.data.count;
                deniedCount = deniedData.data.count;
                underReviewCount = underReviewData.data.count;
                
                easy1 = easy1Data.data;
                easy2 = easy2Data.data;
                easy3 = easy3Data.data;
                medium1 = medium1Data.data;
                medium2 = medium2Data.data;
                medium3 = medium3Data.data;
                medium4 = medium4Data.data;
                hard1 = hard1Data.data;
                hard2 = hard2Data.data;
                hard3 = hard3Data.data; 
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    });
</script>

<main class="main-content">
    <Topbar />
<div class="scrollable-container">
    <section class="dashboard">
        <h1>Dashboard</h1>

        {#if currentSection === 'Section1'}
        <br>
            <div class="component-container">
                <div class="dashboard-component">
                    <div class="dashboard-border">
                        <h3>Applicant Count</h3>
                        <p class="Content">{applicantCount}</p>
                    </div>
                </div>
                <div class="dashboard-component">
                    <div class="dashboard-border">
                        <h3>Residency Count</h3>
                        <p class="Content">{residencyCount}</p>
                    </div>
                </div>
                <div class="dashboard-component">
                    <div class="dashboard-border">
                        <h3>Post residency Count</h3>
                        <p class="Content">{postResCount}</p>
                    </div>
                </div>
            </div>

            <div class="component-container">
                <div class="dashboard-component">
                    <div class="dashboard-border">
                        <h3>Approved Count</h3>
                        <p class="Content">{approvedCount}</p>
                    </div>
                </div>
                <div class="dashboard-component">
                    <div class="dashboard-border">
                        <h3>Denied Count</h3>
                        <p class="Content">{deniedCount}</p>
                    </div>
                </div>
                <div class="dashboard-component">
                    <div class="dashboard-border">
                        <h3>Under review Count</h3>
                        <p class="Content">{underReviewCount}</p>
                    </div>
                </div>
            </div>
        {/if}
        
        {#if currentSection === 'Section2'}
        <br>
            <div class="component-container">
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Applicant ID</th>
                                <th>Full name</th>
                                <th>Email address</th>  
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each easy1 as applicant}
                                <tr>
                                    <td>{applicant.applicantID}</td>
                                    <td>{applicant.fullName}</td>
                                    <td>{applicant.emailAddress}</td>
                                    <td>{applicant.status}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
                <div class="problem-description">
                    <p>Display the application ID, name, email address, and status of applicants who are under review. Sort the name in ascending order.</p>
                </div>
            </div>
            <br><br>

            <div class="component-container">
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Full name</th>
                                <th>Home address</th>  
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each easy2 as applicant}
                                <tr>
                                    <td>{applicant.fullName}</td>
                                    <td>{applicant.homeAddress}</td>
                                    <td>{applicant.age}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
                <div class="problem-description">
                    <p>Display the name, location, and age of applicants under 50 years old and residing in Makati City. Sort by names in ascending order.</p>
                </div>
            </div>

            <br><br>

            <div class="component-container">
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Applicant ID</th>
                                <th>Full name</th>  
                                <th>Age</th>
                                <th>Email address</th>
                                <th>Degree</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each easy3 as applicant}
                                <tr>
                                    <td>{applicant.applicantID}</td>
                                    <td>{applicant.fullName}</td>
                                    <td>{applicant.age}</td>
                                    <td>{applicant.emailAddress}</td>
                                    <td>{applicant.degree}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
                <div class="problem-description">
                    <p>Display the application ID, name, age, email address, and degree of applicants with a Biology degree who are 40 years or older. Sort by applicant ID in ascending order.</p>
                </div>
        </div>
            {/if}
            
            {#if currentSection === 'Section3'}
            <br>
            <div class="component-container">
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Average age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each medium1 as applicant}
                                <tr>
                                    <td>{applicant.status}</td>
                                    <td>{applicant.averageAge}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
                <div class="problem-description">
                    <p>Display the average age by status. Sort in descending order.</p>
                </div>
            </div>

            <br><br>

            <div class="component-container">
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Department specialty</th>
                                <th>Specialty count</th>  
                            </tr>
                        </thead>
                        <tbody>
                            {#each medium2 as applicant}
                                <tr>
                                    <td>{applicant.departmentSpecialty}</td>
                                    <td>{applicant.specialtyCount}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
                <div class="problem-description">
                    <p>Display the number of applicants by department specialty. Sort by specialty count, from highest to lowest.</p>
                </div>
            </div>

            <br><br>

            <div class="component-container">
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>College attended</th>
                                <th>Degree</th>  
                                <th>Number of applicants</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each medium3 as applicant}
                                <tr>
                                    <td>{applicant.collegeAttended}</td>
                                    <td>{applicant.degree}</td>
                                    <td>{applicant.numberOfApplicants}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
                <div class="problem-description">
                    <p>Count the number of applicants graduated from each university with their respective degree. </p>
                </div>
            </div>

            <br><br>

            <div class="component-container">
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Status Count</th>  
                            </tr>
                        </thead>
                        <tbody>
                            {#each medium4 as applicant}
                                <tr>
                                    <td>{applicant.status}</td>
                                    <td>{applicant.StatusCount}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
                <div class="problem-description">
                    <p>Display the sum of applications by status.</p>
                </div>
        </div>
        {/if}
        
        {#if currentSection === 'Section4'}
            <br>
            <div class="component-container">
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Applicant ID</th>
                                <th>Full name</th>
                                <th>Age</th>
                                <th>Residency count</th>
                                <th>Post-residency count</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {#each hard1 as applicant}
                                <tr>
                                    <td>{applicant.applicantID}</td>
                                    <td>{applicant.fullName}</td>
                                    <td>{applicant.age}</td>
                                    <td>{applicant.ResidencyCount}</td>
                                    <td>{applicant.PostResidencyCount}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
                <div class="problem-description">
                    <p>Display the applicant ID, name, age, residency count, and post residency count per applicant. Sort by applicant ID in ascending order.</p>
                </div>
            </div>

            <br><br>

            <div class="component-container">
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Average Post Residency Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each hard2 as applicant}
                                <tr>
                                    <td>{applicant.AvgPostResidencyCount}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
                <div class="problem-description">
                    <p>Display the total postresidency count of all applicants.</p>
                </div>
            </div>

            <br><br>

            <div class="component-container">
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Applicant ID</th>
                                <th>Full name</th>  
                                <th>Department specialty</th>
                                <th>Max residency duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each hard3 as applicant}
                                <tr>
                                    <td>{applicant.applicantID}</td>
                                    <td>{applicant.fullName}</td>
                                    <td>{applicant.departmentSpecialty}</td>
                                    <td>{applicant.max_residencyDuration}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
                <div class="problem-description">
                    <p>Display applicant ID, name, and their department specialty with the maximum residency duration.</p>
                </div>
            </div>
        {/if}
        
        <div class="nav-buttons">
            <button class="nav-button prev" on:click={prevField}><i class="fa-solid fa-arrow-left"></i></button>
            <button class="nav-button next" on:click={nextField}><i class="fa-solid fa-arrow-right"></i></button>
        </div>
    </section>
</div>
</main>

<style>
    .nav-buttons {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 20px;
        width: 75%;
        padding: 0 20px;
    }

    .nav-button {
        border-width: 0;
        font-size: 25px;
        padding: 10px 20px;
        background-color: transparent;
        cursor: pointer;
    }

    .nav-button i {
        font-size: 25px;
        color: #6e7ba2;
    }

    .nav-button i:hover {
        color: #333;
    }

    .component-container {
        display: flex;
        gap: 20px;
        justify-content: space-between;
        margin-bottom: 20px;
        width: fit-content;
    }

    .Content {
        color: black;
        font-size: 24px;
    }

    .main-content h3 {
        font-size: 20px;
        font-family: "Poppins", sans-serif;
        font-weight: 650;
        font-style: normal;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .main-content {
        width: 80%;
    }

    .main-content .dashboard {
        margin-top: 20px;
        padding-left: 30px;
        padding-right: 30px;
    }

    .main-content h1 {
        font-size: 24px;
        margin-bottom: 30px;
        font-family: "Poppins", sans-serif;
        font-weight: 800;
        font-style: normal;
        margin: auto;
        padding: auto;
    }

    .dashboard-border {
        border: solid teal;
        border-width: 3px;
        background-color: white;
        width: 120%;
        padding-top: 30px;
        padding-bottom: 40px;
        border-radius: 20px;
        text-align: center;
    }

    .main-content p {
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    .dashboard-component {
        display: flex;
        width: auto;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 20px;
    }

    .table-wrapper {
        width: calc(100% + 80px);
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
    .scrollable-container {
        overflow-y: auto;
        height: 80%;
        width: 100%;
    }
    .problem-description {
        padding: 20px;
        background-color: #ffffff;
        border-radius: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: fit-content;
    }
    .problem-description p {
        font-size: 15px;
        font-weight: 400;
        font-style: normal;
        text-align: center;
    }
</style>

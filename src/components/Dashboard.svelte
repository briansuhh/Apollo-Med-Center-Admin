<script>
    import Topbar from "./Topbar.svelte";

    let currentSection = 'Section1';

    function nextField() {
        if (currentSection === 'Section1') {
            currentSection = 'Section2';
        } else if (currentSection === 'Section2') {
            currentSection = 'Section3';
        } else if (currentSection === 'Section3') {
            currentSection = 'Section4';
        } else if (currentSection === 'Section4') {
            currentSection = 'Section5';
        } else if (currentSection === 'Section5') {
            currentSection = 'Section6';
        } else if (currentSection === 'Section6') {
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
        } else if (currentSection === 'Section5') {
            currentSection = 'Section4';
        } else if (currentSection === 'Section6') {
            currentSection = 'Section5';
        } else if (currentSection === 'Section1') {
            currentSection = 'Section6';
        }
    }
</script>

<main class="main-content">
    <Topbar />
    <section class="dashboard">
        <h1>Dashboard</h1>

        {#if currentSection === 'Section1'}
            <div class="component-container">
                <div class="dashboard-component">
                    <div class="dashboard-border">
                        <h3>Applicant Count</h3>
                        <p class="Content">Accomplished</p>
                    </div>
                </div>
                <div class="dashboard-component">
                    <div class="dashboard-border">
                        <h3>Applicant Count</h3>
                        <p class="Content">Accomplished</p>
                    </div>
                </div>
                <div class="dashboard-component">
                    <div class="dashboard-border">
                        <h3>Applicant Count</h3>
                        <p class="Content">Accomplished</p>
                    </div>
                </div>
            </div>

            <div class="component-container">
                <div class="dashboard-component">
                    <div class="dashboard-border">
                        <h3>Applicant Count</h3>
                        <p class="Content">Accomplished</p>
                    </div>
                </div>
                <div class="dashboard-component">
                    <div class="dashboard-border">
                        <h3>Applicant Count</h3>
                        <p class="Content">Accomplished</p>
                    </div>
                </div>
                <div class="dashboard-component">
                    <div class="dashboard-border">
                        <h3>Applicant Count</h3>
                        <p class="Content">Accomplished</p>
                    </div>
                </div>
            </div>
        {/if}
        
        {#if currentSection === 'Section2'}
            <div class="component-container">
                <!-- Section 2 content here -->
                <p>Section 2 Content</p>
            </div>
        {/if}
        
        {#if currentSection === 'Section3'}
            <div class="component-container">
                <!-- Section 3 content here -->
                <p>Section 3 Content</p>
            </div>
        {/if}
        
        {#if currentSection === 'Section4'}
            <div class="component-container">
                <!-- Section 4 content here -->
                <p>Section 4 Content</p>
            </div>
        {/if}

        {#if currentSection === 'Section5'}
            <div class="component-container">
                <!-- Section 5 content here -->
                <p>Section 5 Content</p>
            </div>
        {/if}

        {#if currentSection === 'Section6'}
            <div class="component-container">
                <!-- Section 6 content here -->
                <p>Section 6 Content</p>
            </div>
        {/if}

        <div class="nav-buttons">
            <button class="nav-button prev" on:click={prevField}><i class="fa-solid fa-arrow-left"></i></button>
            <button class="nav-button next" on:click={nextField}><i class="fa-solid fa-arrow-right"></i></button>
        </div>
    </section>
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

    .next {
        border-width: 0;
        font-size: 25px;
        margin-top: 20px;
        padding-left: 25px;
        padding-right: 25px;
    }

    .next i {
        border-width: 0;
        font-size: 25px;
        color: #6e7ba2;
    }

    .next i:hover {
        border-width: 0;
        font-size: 25px;
        color: #333;
    }

    .component-container {
        display: flex;
        justify-content: center;
        gap: 30vh;
    }

    .Content {
        color: black; /* Custom color for "Accomplished" */
        font-size: 24px;
    }

    .main-content h3 {
        font-size: 22px;
        font-family: "Poppins", sans-serif;
        font-weight: 800;
        font-style: normal;
    }

    .main-content {
        width: 80%;
    }

    .main-content .dashboard {
        margin-top: 20px;
        padding-left: 30px;
    }

    .main-content h1 {
        font-size: 24px;
        margin-bottom: 30px;
        font-family: "Poppins", sans-serif;
        font-weight: 800;
        font-style: normal;
    }

    .dashboard-border {
        border: solid teal; /* Border style with width and color */
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
        font-size: 20px;
    }

    .dashboard-component {
        display: flex;
        width: auto;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 20px;
    }
</style>

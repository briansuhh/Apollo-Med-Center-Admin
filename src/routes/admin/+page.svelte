<script>
    import Sidebar from '../../components/Sidebar.svelte';
    import { pagename } from '../../store/page.js'; 
    import Applicants from '../../components/Applicants.svelte';
</script>
  
<div class="mainbox">
    <div class="box">
        <Sidebar />
        {#if $pagename == "Dashboard"}
            <!-- <Dashboard /> -->
        {:else if $pagename === "New Applicant"}
            <!-- <ApplicationForm /> -->
        {:else if $pagename === "Applicants"}
            <Applicants />
        {:else if $pagename === "About Us"}
            <!-- as -->
        {/if}
    </div>
</div>

<style>
    /* this acts as the body */
  .mainbox {
    margin: 0;
    padding: 0;
    display: flex;  
    height: 100vh;
    background-color: #f0f2f5;
    overflow: hidden;
  }

  /* this is the container */
  .box {
    display: flex;
    width: 100%;
  } 
</style>

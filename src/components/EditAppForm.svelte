<script>
    import Topbar from "./Topbar.svelte";
    import { currentSection } from '../store/applicationPart.js';
    import { onMount } from 'svelte';
    import { showNotificationMessage } from '../store/notification.js';
    import Notification from './Notification.svelte';
    import ConfirmationMessage from "./ConfirmationMessage.svelte";

    let applicant = {
        fullName: '',
        firstName: '',
        middleName: '',
        lastName: '',
        age: '',
        gender: '',
        civilStatus: '',
        birthDate: '',
        birthPlace: '',
        citizenship: '',
        homeAddress: '',
        telephoneNo: '',
        cellphoneNo: '',
        emailAddress: '',
        tinNo: '',
        insuranceIDType: '',
        insuranceIDNo: '',
        phicNo: '',
        guardianName: '',
        guardianOccupation: '',
        guardianContactNo: '',
        collegeAttended: '',
        degree: '',
        yearGraduated: '',
        medSchoolAttended: '',
        medSchoolGradYear: '',
        internshipInstitution: '',
        internshipGradYear: '',
        departmentSpecialty: '',
        hospital: '',
        residencyDuration: '',
        postResSpecialty: '',
        postResInstitution: '',
        postResDuration: '',
        departmentSpecialties: [],
        postDepartmentSpecialties: [],
        user_id: ''
    };

    let citizenship_list = [
        'Afghan',
        'Albanian',
        'Algerian',
        'American',
        'Andorran',
        'Angolan',
        'Antiguan',
        'Argentine',
        'Armenian',
        'Australian',
        'Austrian',
        'Azerbaijani',
        'Bahamian',
        'Bahraini',
        'Bangladeshi',
        'Barbadian',
        'Belarusian',
        'Belgian',
        'Belizean',
        'Beninese',
        'Bhutanese',
        'Bolivian',
        'Bosnian',
        'Botswanan',
        'Brazilian',
        'Bruneian',
        'Bulgarian',
        'Burkinabe',
        'Burundian',
        'Cambodian',
        'Cameroonian',
        'Canadian',
        'Cape Verdean',
        'Central African',
        'Chadian',
        'Chilean',
        'Chinese',
        'Colombian',
        'Comoran',
        'Congolese',
        'Costa Rican',
        'Croatian',
        'Cuban',
        'Cypriot',
        'Czech',
        'Danish',
        'Djiboutian',
        'Dominican',
        'Dutch',
        'East Timorese',
        'Ecuadorian',
        'Egyptian',
        'Emirati',
        'English',
        'Equatoguinean',
        'Eritrean',
        'Estonian',
        'Ethiopian',
        'Fijian',
        'Filipino',
        'Finnish',
        'French',
        'Gabonese',
        'Gambian',
        'Georgian',
        'German',
        'Ghanaian',
        'Greek',
        'Grenadian',
        'Guatemalan',
        'Guinean',
        'Guyanese',
        'Haitian',
        'Honduran',
        'Hungarian',
        'Icelander',
        'Indian',
        'Indonesian',
        'Iranian',
        'Iraqi',
        'Irish',
        'Israeli',
        'Italian',
        'Ivorian',
        'Jamaican',
        'Japanese',
        'Jordanian',
        'Kazakhstani',
        'Kenyan',
        'Kittitian',
        'Kosovar',
        'Kuwaiti',
        'Kyrgyzstani',
        'Laotian',
        'Latvian',
        'Lebanese',
        'Liberian',
        'Libyan',
        'Liechtensteiner',
        'Lithuanian',
        'Luxembourger',
        'Malagasy',
        'Malawian',
        'Malaysian',
        'Maldivian',
        'Malian',
        'Maltese',
        'Marshallese',
        'Mauritanian',
        'Mauritian',
        'Mexican',
        'Micronesian',
        'Moldovan',
        'Monegasque',
        'Mongolian',
        'Montenegrin',
        'Moroccan',
        'Mozambican',
        'Namibian',
        'Nauruan',
        'Nepali',
        'New Zealander',
        'Nicaraguan',
        'Nigerien',
        'Nigerian',
        'Ni-Vanuatu',
        'North Korean',
        'North Macedonian',
        'Norwegian',
        'Omani',
        'Pakistani',
        'Palauan',
        'Palestinian',
        'Panamanian',
        'Papua New Guinean',
        'Paraguayan',
        'Peruvian',
        'Polish',
        'Portuguese',
        'Qatari',
        'Rwandan',
        'Saint Lucian',
        'Salvadoran',
        'Samoan',
        'Sammarinese',
        'Saudi',
        'Scottish',
        'Senegalese',
        'Serbian',
        'Seychellois',
        'Sierra Leonean',
        'Singaporean',
        'Slovak',
        'Slovenian',
        'Solomon Islander',
        'Somali',
        'South African',
        'South Korean',
        'South Sudanese',
        'Spanish',
        'Sri Lankan',
        'Sudanese',
        'Surinamese',
        'Swazi',
        'Swedish',
        'Swiss',
        'Syrian',
        'Taiwanese',
        'Tajikistani',
        'Tanzanian',
        'Thai',
        'Togolese',
        'Tongan',
        'Trinidadian',
        'Tunisian',
        'Turkish',
        'Turkmen',
        'Tuvaluan',
        'Ugandan',
        'Ukrainian',
        'Uruguayan',
        'Uzbekistani',
        'Vatican',
        'Venezuelan',
        'Vietnamese',
        'Welsh',
        'Yemeni',
        'Zambian',
        'Zimbabwean',
    ];

    // let applicant.user_id;
    let nextId = 0; 
    let postNextId = 0;

    function showSect1() {
      currentSection.set('Section1');
      console.log('Section 1 Test');
    }
  
    function showSect2() {
      currentSection.set('Section2');
      console.log('Section 2 Test');
    }
  
    function showSect3() {
      currentSection.set('Section3');
      console.log('Section 3 Test');
    }
  
    function showSect4() {
      currentSection.set('Section4');
      console.log('Section 4 Test');
    }

    function nextField() {
      if ($currentSection === 'Section1') {
        showSect2()
      }
      else if ($currentSection === 'Section2') {
        showSect3()
      }
      else if ($currentSection === 'Section3') {
        showSect4()
      }
    }

    function prevField() {
      if ($currentSection === 'Section2') {
        showSect1()
      }
      else if ($currentSection === 'Section3') {
        showSect2()
      }
      else if ($currentSection === 'Section4') {
        showSect3()
      }
    }

    async function fetchData() {
        try {
            const response = await fetch(`/api/readapplicants/${applicant.user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.user) {
                    applicant.fullName = data.user.fullName;
                    splitFullName();
                    applicant.age = data.user.age;
                    applicant.gender = data.user.gender;
                    applicant.civilStatus = data.user.civilStatus;
                    applicant.birthDate = formatDate(data.user.birthDate);
                    applicant.birthPlace = data.user.birthPlace;
                    applicant.citizenship = data.user.citizenship;
                    applicant.homeAddress = data.user.homeAddress;
                    applicant.telephoneNo = data.user.telephoneNo;
                    applicant.cellphoneNo = data.user.cellphoneNo;
                    applicant.emailAddress = data.user.emailAddress;
                    applicant.tinNo = data.user.tinNo;
                    applicant.insuranceIDType = data.user.insuranceIDType;
                    applicant.insuranceIDNo = data.user.insuranceIDNo;
                    applicant.phicNo = data.user.phicNo;
                    applicant.guardianName = data.user.guardianName;
                    applicant.guardianOccupation = data.user.guardianOccupation;
                    applicant.guardianContactNo = data.user.guardianContactNo;
                    applicant.collegeAttended = data.user.collegeAttended;
                    applicant.degree = data.user.degree;
                    applicant.yearGraduated = data.user.yearGraduated;
                    applicant.medSchoolAttended = data.user.medSchoolAttended;
                    applicant.medSchoolGradYear = data.user.medSchoolGradYear;
                    applicant.internshipInstitution = data.user.internshipInstitution;
                    applicant.internshipGradYear = data.user.internshipGradYear;
                    showNotificationMessage('success', 'Saved data loaded successfully');
                } else {
                    resetApplicant();
                }
            } else {
                resetApplicant();
                showNotificationMessage('error', 'User does not have any data');
            }
        } catch (error) {
            resetApplicant();
            showNotificationMessage('error', 'User does not have any data');
        }
    }

    function resetApplicant() {
        applicant = {
            fullName: '',
            firstName: '',
            middleName: '',
            lastName: '',
            age: '',
            gender: '',
            civilStatus: '',
            birthDate: '',
            birthPlace: '',
            citizenship: '',
            homeAddress: '',
            telephoneNo: '',
            cellphoneNo: '',
            emailAddress: '',
            tinNo: '',
            insuranceIDType: '',
            insuranceIDNo: '',
            phicNo: '',
            guardianName: '',
            guardianOccupation: '',
            guardianContactNo: '',
            collegeAttended: '',
            degree: '',
            yearGraduated: '',
            medSchoolAttended: '',
            medSchoolGradYear: '',
            internshipInstitution: '',
            internshipGradYear: '',
            departmentSpecialty: '',
            hospital: '',
            residencyDuration: '',
            postResSpecialty: '',
            postResInstitution: '',
            postResDuration: '',
            departmentSpecialties: [],
            postDepartmentSpecialties: [],
            user_id: ''
        };
    }

    const splitFullName = () => {
        const [firstName, middleName, lastName] = applicant.fullName.split(' ');
        applicant.firstName = firstName;
        applicant.middleName = middleName;
        applicant.lastName = lastName;
    }

    const formatDate = (dateParam) => {
        return dateParam.split('T')[0];
    }

    // Update the full name when first name, middle name, or last name changes
    $: applicant.fullName = `${applicant.firstName} ${applicant.middleName} ${applicant.lastName}`.trim();

    async function findApplicant() {
        await fetchData(); // Fetch data with updated applicant.user_id
        await fetchResidencyData();
        await fetchPostResidencyData();
    }

  

    const addDepartmentSpecialty = () => {
        applicant.departmentSpecialties = [
            ...applicant.departmentSpecialties,
            { id: nextId++, departmentSpecialty: '', hospital: '', residencyDuration: '' }
        ];
    };

    async function fetchResidencyData() {
        try {
            const response = await fetch(`/api/readresidency/${applicant.user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                if (data.user && Array.isArray(data.user)) {
                    applicant.departmentSpecialties = data.user.map((item, index) => ({
                        id: nextId++,
                        departmentSpecialty: item.departmentSpecialty,
                        hospital: item.hospital,
                        residencyDuration: item.residencyDuration
                    }));
                } else {
                    applicant.departmentSpecialties = [];
                }
            } else {
                applicant.departmentSpecialties = [];
            }
        } catch (error) {
            applicant.departmentSpecialties = [];
            showNotificationMessage('error', 'Error fetching residency data. Please try again later.');
        }
    }

    const addPostDepartmentSpecialty = () => {
        applicant.postDepartmentSpecialties = [
            ...applicant.postDepartmentSpecialties,
            { id: postNextId++, postResSpecialty: '', postResInstitution: '', postResDuration: '' }
        ];
    };

    async function fetchPostResidencyData() {
        try {
            const response = await fetch(`/api/readpostres/${applicant.user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();

                if (data.user && Array.isArray(data.user)) {
                    applicant.postDepartmentSpecialties = data.user.map(item => ({
                        id: nextId++,
                        postResSpecialty: item.postResSpecialty,
                        postResInstitution: item.postResInstitution,
                        postResDuration: item.postResDuration
                    }));
                } else {
                    applicant.postDepartmentSpecialties = [];
                }
            } else {
                applicant.postDepartmentSpecialties = [];
            }
        } catch (error) {
            applicant.postDepartmentSpecialties = [];
            showNotificationMessage('error', 'Error fetching post-residency data. Please try again later.');
        }
    }

    async function registerApplicant() {
        try {
            const response = await fetch('/api/submitappinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(applicant)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Application form registration successful, your response will be reviewed by our staff');
                showConfirmation3 = false;
            } else {
                const error = await response.json();
                alert(`Application form registration failed: ${error.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration');
        }
    }

    //confirmation of delete code heree =====
    // State variables
    let showConfirmation = false;
    let specialtyToDeleteIndex = null;
    let showConfirmation2 = false;
    let specialtyToDeleteIndex2 = null;

    // Function to confirm deletion
    function confirmDeleteApplicant(index) {
        specialtyToDeleteIndex = index;
        showConfirmation = true;
    }


    function deleteDepartmentSpecialty(index) {
            applicant.departmentSpecialties = applicant.departmentSpecialties.filter((_, i) => i !== index);
        };

    // Function to delete the applicant with confirmation
    async function deleteApplicant() {
    if (specialtyToDeleteIndex === null) return;

    try {
        deleteDepartmentSpecialty(specialtyToDeleteIndex);
        showNotificationMessage('success', 'Specialty deleted successfully!');
    } catch (error) {
        showNotificationMessage('error', 'Error deleting specialty. Please try again later.');
    } finally {
        showConfirmation = false;
        specialtyToDeleteIndex = null;
    }
    }

    function cancelDeleteRes() {
    showConfirmation = false;
    specialtyToDeleteIndex = null;
    }

    function confirmDeleteApplicantPost(index) {
    specialtyToDeleteIndex2 = index;
    showConfirmation2 = true;
    }

    // Function to delete the specialty
    function deletePostDepartmentSpecialty(index) {
    applicant.postDepartmentSpecialties = applicant.postDepartmentSpecialties.filter((_, i) => i !== index);
    // Optionally handle success or error messages here if needed
    }


    async function deleteApplicantPost() {
    if (specialtyToDeleteIndex2 === null) return;

    try {
        deletePostDepartmentSpecialty(specialtyToDeleteIndex2);
        showNotificationMessage('success', 'Specialty deleted successfully!');
    } catch (error) {
        showNotificationMessage('error', 'Error deleting specialty. Please try again later.');
    } finally {
        showConfirmation2 = false;
        specialtyToDeleteIndex2 = null;
    }
    }

    function cancelDeletePost() {
    showConfirmation2 = false;
    specialtyToDeleteIndex2 = null;
    }

    let showConfirmation3 = false;

    function confirmRegistration() {
    showConfirmation3 = true;
    }

    function cancelSubmit() {
    showConfirmation3 = false;
    }

    async function approveApplicant() {
        const response = await fetch(`/api/approveapplicant/${applicant.user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            showNotificationMessage('success', 'Applicant approved successfully!');
        } else {
            showNotificationMessage('error', 'Error approving applicant. Please try again later.');
        }
    }
    
    async function denyApplicant() {
        const response = await fetch(`/api/denyapplicant/${applicant.user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            showNotificationMessage('success', 'Applicant denied successfully!');
        } else {
            showNotificationMessage('error', 'Error denying applicant. Please try again later.');
        }
    }
</script>

<div class="form-container">
    <Topbar />

    <!-- the input of this should be put on the variable applicant.user_id on the script-->
     <div class="input-user-id">
         <label class="label-user" for="">USER ID:</label>
         <input type="text" bind:value="{applicant.user_id}" class="user-input" placeholder="Enter User ID" />
         <button type="button" class="find-button" on:click="{findApplicant}">Find</button>
     </div>
     
    <!-- Form Navigator -->
    <div class="sectNav">
    
        <div class="center-buttons">
            <button class="next" on:click={prevField}><i class="fa-solid fa-arrow-left"></i></button>
            <button class="nav-button {$currentSection === 'Section1' ? 'active' : ''}" on:click={showSect1}>Personal Information</button>
            <button class="nav-button {$currentSection === 'Section2' ? 'active' : ''}" on:click={showSect2}>Educational Background</button>
            <button class="nav-button {$currentSection === 'Section3' ? 'active' : ''}" on:click={showSect3}>Residency</button>
            <button class="nav-button {$currentSection === 'Section4' ? 'active' : ''}" on:click={showSect4}>Post Residency</button>
            <button class="next" on:click={nextField}><i class="fa-solid fa-arrow-right"></i></button>
        </div>
        <button class="submit" on:click={() => confirmRegistration()}><i class="fa-solid fa-arrow-up-right-from-square"></i><p>Submit</p></button>
    </div>
    <div class="sectionContent">
      {#if $currentSection === 'Section1'}
        <div class="formContainer">
            <form>
                <fieldset>
                    <legend>PERSONAL INFORMATION</legend>
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input type="text" id="firstName" bind:value={applicant.firstName} placeholder="Enter First Name">
                        <label for="middleName">Middle Name</label>
                        <input type="text" id="middleName" bind:value={applicant.middleName} placeholder="Enter Middle Name">
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" bind:value={applicant.lastName} placeholder="Enter Last Name">
                    </div>
                    <div class="form-group">
                        <label for="age">Age</label>
                        <input type="number" id="age" bind:value={applicant.age} placeholder="Enter Age">
                        <label for="birthdate">Birthdate</label>
                        <input type="date" id="birthdate" bind:value={applicant.birthDate} placeholder="Enter Birthdate">
                        <label for="birthplace">Birthplace</label>
                        <input type="text" id="birthplace" bind:value={applicant.birthPlace} placeholder="Enter Birthplace">
                    </div>
                    <div class="form-group">
                        <label for="gender">Gender</label>
                        <select id="options" name="options" bind:value={applicant.gender}>
                            <option value="" disabled selected>Select your gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>
                        <label for="civilStatus">Civil Status</label>
                        <select id="options2" name="options2" bind:value={applicant.civilStatus}>
                            <option value="" disabled selected>Select your civil status</option>
                            <option value="S">Single</option>
                            <option value="M">Married</option>
                            <option value="W">Widowed</option>
                            <option value="D">Divorced</option>
                        </select>
                        <label for="citizenship">Citizenship</label>
                        <select bind:value={applicant.citizenship}>
                            <option value="" disabled selected>Select your citizenship</option>
                            {#each citizenship_list as item}
                                <option value={item}>{item}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="homeAddress">Home Address</label>
                        <input type="text" id="homeAddress" bind:value={applicant.homeAddress} placeholder="Enter Home Address">
                        <label for="telephoneNo">Telephone No.</label>
                        <input type="tel" id="telephoneNo" bind:value={applicant.telephoneNo} placeholder="000-0000">
                        <label for="cellphoneNo">Cellphone No.</label>
                        <input type="tel" id="cellphoneNo" bind:value={applicant.cellphoneNo} placeholder="+63 000 000 0000">
                    </div>
                    <div class="form-group">
                        <label for="insuranceIDType">Insurance ID Type</label>
                        <select bind:value={applicant.insuranceIDType} placeholder="Select your insurance ID type">
                            <option value="" disabled selected>Select your insurance ID type</option>
                            <option value="GSIS">GSIS</option>
                            <option value="SSS">SSS</option>
                        </select>
                        <label for="email">Email Address</label>
                        <input type="email" id="email" bind:value={applicant.emailAddress} placeholder="example@gmail.com">
                        <label for="tinNo">TIN No.</label>
                        <input type="text" id="tinNo" bind:value={applicant.tinNo} placeholder="000-000-000-000">
                    </div>
                    <div class="form-group">
                        <label for="insuranceIDNo">Insurance ID No.</label>
                        <input type="text" id="insuranceIDNo" bind:value={applicant.insuranceIDNo} placeholder="Enter Insurance ID No.">
                        <label for="phicNo">Phic No.</label>
                        <input type="text" id="phicNo" bind:value={applicant.phicNo} placeholder="00-000000000-0">
                    </div>
                    <div class="form-group">
                        <label for="guardianName">Guardian Name</label>
                        <input type="text" id="guardianName" bind:value={applicant.guardianName} placeholder="Enter Guardian Name">
                        <label for="guardianContactNo">Guardian Contact No.</label>
                        <input type="tel" id="guardianContactNo" bind:value={applicant.guardianContactNo} placeholder="Enter Guardian Contact No.">
                        <label for="guardianOccupation">Guardian Occupation</label>
                        <input type="text" id="guardianOccupation" bind:value={applicant.guardianOccupation} placeholder="Enter Guardian Occupation">
                    </div>
                </fieldset>
            </form>
        </div>
      {:else if $currentSection === 'Section2'}
        <div class="formContainer">
            <form>
                <fieldset>
                    <legend>EDUCATIONAL BACKGROUND</legend>
                    <div class="form-group">
                        <label for="collegeAttended">College Attended</label>
                        <input type="text" id="collegeAttended" bind:value={applicant.collegeAttended} placeholder="Enter College Attended">
                        <label for="degree">Degree</label>
                        <input type="text" id="degree" bind:value={applicant.degree} placeholder="Enter Degree">
                        <label for="yearGraduated">Year Graduated</label>
                        <input type="number" id="yearGraduated" bind:value={applicant.yearGraduated} placeholder="Enter Year Graduated">
                    </div>
                    <div class="form-group">
                        <label for="medicalSchool">Medical School Attended</label>
                        <input type="text" id="medicalSchool" bind:value={applicant.medSchoolAttended} placeholder="Enter Medical School Attended">
                        <label for="medYearGraduated">Year Graduated</label>
                        <input type="number" id="medYearGraduated" bind:value={applicant.medSchoolGradYear} placeholder="Enter Year Graduated">
                    </div>
                    <div class="form-group">
                        <label for="internshipInstitution">Internship Institution</label>
                        <input type="text" id="internshipInstitution" bind:value={applicant.internshipInstitution} placeholder="Enter Internship Institution">
                        <label for="internYearGraduated">Year Graduated</label>
                        <input type="number" id="internYearGraduated" bind:value={applicant.internshipGradYear} placeholder="Enter Year Graduated">
                    </div>
                </fieldset>
            </form>
        </div>
      {:else if $currentSection === 'Section3'}
        <div class="formContainer">
            <form>
                <fieldset>
                    <legend>RESIDENCY INFORMATION</legend>
                    <div class="formLabel">
                        <button type="button" on:click={addDepartmentSpecialty}>+ Add Specialty</button>
                    </div>
        
                    {#each applicant.departmentSpecialties as specialty, index}
                        <div class="form-group" key={specialty.id}>
                            <label for={`departmentSpecialty_${index}`}>Department Specialty</label>
                            <input type="text" id={`departmentSpecialty_${index}`} bind:value={specialty.departmentSpecialty} placeholder="Enter Specialty">
                            <label for={`hospital_${index}`}>Hospital</label>
                            <input type="text" id={`hospital_${index}`} bind:value={specialty.hospital} placeholder="Enter Institution">
                            <label for={`residencyDuration_${index}`}>Duration (year)</label>
                            <input type="number" id={`residencyDuration_${index}`} bind:value={specialty.residencyDuration} placeholder="Enter Year Duration">
                            <button class="delButton" type="button" on:click={() => confirmDeleteApplicant(index)}>
                              <i class="fa-solid fa-trash"></i>
                            </button>
                            
                            
                        </div>
                    {/each}
        
                </fieldset>
            </form>
        </div>
      {:else if $currentSection === 'Section4'}
        <div class="formContainer">
            <form>
                <fieldset>
                    <legend>POST RESIDENCY INFORMATION</legend>
                    <div class="formLabel">
                        <button type="button" on:click={addPostDepartmentSpecialty}>+ Add Specialty</button>
                    </div>
        
                    {#each applicant.postDepartmentSpecialties as specialty, index}
                        <div class="form-group" key={specialty.id}>
                            <label for={`postResSpecialty_${index}`}>Post Residency Specialty</label>
                            <input type="text" id={`postResSpecialty_${index}`} bind:value={specialty.postResSpecialty} placeholder="Enter Sub-Specialty">
                            <label for={`postResInstitution_${index}`}>Post Residency Institution</label>
                            <input type="text" id={`postResInstitution_${index}`} bind:value={specialty.postResInstitution} placeholder="Enter Institution">
                            <label for={`postResDuration_${index}`}>Post Residency Duration</label>
                            <input type="number" id={`postResDuration_${index}`} bind:value={specialty.postResDuration} placeholder="Enter Year Duration">
                            <button class="delButton" type="button" on:click={() => confirmDeleteApplicantPost(index)}>
                              <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    {/each}
                </fieldset>
            </form>
        </div>
      {/if}
    </div>
    <div class="buttons-center">
        <button type="button" class="approve-button" on:click="{approveApplicant}">Approve</button>
        <button type="button" class="deny-button" on:click="{denyApplicant}">Deny</button>
    </div>
  </div>
  
<Notification />
<ConfirmationMessage
  show={showConfirmation}
  message="Are you sure you want to delete this specialty?"
  on:confirm={deleteApplicant}
  on:cancel={cancelDeleteRes}
/>

<ConfirmationMessage
  show={showConfirmation2}
  message="Are you sure you want to delete this specialty?"
  on:confirm={deleteApplicantPost}
  on:cancel={cancelDeletePost}
/>

<ConfirmationMessage
  show={showConfirmation3}
  message="Are you sure you want to submit your information?"
  on:confirm={registerApplicant}
  on:cancel={cancelSubmit}
/>



  <style>
    .sectNav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .center-buttons {
        display: flex;
        justify-content: center;
        flex-grow: 1;
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

    .submit {
        display: flex;
        border-width: 0px;
        border-radius: 10px;
        border-color: #6e7ba2;
        padding-top: 4px;
        padding-bottom: 4px;
        margin-top: 30px;
        margin-left: auto;
        margin-right: 50px;
    }

    .submit:hover > i, .submit:hover > p{
        color: #333;
    }

    .submit p {
        font-size: 24px;
        margin-left: 10px;
        font-family: "Poppins", sans-serif;
        font-size: 16px;
        font-weight: 700;
        font-style: normal;
        color: #6e7ba2;
    }

    .submit i{
        border-width: 0;
        font-size: 25px;
        color: #6e7ba2;
    }

    .next i:hover {
        border-width: 0;
        font-size: 25px;
        color: #333;
    }

    .nav-button {
        padding: 10px;
        margin-top: 20px;
        margin-left: 10px;
        margin-right: 10px;
        border-width: 3px;
        border-radius: 7px;
        font-family: "Poppins", sans-serif;
        font-size: 14px;
        font-weight: 700;
        font-style: normal;
        background-color: white;
        border: 2px solid transparent;
        color: #6e7ba2; 
        border-color: #6e7ba2; 
    }

    .nav-button.active {
        color: #333;
        border-color: #333;
    }

    .nav-button:hover {
    color: rgb(109, 109, 0);
    border-color: yellow;
    }
    .form-container {
        display: flex;
        flex-direction: column;
        height: 100vh; /* Adjust as needed */
        width: 80%;
    }

    .formContainer {
        margin-left: 40px;
        margin-right: 40px;
    }

    .formContainer fieldset {
        border-radius: 15px;
        margin-top: 20px;
        border-width: 1.6px;
        background-color: white;
    }

    .formContainer legend {
        text-align: center;
        padding: 0 15px;
        font-size: 22px;
        font-weight: bold;
        color: #333;
        margin-left: 15px;
        font-family: "Poppins", sans-serif;
        font-weight: 700;
        font-style: normal;
    }

    .form-group {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin: 20px 20px 20px 20px;
    }

    .form-group input {
        flex: 1 1 15%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    .form-group select {
        flex: 1 1 20%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    .form-group label {
        flex: 1 1 10%;
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-style: normal;
    }
  
    .sectionContent {
        flex: 1;
        overflow-y: auto;
    }

    .formLabel {
        display: flex;
        align-items: center;
        margin-left: 20px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        font-style: normal;
        font-size: 16px;
    }

    .formLabel button {
        margin-left: auto;
        margin-right: 20px;
        font-size: 15px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        font-style: normal;
        padding: 10px;
    }

    .delButton {
        padding-left: 10px;
        padding-right: 10px;
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

    .approve-button {
        background-color: teal;
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
    .deny-button {
        background-color: rgb(255, 68, 0);
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

    .user-input {
        padding: 10px;
        margin-left: 10px;
        margin-right: 10px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        font-style: normal;
        width: 150px;
    }

    .label-user {
        margin-left: 45px;
        margin-right: 10px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        font-style: normal;
    }

    .input-user-id {
        display: flex;
        align-items: center;
        margin-top: 20px;
    }


    .buttons-center {
        display: flex;
        justify-content: center;
        margin-bottom: 45px;
    }

    
</style>

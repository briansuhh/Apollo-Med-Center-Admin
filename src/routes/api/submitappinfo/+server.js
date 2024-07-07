import { verifyToken } from "$lib/auth";
import pool from "$lib/db";
import { parse } from "cookie";

export async function POST({ request }) {
    const {
        fullName,
        age,
        gender,
        civilStatus,
        birthDate,
        birthPlace,
        citizenship,
        homeAddress,
        telephoneNo,
        cellphoneNo,
        emailAddress,
        tinNo,
        insuranceIDType,
        insuranceIDNo,
        phicNo,
        guardianName,
        guardianOccupation,
        guardianContactNo,
        collegeAttended,
        degree,
        yearGraduated,
        medSchoolAttended,
        medSchoolGradYear,
        internshipInstitution,
        internshipGradYear,
        departmentSpecialties = [],
        postDepartmentSpecialties = [],
        user_id
    } = await request.json();

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [existingApplicant] = await connection.execute(
            `SELECT applicantID FROM applicant WHERE userID = ?`,
            [user_id]
        );

        let applicantID;

        if (existingApplicant.length > 0) {
            applicantID = existingApplicant[0].applicantID;
            await connection.execute(
                `UPDATE applicant SET
                    fullName = ?, age = ?, gender = ?, civilStatus = ?, birthDate = ?, birthPlace = ?, citizenship = ?, homeAddress = ?, telephoneNo = ?, cellphoneNo = ?, emailAddress = ?, tinNo = ?, insuranceIDType = ?, insuranceIDNo = ?, phicNo = ?, guardianName = ?, guardianOccupation = ?, guardianContactNo = ?, collegeAttended = ?, degree = ?, yearGraduated = ?, medSchoolAttended = ?, medSchoolGradYear = ?, internshipInstitution = ?, internshipGradYear = ?
                WHERE applicantID = ?`,
                [
                    fullName, age, gender, civilStatus, birthDate, birthPlace, citizenship, homeAddress, telephoneNo,
                    cellphoneNo, emailAddress, tinNo, insuranceIDType, insuranceIDNo, phicNo, guardianName,
                    guardianOccupation, guardianContactNo, collegeAttended, degree, yearGraduated, medSchoolAttended,
                    medSchoolGradYear, internshipInstitution, internshipGradYear, applicantID
                ]
            );
        } else {
            const [applicantResults] = await connection.execute(
                `INSERT INTO applicant (
                    userID, fullName, age, gender, civilStatus, birthDate, birthPlace, citizenship, homeAddress, telephoneNo,
                    cellphoneNo, emailAddress, tinNo, insuranceIDType, insuranceIDNo, phicNo, guardianName, guardianOccupation,
                    guardianContactNo, collegeAttended, degree, yearGraduated, medSchoolAttended, medSchoolGradYear,
                    internshipInstitution, internshipGradYear
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    user_id, fullName, age, gender, civilStatus, birthDate, birthPlace, citizenship, homeAddress, telephoneNo,
                    cellphoneNo, emailAddress, tinNo, insuranceIDType, insuranceIDNo, phicNo, guardianName,
                    guardianOccupation, guardianContactNo, collegeAttended, degree, yearGraduated, medSchoolAttended,
                    medSchoolGradYear, internshipInstitution, internshipGradYear
                ]
            );

            const [newApplicant] = await connection.execute(
                `SELECT applicantID FROM applicant WHERE userID = ?`,
                [user_id]
            );
            applicantID = newApplicant[0].applicantID;
        }

        await connection.execute(`DELETE FROM residency WHERE applicantID = ?`, [applicantID]);
        await connection.execute(`DELETE FROM postresidency WHERE applicantID = ?`, [applicantID]);

        for (const specialty of departmentSpecialties) {
            await connection.execute(
                `INSERT INTO residency (applicantID, departmentSpecialty, hospital, residencyDuration)
                VALUES (?, ?, ?, ?)`,
                [applicantID, specialty.departmentSpecialty, specialty.hospital, specialty.residencyDuration]
            );
        }

        for (const postSpecialty of postDepartmentSpecialties) {
            await connection.execute(
                `INSERT INTO postresidency (applicantID, postResSpecialty, postResInstitution, postResDuration)
                VALUES (?, ?, ?, ?)`,
                [applicantID, postSpecialty.postResSpecialty, postSpecialty.postResInstitution, postSpecialty.postResDuration]
            );
        }

        await connection.commit();
        connection.release();
        return new Response(JSON.stringify({ message: 'Applicant registered successfully' }), { status: 201 });

    } catch (error) {
        await connection.rollback();
        connection.release();
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to register applicant' }), { status: 500 });
    }
}
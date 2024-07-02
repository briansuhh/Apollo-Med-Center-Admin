import { verifyToken } from '$lib/auth';
import pool from '$lib/db';

export async function GET({ request }) {
    const cookie = request.headers.get('cookie');
    const token = cookie?.split('token=')[1];
    if (!token) {
        return new Response(JSON.stringify({ error: 'No token provided' }), { status: 401 });
    }

    try {
        verifyToken(token);
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(`
            SELECT 
                a.applicantID, a.fullName, a.age, a.gender, a.civilStatus, a.birthDate, 
                a.birthPlace, a.citizenship, a.homeAddress, a.telephoneNo, a.cellphoneNo, 
                a.emailAddress, a.tinNo, a.insuranceIDType, a.insuranceIDNo, a.phicNo, 
                a.guardianName, a.guardianOccupation, a.guardianContactNo, a.collegeAttended, 
                a.degree, a.yearGraduated, a.medSchoolAttended, a.medSchoolGradYear, 
                a.internshipInstitution, a.internshipGradYear, r.residencyCode, 
                r.departmentSpecialty, r.hospital, r.residencyDuration, pr.postResCode, 
                pr.postResSpecialty, pr.postResInstitution, pr.postResDuration
            FROM applicant as a, residency as r, postresidency as pr
            WHERE a.applicantID = r.applicantID AND r.applicantID = pr.applicantID`
        );
        connection.release();

        if (rows.length > 0) {
            return new Response(JSON.stringify({ data: rows }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'No records found' }), { status: 404 });
        }

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }
}

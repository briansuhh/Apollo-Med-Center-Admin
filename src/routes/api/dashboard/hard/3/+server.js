import pool from "$lib/db";

export async function GET() {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(`
           SELECT a.applicantID, a.fullName, r.departmentSpecialty, MAX(r.residencyDuration) AS max_residencyDuration
            FROM applicant a, residency r 
            WHERE a.applicantID = r.applicantID
                AND r.residencyDuration = (
                SELECT MAX(residencyDuration)
                FROM residency r2
                WHERE r2.applicantID = a.applicantID
            )
            GROUP BY a.applicantID, a.fullName, r.departmentSpecialty
            ORDER BY a.applicantID`
    );
    
    connection.release();

    const data = rows;
    if (data.length > 0) {
        return new Response(JSON.stringify({ data }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ error: 'Data not found' }), { status: 404 });
    }
}

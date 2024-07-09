import pool from "$lib/db";

export async function GET() {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(`
           SELECT a.applicantID, a.fullName, a.age, 
            (SELECT COUNT(r.departmentSpecialty) 
            FROM residency r 
            WHERE a.applicantID = r.applicantID) AS ResidencyCount,
            (SELECT COUNT(pr.postresSpecialty) 
            FROM postresidency pr 
            WHERE a.applicantID = pr.applicantID) AS PostResidencyCount
        FROM 
            applicant a, residency r, postresidency pr
        GROUP BY a.applicantID
        ORDER BY a.applicantID ASC`
    );
    
    connection.release();

    const data = rows;
    if (data.length > 0) {
        return new Response(JSON.stringify({ data }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ error: 'Data not found' }), { status: 404 });
    }
}

import pool from "$lib/db";

export async function GET() {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(`
           SELECT SUM(post_residency_count) AS TotalPostResidencyCount
                FROM (SELECT a.applicantID, COUNT(pr.applicantID) AS post_residency_count
                FROM applicant a, postresidency pr
                WHERE a.applicantID = pr.applicantID
                GROUP BY a.applicantID
            ) AS post_residency_count;`
    );
    
    connection.release();

    const data = rows[0];
    if (data) {
        return new Response(JSON.stringify({ data }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ error: 'Data not found' }), { status: 404 });
    }
}

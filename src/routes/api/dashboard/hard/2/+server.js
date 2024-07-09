import pool from "$lib/db";

export async function GET() {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(`
           SELECT COUNT(post_residency_count) AS AvgPostResidencyCount
            FROM ( SELECT a.applicantID,
                    COUNT(pr.applicantID) AS post_residency_count
                FROM applicant a, postresidency pr
                WHERE a.applicantID = pr.applicantID
                GROUP BY a.applicantID
            ) AS post_residency_counts`
    );
    
    connection.release();

    const data = rows;
    if (data.length > 0) {
        return new Response(JSON.stringify({ data }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ error: 'Data not found' }), { status: 404 });
    }
}

import pool from "$lib/db";

export async function GET() {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(`
           SELECT applicantID, fullName, emailAddress, status
            FROM applicant
            WHERE status = 'Under review'
            ORDER BY fullName ASC`
    );
    
    connection.release();

    const data = rows;
    if (data.length > 0) {
        return new Response(JSON.stringify({ data }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ error: 'Data not found' }), { status: 404 });
    }
}

import pool from "$lib/db";

export async function GET() {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(`
           SELECT collegeAttended, degree, COUNT(*) AS numberOfApplicants
            FROM applicant
            GROUP BY collegeAttended, degree`
    );
    
    connection.release();

    const data = rows;
    if (data.length > 0) {
        return new Response(JSON.stringify({ data }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ error: 'Data not found' }), { status: 404 });
    }
}

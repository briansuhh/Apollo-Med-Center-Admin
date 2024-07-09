import pool from "$lib/db";

export async function GET() {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(`
           SELECT COUNT(*) as count
           FROM applicant
           WHERE status = 'Denied'`
    );
    
    connection.release();

    const data = rows[0];
    if (data) {
        return new Response(JSON.stringify({ data }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ error: 'Data not found' }), { status: 404 });
    }
}

import pool from '$lib/db';

export async function GET({ params }) {

    const input = params.input;

    // colummnd
    const columns = ['id', 'name', 'email', 'password', 'created_at'];

    // Construct dynamic WHERE clause
    const whereClause = columns.map(column => `${column} LIKE ?`).join(' OR ');

    // Construct dynamic query
    const query = `SELECT * FROM users WHERE ${whereClause}`;

    // Construct dynamic parameters
    const paramsArray = Array(columns.length).fill(`%${input}%`);

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(query, paramsArray);
        connection.release();

        if (rows.length > 0) {
            return new Response(JSON.stringify({ data: rows }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'No matching applicants found' }), { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error retrieving applicants' }), { status: 500 });
    }
}

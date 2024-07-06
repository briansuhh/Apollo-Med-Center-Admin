import pool from '$lib/db';

export async function GET({ params }) {
    const { id } = params;
    
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(
            'SELECT * FROM residency WHERE applicantID = ?',
            [id]
        );
        connection.release();

        if (rows.length > 0) {
            return new Response(JSON.stringify({ user: rows }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'No records found' }), { status: 404 });
        }

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error found' }), { status: 401 });
    }
}

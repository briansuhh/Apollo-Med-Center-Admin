import pool from '$lib/db';

export async function GET({ params }) {
    const { id } = params;
    
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(
            'SELECT * FROM applicant WHERE userID = ?',
            [id]
        );
        connection.release();

        const user = rows[0];
        if (user) {
            return new Response(JSON.stringify({ user }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Applicant not found' }), { status: 404 });
        }

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error found' }), { status: 401 });
    }
}

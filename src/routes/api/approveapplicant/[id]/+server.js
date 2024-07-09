import pool from '$lib/db';

export async function POST({ params }) {
    const { id } = params;
    
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.execute(
            `UPDATE applicant SET status='Approved' WHERE userID = ?`,
            [id]
        );
        connection.release();

        if (result.affectedRows > 0) {
            return new Response(JSON.stringify({ message: 'Applicant status updated to Approved' }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Applicant not found' }), { status: 404 });
        }

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error updating applicant status' }), { status: 500 });
    }
}

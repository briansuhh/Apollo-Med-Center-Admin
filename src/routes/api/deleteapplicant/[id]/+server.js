import pool from '$lib/db';

export async function DELETE({ params }) {
    const { id } = params;

    const connection = await pool.getConnection();

    try {
        const [result] = await connection.execute(
            'DELETE FROM applicant WHERE applicantID = ?',
            [id]
        );
        connection.release();

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'Applicant not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Applicant deleted successfully' }), { status: 200 });
    } catch (error) {
        connection.release();
        return new Response(JSON.stringify({ error: 'Failed to delete applicant' }), { status: 500 });
    }
}

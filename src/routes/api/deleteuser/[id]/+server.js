import pool from '$lib/db';

export async function DELETE({ params }) {
    const { id } = params;

    const connection = await pool.getConnection();

    try {
        const [result] = await connection.execute(
            'DELETE FROM users WHERE id = ?',
            [id]
        );
        connection.release();

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
    } catch (error) {
        connection.release();
        return new Response(JSON.stringify({ error: 'Failed to delete user' }), { status: 500 });
    }
}

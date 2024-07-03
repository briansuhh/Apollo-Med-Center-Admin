import pool from '$lib/db';

export async function DELETE({ params }) {
    const { id } = params;

    const connection = await pool.getConnection();

    try {
        const [result] = await connection.execute(
            'DELETE FROM residency WHERE residencyCode = ?',
            [id]
        );
        connection.release();

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'Record not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Record deleted successfully' }), { status: 200 });
    } catch (error) {
        connection.release();
        return new Response(JSON.stringify({ error: 'Failed to delete record' }), { status: 500 });
    }
}

import { verifyToken } from '$lib/auth';
import pool from '$lib/db';
import { parse } from 'cookie';

export async function GET({ request }) {
    const cookies = parse(request.headers.get('cookie') || '');
    const token = cookies.adminToken;
    if (!token) {
        return new Response(JSON.stringify({ error: 'No token provided' }), { status: 401 });
    }

    try {
        verifyToken(token);
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(`
            SELECT * FROM residency`
        );
        connection.release();

        if (rows.length > 0) {
            return new Response(JSON.stringify({ data: rows }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'No records found' }), { status: 404 });
        }

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }
}

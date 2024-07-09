import pool from "$lib/db";

export async function GET() {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(`
           SELECT departmentSpecialty, COUNT(*) AS specialtyCount
            FROM residency 
            GROUP BY departmentSpecialty
            ORDER BY departmentSpecialty ASC, specialtyCount DESC`
    );
    
    connection.release();

    const data = rows;
    if (data.length > 0) {
        return new Response(JSON.stringify({ data }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ error: 'Data not found' }), { status: 404 });
    }
}

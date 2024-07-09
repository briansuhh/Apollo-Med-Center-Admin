import pool from "$lib/db";

export async function GET() {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(`
           SELECT applicantID, fullName, age, emailAddress, degree
            FROM applicant
            WHERE degree = 'Bachelor of Science in Biology' 
                AND age >= 40
            ORDER BY applicantID ASC`
    );
    
    connection.release();

    const data = rows;
    if (data.length > 0) {
        return new Response(JSON.stringify({ data }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ error: 'Data not found' }), { status: 404 });
    }
}

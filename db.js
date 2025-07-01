const { Pool } = require('pg');



const pool = new Pool({
    connectionString: "postgres://neondb_owner:npg_qWblo5d6ThFx@ep-cold-moon-a5nwjgpy-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = {
    query: (text,params) => pool.query(text,params),
}
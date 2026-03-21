const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

async function clearOldNews() {
    console.log('Clearing old news from Supabase...');
    // We can delete all where id > 0 (or just delete all)
    const { error } = await supabase
        .from('policy_updates')
        .delete()
        .neq('id', 0); // deletes all rows
    
    if (error) {
        console.error('Error deleting:', error);
    } else {
        console.log('Successfully cleared all old news.');
    }
}

clearOldNews();

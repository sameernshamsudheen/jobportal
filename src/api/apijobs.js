import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  // Initialize the Supabase client
  const supabase = supabaseClient(token);

  // Start building the query
  let query = supabase.from("jobs").select(`
      *,
      company:companies (
        name,
        logo_url
      ),
        saved:saved_jobs(id)
    `);

  // Apply filters conditionally
  if (location) {
    query = query.eq("location", location);
  }
  if (company_id) {
    query = query.eq("company_id", company_id);
  }
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`); // Corrected the variable name and syntax
  }

  // Execute the query
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching jobs:", error);
    return null;
  }

  return data;
}

export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = supabaseClient(token);
  // let query = supabase.from("saved_jobs").select("*");
  let query = supabase.from("saved_jobs").delete().eq("job_id", 2);
  let { data, error } = await query;

  console.log(data, "===data===");
}

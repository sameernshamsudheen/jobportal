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
  if (alreadySaved) {
    let query = supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData[0].job_id);

    let { data, error: deleteError } = await query;

    if (deleteError) {
      console.error("Error removing saved job:", deleteError);
      return data;
    }
    return data;
  } else {
    let query = supabase.from("saved_jobs").insert(saveData).select();

    let { data, error: insertError } = await query;

    if (insertError) {
      console.error("Error saving job:", insertError);
      return data;
    }

    return data;
  }
}

export async function getSingleJOb(token, { job_id }) {
  const supabase = supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*, company:companies (name,logo_url),applications:applications(*)")
    .eq("id", job_id)
    .single();

  let { data, error: getCompaniesError } = await query;

  if (getCompaniesError) {
    console.error("Error Deleting Saved jobs", getCompaniesError);
    return null;
  }

  return data;
}

export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = supabaseClient(token);
  const updateData = { isOpen: isOpen[0] };
  let query = supabase
    .from("jobs")
    .update(updateData)
    .eq("id", job_id)
    .select();

  let { data, error: getCompaniesError } = await query;

  if (getCompaniesError) {
    console.error("Error updating  jobs", getCompaniesError);
    return null;
  }

  return data;
}

export async function addNewJob(token, _, jobData) {
  const supabase = supabaseClient(token);


  let query = supabase.from("jobs").insert(jobData[0]).select();

  let { data, error } = await query;

  // Handle errors
  if (error) {
    console.error("Error updating application status:", error);
    return null;
  }

  if (data.length === 0) {
    console.error("No rows updated. Check if job_id exists.");
    return null;
  }

  console.log("Update successful:", data);
  return data;
}

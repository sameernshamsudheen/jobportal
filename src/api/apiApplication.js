import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token, _, jobData) {
  console.log(jobData[0].resume, "===jobData=====");

  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData[0]?.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData[0].resume);

  if (storageError) throw new Error("Error uploading Resume");

  const resumeUrl = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  const jobDataWithResume = {
    ...jobData[0],
    resume: resumeUrl,
  };

  console.log(jobDataWithResume, "===jobDatawith resume=====");

  let query = supabase.from("applications").insert(jobDataWithResume).select();
  let { data, error: error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Error submitting Application");
  }

  return data;
}
export async function updateApplicationStatus(token, { job_id }, statushiring) {
  console.log("updateApplicationStatus called");
  console.log("statushiring:", statushiring);

  // Validate `statushiring` as an array
  if (!Array.isArray(statushiring) || statushiring.length === 0) {
    throw new Error(
      "Invalid 'statushiring' argument. Expected a non-empty array."
    );
  }

  const supabase = supabaseClient(token);

  // Extract the first status
  const status = statushiring[0];
  const payload = { status }; // Equivalent to { status: status }

  console.log(payload, "===payload=====");

  // Update query
  let query = supabase
    .from("applications")
    .update(payload)
    .eq("job_id", job_id)
    .select();

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


export async function getApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .select("*, job:jobs(title, company:companies(name))")
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error fetching Applications:", error);
    return null;
  }

  return data;
}
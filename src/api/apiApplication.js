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

export async function updateApplicationStatus(token, { job_id }, status) {
  const supabase = supabaseClient(token);

  const status = Array.isArray(statusArray) ? statusArray[0] : statusArray;
  ;

  const validStatuses = ["applied", "interviewing", "hired", "rejected"]; // Replace with your enum values
  if (!validStatuses.includes(status)) {
    throw new Error(
      `Invalid status: '${status}'. Allowed values: ${validStatuses.join(", ")}`
    );
  }

  const payload = { status}; //

  let query = supabase
    .from("applications")
    .update(payload)
    .eq("job_id", job_id)
    .select();

  let { data, error: error } = await query;

  if (error || data.length === 0) {
    console.error("Error Deleting Saved jobs", error);
    return null;
  }

  return data;
}

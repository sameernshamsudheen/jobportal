import supabaseClient from "@/utils/supabase";

export async function getCompanies(token) {
  const supabase = supabaseClient(token);
  let query = supabase.from("companies").select("*");

  let { data, error: getCompaniesError } = await query;

  if (getCompaniesError) {
    console.error("Error Deleting Saved jobs", getCompaniesError);
    return null;
  }

  return data;
}

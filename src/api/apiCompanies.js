import supabaseClient, { supabaseUrl } from "@/utils/supabase";

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

export async function addNewCompany(token, _, companyData) {
  const supabase = supabaseClient(token);
  console.log(companyData,"=====companyData");
  
  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData[0].name}`;

  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companyData[0].logo);

  if (storageError) throw new Error("Error uploading Resume");

  const companylogoUrl = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

  let query = supabase.from("companies").insert({name:companyData[0].name ,logo_url:companylogoUrl}).select();

  let { data, error: getCompaniesError } = await query;

  if (getCompaniesError) {
    console.error("Error Deleting Saved jobs", getCompaniesError);
    return null;
  }

  return data;
}



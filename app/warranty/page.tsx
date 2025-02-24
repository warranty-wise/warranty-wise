import WarrantyForm from "./warranty-form";
import { createClient } from "@/utils/supabase/server";

const Warranty = async () => {
  const supabase = await createClient();

  return <WarrantyForm />;
};

export default Warranty;
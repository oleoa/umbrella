import { createClient } from "@/utils/supabase/server";
import Button from "@/components/Button";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  return (
    <main>
      <Button />
    </main>
  );
}

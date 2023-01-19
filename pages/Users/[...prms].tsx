import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";

function ActiveLink(req: NextRequest, res: NextResponse) {
  const router = useRouter();
  const { prms = [] } = router.query;
  const first = prms[0];
  return <>{first}</>;
}

export default ActiveLink;

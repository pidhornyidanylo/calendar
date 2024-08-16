import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
	return withAuth(req);
}
export const config = {
	matcher: ["/", "/help", "/settings", "/apps", "/user"],
};

import { NextResponse } from "next/server";
import { getAll } from "@/lib/db/database";

/**
 * GET function man kaller fra frontend f.eks fetch("api/database/brregApiData") for og fetche all data fra tabellen,
 * man kan også kalle fetch("api/database/brregApiData?take=10&skip=0") hvis man vil ha pagination,
 * det finnes mange query parameters man kan bruke, dette finner man i prisma dokumentasjon.
 *
 * @param {string} request - Bruker det til å hente ut URL fra fetch(), den har også noen andre funksjonaliteter som man kan bruke.
 * @param {string} params - [model] som er mappe navnet betyr at dette er et dynamisk endepunkt, man kaller det i fetch("api/database/[database_tabell]") params henter denne informasjonen.
 * @returns Response data fra database som JSON.
 */

export async function GET(request, { params }) {
	try {
		const model = params.model;
		const { searchParams } = new URL(request.url);

		const options = Object.fromEntries(searchParams);

		for (const key in options) {
			try {
				options[key] = JSON.parse(options[key]);
			} catch {
				continue;
			}
		}

		const result = await getAll(model, options);
		return NextResponse.json(result);
	} catch (error) {
		console.error("API error: ", error);
		return NextResponse.json(
			{
				success: false,
				error: error.message || "Internal server error.",
			},
			{ status: error.name === "DatabaseError" ? 500 : 400 }
		);
	}
}

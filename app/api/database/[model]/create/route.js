import { NextResponse } from "next/server";
import { create } from "@/lib/db/database";

export async function POST(request, { params }) {
	try {
		const model = params.model;
		if (!model) {
			return NextResponse.json(
				{ success: false, error: "Model parameter is required" },
				{ status: 400 }
			);
		}

		let requestBody;
		try {
			requestBody = await request.json();
		} catch (e) {
			return NextResponse.json(
				{ success: false, error: "Invalid JSON in request body." },
				{ status: 400 }
			);
		}

		if (!requestBody || Object.keys(requestBody).length === 0) {
			return NextResponse.json(
				{ success: false, error: "Request body cannot be empty" },
				{ status: 400 }
			);
		}

		const { options, ...data } = requestBody;
		if (Object.keys(data).length === 0) {
			return NextResponse.json(
				{ success: false, error: "No data provided for creation" },
				{ status: 400 }
			);
		}

		const result = await create(model, data, options || {});
		return NextResponse.json(result, { status: 201 });
	} catch (error) {
		console.error("API error: ", error);
		return NextResponse.json(
			{ success: false, error: error.message || "Internal server error." },
			{ status: error.name === "DatabaseError" ? 500 : 400 }
		);
	}
}

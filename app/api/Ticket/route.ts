import Ticket from "../../(models)/Ticket";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  try {
    const body = await req.json();

    console.log("Received Request Body:", body); // Add this line

    // Validate that the request body contains the expected data
    if (!body.formData) {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 400 }
      );
    }

    const ticketData = body.formData;

    // Create the ticket
    const createdTicket = await Ticket.create(ticketData);

    // Return a successful response
    return NextResponse.json(
      { message: "Ticket Created", ticket: createdTicket },
      { status: 201 }
    );
  } catch (error) {
    // Handle errors and return an error response
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { message: "Error creating ticket", error },
      { status: 500 }
    );
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const ticketData = body.formData;
//     await Ticket.create(ticketData);
//     return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: "Error", error }, { status: 500 });
//   }
// }

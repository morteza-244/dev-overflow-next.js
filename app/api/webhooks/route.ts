import { createUser, deleteUser, updatedUser } from "@/lib/actions/user.action";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const eventType = evt.type;

  console.log(eventType)

  if (eventType === "user.created") {
    const {
      id: userId,
      first_name,
      last_name,
      email_addresses,
      image_url,
      username,
    } = evt.data;

    const mongoUser = await createUser({
      clerkId: userId,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name ? last_name : ""}`,
      picture: image_url,
      username: username!,
    });

    return NextResponse.json({ message: "OK", user: mongoUser });
  }
  if (eventType === "user.updated") {
    const {
      id: userId,
      first_name,
      last_name,
      email_addresses,
      image_url,
      username,
    } = evt.data;

    const mongoUser = await updatedUser({
      clerkId: userId,
      updateData: {
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name ? last_name : ""}`,
        picture: image_url,
        username: username!,
      },
      path: `/profile/${userId}`,
    });

    return NextResponse.json({ message: "OK", user: mongoUser });
  }
  if (eventType === "user.deleted") {
    const { id: userId } = evt.data;
    const deletedUser = await deleteUser({
      clerkId: userId!,
    });

    return NextResponse.json({message: "user deleted", user: deletedUser})
  }

  return new Response("", { status: 200 });
}

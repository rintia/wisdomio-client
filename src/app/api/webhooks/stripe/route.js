import Stripe from "stripe";
import { headers } from "next/headers";
import { MongoClient, ObjectId } from "mongodb";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

const client = new MongoClient(
  process.env.MONGO_DB_URI
);

export async function POST(req) {
  const body = await req.text();

  const signature = (await headers()).get(
    "stripe-signature"
  );

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err.message}`,
      {
        status: 400,
      }
    );
  }

  if (
    event.type ===
    "checkout.session.completed"
  ) {
    const session = event.data.object;

    const userId = session.metadata.userId;

    await client.connect();

    const db = client.db(
      process.env.AUTH_DB_NAME
    );

    const userCollection =
      db.collection("user");

    await userCollection.updateOne(
      {
        _id: new ObjectId(userId),
      },
      {
        $set: {
          isPremium: true,
          premiumPurchasedAt: new Date(),
        },
      }
    );

    console.log(
      "Premium granted:",
      userId
    );
  }

  return Response.json({
    received: true,
  });
}
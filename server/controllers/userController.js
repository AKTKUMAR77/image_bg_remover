import { Webhook } from "svix";
import userModel from "../models/userModel.js";

// API Controller Function to manage Clerk User with DB
// http://localhost:4000/api/user/webhooks

const clerkWebHooks = async (req, res) => {
  try {
    // Create svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    console.log("Webhook verified");
    console.log(JSON.stringify(req.body, null, 2));
    const { data, type } = req.body;
    console.log(req.body);
    console.log(type);
    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        const user = await userModel.create(userData);
        console.log(user);
        res.status(200).json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.status(200).json({});
        break;
      }
      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.status(200).json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false, message: error.message });
  }
};

export { clerkWebHooks };

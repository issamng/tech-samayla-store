import { mongooseConnect } from "@/lib/mongoose";
import { LocalUser } from "@/models/LocalUser";

export default async function handle(req, res) {
  await mongooseConnect();

  if (req.method === "POST") {
    const sanitizedData = removeCircularReferences(req.body);
    try {
        console.log("Before create");
        const userRecord = await LocalUser.create(sanitizedData);
        console.log("After create");
      return res.json(userRecord);
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

// Helper function to remove circular references
const removeCircularReferences = (obj, seen = new WeakSet()) => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return; // Skip circular references
        }
        seen.add(value);
      }
      return value;
    })
  );
};

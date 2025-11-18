// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllUsers, verifyAdminCode } from "../../../utils/firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    // Get the code from query parameter
    const code = req.query.code as string;

    if (!code) {
      res.status(401).json({ message: "Access code required" });
      return;
    }

    // Verify the code on the server side
    const isValid = await verifyAdminCode(code);

    if (!isValid) {
      res.status(401).json({ message: "Invalid access code" });
      return;
    }

    // If code is valid, return the members
    const members = await getAllUsers();
    res.status(200).json({ members });
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: "Error fetching members", error });
  }
}

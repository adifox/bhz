// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { verifyAdminCode } from "../../../utils/firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { code } = req.body;

    if (!code) {
      res.status(400).json({ message: "Code is required" });
      return;
    }

    const isValid = await verifyAdminCode(code);

    if (isValid) {
      res.status(200).json({ verified: true });
    } else {
      res.status(401).json({ verified: false, message: "Invalid code" });
    }
  } catch (error) {
    console.error("Error verifying admin code:", error);
    res.status(500).json({ message: "Error verifying code", error });
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { addDocument } from "../../../utils/firebase-admin";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("THE REQUEST BODY:", req.body);

  const response = await addDocument(req.body);

  res.status(200).json({ name: "John Doe" });
}

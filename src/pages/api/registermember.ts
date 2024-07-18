// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { addDocument, checkForUser } from "../../../utils/firebase-admin";
import { generateMembershipNumber } from "../../../utils/helpers";
import { sendConfirmationMail } from "../.././../utils/mailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name } = req?.body;

  if (email) {
    const userMail = await checkForUser(email);

    if (userMail) {
      res.status(200).json({ message: "User already registered" });

      return;
    }

    const membershipNumber = generateMembershipNumber(name);
    const memberData = {
      ...req?.body,
      membershipNumber,
    };

    const response = (await addDocument(memberData)) as {
      status: number;
      userId: string;
    };

    if (response.status === 200) {
      const response = await sendConfirmationMail(memberData);

      res.status(200).json({ message: response });
      return;
    } else {
      res.status(500).json({ message: response });
      return;
    }
  }

  res.status(500).json({ message: "Something went wrong" });
}

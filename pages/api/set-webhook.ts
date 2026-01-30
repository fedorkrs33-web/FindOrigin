// pages/api/set-webhook.ts
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env.WEBHOOK_URL;
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ error: 'Missing env variables' });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
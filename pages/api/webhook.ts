// pages/api/webhook.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const update = req.body;

  // Быстро возвращаем 200 OK
  res.status(200).json({ ok: true });

  // Обработка сообщения — асинхронно, после ответа
  if (update.message && update.message.text) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    // Переход к Этапу 3: обработка текста
    await handleIncomingMessage(chatId, text);
  }

  return;
}
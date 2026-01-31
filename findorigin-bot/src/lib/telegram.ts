// src/lib/telegram.ts
import axios from 'axios';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

if (!BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN не установлен в .env.local');
}

export async function sendMessage(chatId: number, text: string) {
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text,
    parse_mode: 'Markdown',
  });
}

export async function handleUpdate(update: any) {
  if (!update.message?.text || !update.message?.chat?.id) return;

  const { message } = update;
  const { chat, text } = message;

  console.log(`Получено сообщение от ${chat.id}: "${text}"`);

  await sendMessage(
    chat.id,
    `✅ Получено: *"${text.slice(0, 50)}${text.length > 50 ? '...' : ''}"*\n🔍 Ищу источник...`
  );

  // Имитация задержки (позже заменим на настоящий анализ)
  setTimeout(async () => {
    await sendMessage(
      chat.id,
      `
*Возможные источники:*

1. [Пример новости](https://example.com/news1) — *уверенность: высокая*
2. [Официальный отчёт](https://gov.example/report) — *уверенность: средняя*

_Анализ: найдены совпадения по дате и формулировке._
      `.trim()
    );
  }, 2000);
}
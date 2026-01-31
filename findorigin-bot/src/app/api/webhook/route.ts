// src/app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { handleUpdate } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const update = await request.json();
    // Обрабатываем асинхронно, но не ждём — важно вернуть 200 быстро
    handleUpdate(update).catch(console.error);

    // Сразу отвечаем OK
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Webhook parse error:', err);
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }
}
import dotenv from 'dotenv';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: '1mb' }));

app.post('/api/chat', async (req, res) => {
  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';
  const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];

  if (!prompt) {
    return res.status(400).json({ error: 'Vui lòng nhập câu hỏi.' });
  }
  if (!apiKey) {
    return res.status(503).json({
      error: 'Chưa cấu hình GEMINI_API_KEY. Sao chép .env.example thành .env.local và thêm API key.'
    });
  }

  const history = messages
    .slice(-8)
    .filter((item) => item && ['user', 'assistant'].includes(item.role) && typeof item.content === 'string')
    .map((item) => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.content }]
    }));

  const contents = [
    ...history,
    { role: 'user', parts: [{ text: prompt }] }
  ];

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: 'Bạn là gia sư tiếng Pháp thân thiện và chuyên nghiệp. Trả lời bằng tiếng Việt trừ khi người dùng yêu cầu dùng tiếng Pháp. Giải thích ngắn gọn, dùng ví dụ tự nhiên, đúng trọng âm và chính tả tiếng Pháp. Với câu hỏi ngữ pháp, phân tích dễ hiểu và đưa bài tập nhỏ.'
            }]
          },
          contents,
          generationConfig: { temperature: 0.5, maxOutputTokens: 700 }
        })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || 'Gemini không thể xử lý yêu cầu.'
      });
    }

    const answer = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim();

    if (!answer) {
      return res.status(502).json({ error: 'Gemini không trả về nội dung phản hồi.' });
    }
    return res.json({ answer });
  } catch (error) {
    console.error(error);
    return res.status(502).json({ error: 'Không thể kết nối tới Gemini. Vui lòng thử lại.' });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Lumière API listening on http://localhost:${port}`);
});

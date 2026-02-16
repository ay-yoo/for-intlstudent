import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const { schoolName } = req.body;

  const prompt = `
    학교명: ${schoolName}
    다음 정보를 JSON 형식으로만 응답해줘:
    {
      "size": "학교 몇 에이커인지, 재학생 수 몇명인지",
      "exchange": "대한민국에서 해당 학교와 제휴를 맺은 학교들",
      "weather": "도시 날씨 특징"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonString = text.replace(/```json|```/g, "").trim();
    res.status(200).json(JSON.parse(jsonString));
  } catch (error) {
    res.status(500).json({ error: "AI 호출 실패" });
  }
}

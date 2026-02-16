export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { schoolName } = req.body;

    console.log("요청 받은 학교명:", schoolName);

    if (!schoolName) {
      return res.status(400).json({ error: "학교 이름이 없습니다." });
    }

    const response = await fetch(
      // 2.0 대신 리스트에 있던 'gemini-flash-latest' 사용
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
학교 이름: ${schoolName}

반드시 아래 형식의 JSON으로만 답하세요.
설명 없이 JSON만 출력하세요.

{
  "size": "",
  "otherSchool": "",
  "weather": ""
}
`,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (!data.candidates) {
      console.error("Gemini 응답 이상:", data);
      return res.status(500).json({ error: "Gemini 응답 오류" });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!text.includes("{")) {
      console.error("JSON 형식 아님:", text);
      return res.status(500).json({ error: "JSON 형식 아님" });
    }

    // JSON 부분만 추출
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const jsonString = text.slice(jsonStart, jsonEnd + 1);

    let parsed;

    try {
      parsed = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("JSON 파싱 실패:", parseError);
      console.error("원본 text:", text);
      return res.status(500).json({ error: "JSON 파싱 실패" });
    }

    console.log("Gemini 응답 성공:", parsed);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("❌ 상세 에러 로그:", err);
    return res.status(500).json({ error: "AI 호출 실패" });
  }
}

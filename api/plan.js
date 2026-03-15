export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method==='OPTIONS'){res.status(200).end();return;}
  const {prompt} = req.body;
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.GROQ_KEY
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {role:'system',content:'You are a day planner. Always respond with valid JSON only. No markdown, no explanation.'},
        {role:'user',content:prompt}
      ],
      temperature: 0.7,
      max_tokens: 1500
    })
  });
  const data = await response.json();
  res.status(200).json(data);
}

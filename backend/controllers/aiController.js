// ============================================================
// Ye file AI features ka POORA logic handle karti hai
// Google Gemini API use karke sab AI features kaam karte hain
// Gemini 1.5 Flash model - FREE hai aur bahut fast bhi hai!
// ============================================================

const { GoogleGenerativeAI } = require('@google/generative-ai');

const fallbackGenerate = (prompt, mode = 'summary') => {
  const lowerPrompt = prompt.toLowerCase();

  if (mode === 'summary') {
    return 'Results-driven professional with strong problem-solving skills, hands-on execution experience, and a proven ability to deliver measurable outcomes using modern technologies.';
  }

  if (mode === 'skills') {
    return 'Programming Languages: JavaScript, TypeScript, Python\nFrameworks: React, Node.js, Express, MongoDB\nTools: Git, Docker, Vercel, Render';
  }

  if (mode === 'keywords') {
    return 'JavaScript, React, Node.js, Express, MongoDB, REST APIs, Problem Solving, Communication, Agile, Collaboration';
  }

  if (mode === 'project') {
    return '• Built a scalable full-stack product with clear user flows and production-ready architecture.\n• Delivered measurable improvements in performance, maintainability, and usability.\n• Integrated modern tooling and deployment workflows to support reliable delivery.';
  }

  if (lowerPrompt.includes('improve')) {
    return 'Strategic and execution-focused professional with a strong record of building impactful digital products, solving complex problems, and driving measurable business outcomes.';
  }

  return 'Results-driven professional with strong communication, technical execution, and business-focused delivery skills.';
};

let genAI;
let model;

try {
  if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }
} catch (error) {
  console.warn('Gemini client setup warning:', error.message);
}

const callGemini = async (prompt, fallbackMode = 'summary') => {
  if (!model) {
    return fallbackGenerate(prompt, fallbackMode);
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.warn('Gemini request failed, using fallback generator:', error.message);
    return fallbackGenerate(prompt, fallbackMode);
  }
};

// ========== 1. PROFESSIONAL SUMMARY GENERATE KARO ==========
// POST /api/ai/generate-summary
// User ki info lekar AI se professional summary banwao
const generateSummary = async (req, res) => {
  try {
    // Frontend se user ki details aayengi
    const { name, jobTitle, skills, experience, education } = req.body;

    // Prompt banao - AI ko clearly batao kya chahiye
    // Jitna detailed prompt, utna better response milega
    const prompt = `
      You are a professional resume writer. Write a compelling professional summary for a resume.
      
      Person's Details:
      - Name: ${name || 'Not provided'}
      - Job Title/Target Role: ${jobTitle || 'Software Developer'}
      - Skills: ${skills || 'Not provided'}
      - Experience: ${experience || 'Fresher'}
      - Education: ${education || 'Not provided'}
      
      Instructions:
      - Write 3-4 sentences only
      - Make it professional and ATS-friendly
      - Use action words
      - Do NOT include any markdown formatting or asterisks
      - Write in first person
      - Keep it concise and impactful
    `;

    // Gemini API ko call karo
    const summary = await callGemini(prompt, 'summary');

    // Frontend ko response bhejo
    res.json({ success: true, summary: summary.trim() });

  } catch (error) {
    console.error('AI Summary Error:', error);
    
    // Agar API quota exceed ho toh friendly message dikhao
    if (error.message?.includes('quota') || error.message?.includes('429')) {
      return res.status(429).json({ 
        message: 'AI ka free quota khatam ho gaya hai. Thodi der baad try karo! 😊' 
      });
    }
    
    res.status(500).json({ message: 'AI summary generate nahi kar paya', error: error.message });
  }
};

// ========== 2. EXISTING SUMMARY IMPROVE KARO ==========
// POST /api/ai/improve-summary
const improveSummary = async (req, res) => {
  try {
    const { existingSummary, jobTitle } = req.body;

    if (!existingSummary) {
      return res.status(400).json({ message: 'Pehle kuch summary likho toh improve karein' });
    }

    // Prompt - existing summary ko better banane ke liye
    const prompt = `
      You are a professional resume writer. Improve the following resume summary.
      
      Target Job Title: ${jobTitle || 'Software Developer'}
      
      Existing Summary:
      "${existingSummary}"
      
      Instructions:
      - Make it more professional and impactful
      - Add strong action words
      - Make it ATS-friendly
      - Keep it 3-4 sentences
      - Do NOT use markdown formatting or asterisks
      - Return ONLY the improved summary text, nothing else
    `;

    const improvedSummary = await callGemini(prompt, 'improve');
    res.json({ success: true, summary: improvedSummary.trim() });

  } catch (error) {
    console.error('AI Improve Summary Error:', error);
    if (error.message?.includes('quota') || error.message?.includes('429')) {
      return res.status(429).json({ message: 'AI quota khatam. Thodi der baad try karo! 😊' });
    }
    res.status(500).json({ message: 'Summary improve nahi ho payi', error: error.message });
  }
};

// ========== 3. PROJECT DESCRIPTION GENERATE KARO ==========
// POST /api/ai/project-description
const generateProjectDescription = async (req, res) => {
  try {
    const { projectName, techStack, projectType } = req.body;

    if (!projectName) {
      return res.status(400).json({ message: 'Project ka naam toh do' });
    }

    const prompt = `
      You are a professional resume writer. Write a project description for a resume.
      
      Project Details:
      - Project Name: ${projectName}
      - Tech Stack: ${techStack || 'Not specified'}
      - Project Type: ${projectType || 'Web Application'}
      
      Instructions:
      - Write 2-3 bullet points (use • symbol)
      - Start each point with a strong action verb (Built, Developed, Implemented, etc.)
      - Mention the tech stack used
      - Focus on what was achieved, not just what was done
      - Do NOT use markdown formatting or asterisks
      - Keep each point concise (max 15 words)
    `;

    const description = await callGemini(prompt, 'project');
    res.json({ success: true, description: description.trim() });

  } catch (error) {
    console.error('AI Project Description Error:', error);
    if (error.message?.includes('quota') || error.message?.includes('429')) {
      return res.status(429).json({ message: 'AI quota khatam. Thodi der baad try karo! 😊' });
    }
    res.status(500).json({ message: 'Project description generate nahi hua', error: error.message });
  }
};

// ========== 4. SKILLS SUGGEST KARO ==========
// POST /api/ai/skills-suggestion
const suggestSkills = async (req, res) => {
  try {
    const { jobRole, currentSkills } = req.body;

    if (!jobRole) {
      return res.status(400).json({ message: 'Job role batao - kiske liye skills chahiye?' });
    }

    const prompt = `
      You are a technical recruiter. Suggest relevant technical skills for a resume.
      
      Job Role: ${jobRole}
      Current Skills: ${currentSkills || 'None mentioned'}
      
      Instructions:
      - Suggest 15-20 relevant technical skills
      - Categorize them (Programming Languages, Frameworks, Tools, etc.)
      - Format as: Category: skill1, skill2, skill3
      - Each category on a new line
      - Do NOT use markdown formatting or asterisks
      - Focus on in-demand, ATS-friendly skills
    `;

    const skills = await callGemini(prompt, 'skills');
    res.json({ success: true, skills: skills.trim() });

  } catch (error) {
    console.error('AI Skills Error:', error);
    if (error.message?.includes('quota') || error.message?.includes('429')) {
      return res.status(429).json({ message: 'AI quota khatam. Thodi der baad try karo! 😊' });
    }
    res.status(500).json({ message: 'Skills suggest nahi ho payi', error: error.message });
  }
};

// ========== 5. ATS KEYWORDS SUGGEST KARO ==========
// POST /api/ai/ats-keywords
const suggestAtsKeywords = async (req, res) => {
  try {
    const { jobTitle, jobDescription } = req.body;

    if (!jobTitle) {
      return res.status(400).json({ message: 'Job title batao' });
    }

    const prompt = `
      You are an ATS (Applicant Tracking System) expert. Suggest important keywords for a resume.
      
      Job Title: ${jobTitle}
      Job Description (if any): ${jobDescription || 'Standard industry requirements'}
      
      Instructions:
      - Suggest 20-25 ATS-friendly keywords
      - Include both technical and soft skills keywords
      - Format as a comma-separated list
      - These keywords should help pass ATS screening
      - Do NOT use markdown formatting or asterisks
      - Include action verbs, technologies, and industry terms
    `;

    const keywords = await callGemini(prompt, 'keywords');
    res.json({ success: true, keywords: keywords.trim() });

  } catch (error) {
    console.error('AI ATS Keywords Error:', error);
    if (error.message?.includes('quota') || error.message?.includes('429')) {
      return res.status(429).json({ message: 'AI quota khatam. Thodi der baad try karo! 😊' });
    }
    res.status(500).json({ message: 'ATS keywords generate nahi hue', error: error.message });
  }
};

module.exports = {
  generateSummary,
  improveSummary,
  generateProjectDescription,
  suggestSkills,
  suggestAtsKeywords,
};

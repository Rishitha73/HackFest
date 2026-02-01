const axios = require('axios');

const generateMockRoadmap = (branch, interests, focus) => {
  const interestsList = Array.isArray(interests) ? interests : interests.split(',').map(i => i.trim());
  
  return {
    title: `${branch} Learning Roadmap - ${focus}`,
    phases: [
      {
        milestone: 'Foundation & Fundamentals',
        duration: '3-6 months',
        skills: [
          `Core ${branch} Concepts and Terminology`,
          `Mathematical Foundations for ${branch}`,
          `Basic Problem-Solving Techniques`,
          `Introduction to ${interestsList[0] || 'Key Tools'}`,
          `Understanding Industry Standards`
        ],
        resources: [
          { type: 'YouTube Course', name: `${branch} Fundamentals - Complete Tutorial`, link: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(branch + ' tutorial') },
          { type: 'Online Course', name: 'Coursera/edX Foundation Course', link: 'https://www.coursera.org/search?query=' + encodeURIComponent(branch) },
          { type: 'Book', name: `Introduction to ${branch} (Textbook)`, link: '#' },
          { type: 'Documentation', name: 'Official Documentation & Guides', link: '#' },
          { type: 'Practice Platform', name: 'Interactive Coding/Learning Platform', link: '#' }
        ]
      },
      {
        milestone: 'Intermediate Development',
        duration: '6-9 months',
        skills: [
          `Advanced ${interestsList[0] || 'Core'} Concepts`,
          `Practical Project Development`,
          `Version Control and Collaboration (Git)`,
          `Industry-Standard Tools and Frameworks`,
          `Testing and Debugging Techniques`,
          `Best Practices and Design Patterns`
        ],
        resources: [
          { type: 'YouTube Playlist', name: `${interestsList[0] || branch} Advanced Tutorials`, link: 'https://www.youtube.com/results?search_query=' + encodeURIComponent((interestsList[0] || branch) + ' advanced') },
          { type: 'Project Tutorial', name: 'Build 3-5 Real-World Projects', link: '#' },
          { type: 'GitHub Repositories', name: 'Study Open Source Projects', link: 'https://github.com/search?q=' + encodeURIComponent(branch) },
          { type: 'Community', name: 'Join Developer Communities', link: '#' },
          { type: 'Blog Series', name: 'Technical Blogs and Case Studies', link: '#' }
        ]
      },
      {
        milestone: 'Advanced Specialization',
        duration: '9-18 months',
        skills: [
          `Expert-Level ${branch} Techniques`,
          `${interestsList[1] || 'Advanced'} Specialization`,
          `System Architecture and Design`,
          `Performance Optimization`,
          `Security Best Practices`,
          `Scalability and Reliability`,
          `Research and Innovation`
        ],
        resources: [
          { type: 'Advanced Course', name: 'Specialization Nanodegree/Certificate', link: 'https://www.udacity.com/search?query=' + encodeURIComponent(branch) },
          { type: 'Research Papers', name: 'Latest Academic Research', link: 'https://scholar.google.com/scholar?q=' + encodeURIComponent(branch) },
          { type: 'Conference Talks', name: 'Industry Conference Videos', link: '#' },
          { type: 'Technical Documentation', name: 'Advanced Framework Documentation', link: '#' },
          { type: 'Mentorship', name: 'Find Expert Mentors', link: '#' }
        ]
      },
      {
        milestone: 'Professional Mastery',
        duration: '18-36 months',
        skills: [
          `Industry Leadership and Innovation`,
          `Portfolio Development`,
          `Open Source Contributions`,
          `Technical Communication and Writing`,
          `Interview Preparation`,
          `Networking and Personal Branding`,
          `Continuous Learning and Adaptation`
        ],
        resources: [
          { type: 'Portfolio Platform', name: 'Build Professional Portfolio', link: 'https://github.com' },
          { type: 'LinkedIn', name: 'Professional Networking', link: 'https://linkedin.com' },
          { type: 'Interview Prep', name: 'LeetCode/HackerRank Practice', link: 'https://leetcode.com' },
          { type: 'Blog Platform', name: 'Start Technical Blogging', link: 'https://dev.to' },
          { type: 'Job Boards', name: 'Apply for Positions/Internships', link: '#' },
          { type: 'Speaking', name: 'Present at Meetups/Conferences', link: '#' }
        ]
      }
    ]
  };
};

const callGeminiAPI = async (prompt) => {
  const apiKey = process.env.LLM_API_KEY;
  const model = process.env.LLM_MODEL || 'gemini-pro';
  
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      contents: [{
        parts: [{
          text: `You are an expert academic advisor and career coach. Generate a detailed learning roadmap.

${prompt}

IMPORTANT: Return ONLY a valid JSON object with this EXACT structure (no markdown, no code blocks):
{
  "title": "Roadmap Title",
  "phases": [
    {
      "milestone": "Phase Name",
      "duration": "X months",
      "skills": ["skill 1", "skill 2", "skill 3", "skill 4", "skill 5"],
      "resources": [
        {"type": "YouTube Course", "name": "Resource Name", "link": "https://..."},
        {"type": "Book", "name": "Book Name", "link": "https://..."}
      ]
    }
  ]
}

Generate 4 phases with 5-7 skills each and 4-6 resources per phase.`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 3000,
      }
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000
    }
  );

  const content = response.data.candidates[0].content.parts[0].text;
  return content;
};

const callOpenAICompatibleAPI = async (prompt) => {
  const response = await axios.post(
    process.env.LLM_API_URL,
    {
      model: process.env.LLM_MODEL || 'grok-beta',
      messages: [
        {
          role: 'system',
          content: 'You are an expert academic advisor and career coach. Generate detailed, practical learning roadmaps in JSON format. Always include realistic timelines, specific skills, and actual resource links (YouTube, Coursera, books, GitHub, etc.). Structure your response as pure JSON without any markdown formatting.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.LLM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000
    }
  );

  const content = response.data.choices[0].message.content;
  return content;
};

const generateRoadmapWithLLM = async (prompt) => {
  const provider = process.env.LLM_PROVIDER || 'mock';
  
  // Check if LLM API key is configured
  if (!process.env.LLM_API_KEY || 
      process.env.LLM_API_KEY === 'your_grok_or_openai_key_here' ||
      process.env.LLM_API_KEY === 'your_gemini_api_key_here' ||
      provider === 'mock') {
    console.log('⚠ LLM API not configured, using intelligent mock roadmap generator');
    
    // Extract branch, interests, and focus from prompt
    const branchMatch = prompt.match(/B\.Tech\s+(\w+)|course in\s+([^,]+)|for a\s+([^,]+)\s+with/i);
    const branch = branchMatch ? (branchMatch[1] || branchMatch[2] || branchMatch[3] || '').trim() : 'General Studies';
    
    const interestsMatch = prompt.match(/Interests:\s*([^.]+)/);
    const interests = interestsMatch ? interestsMatch[1].split(',').map(i => i.trim()) : [];
    
    const focusMatch = prompt.match(/focus on\s+([^.]+)/);
    const focus = focusMatch ? focusMatch[1].trim() : 'Comprehensive Learning Path';
    
    return generateMockRoadmap(branch, interests, focus);
  }

  try {
    console.log(`🤖 Using ${provider.toUpperCase()} API for roadmap generation...`);
    
    // Enhanced prompt for better structured output
    const enhancedPrompt = prompt + `

Generate 4 phases with 5-7 skills each and 4-6 resources per phase. Include real, working URLs for resources.`;

    let content;
    
    // Call appropriate API based on provider
    if (provider === 'gemini') {
      content = await callGeminiAPI(enhancedPrompt);
    } else {
      // OpenAI-compatible APIs (Grok, OpenAI, etc.)
      content = await callOpenAICompatibleAPI(enhancedPrompt);
    }
    
    console.log('✅ LLM Response received, parsing...');
    
    // Try to extract JSON from response (handle markdown code blocks)
    let jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    
    // Try to find raw JSON object
    jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // If no valid JSON found, fallback
    console.log('⚠ Could not parse LLM response, using fallback');
    throw new Error('Invalid JSON response from LLM');
    
  } catch (error) {
    console.error('LLM API error:', error.message);
    console.log('⚠ Falling back to intelligent mock roadmap generator');
    
    // Fallback to mock generator
    const branchMatch = prompt.match(/B\.Tech\s+(\w+)|course in\s+([^,]+)|for a\s+([^,]+)\s+with/i);
    const branch = branchMatch ? (branchMatch[1] || branchMatch[2] || branchMatch[3] || '').trim() : 'General Studies';
    
    const interestsMatch = prompt.match(/Interests:\s*([^.]+)/);
    const interests = interestsMatch ? interestsMatch[1].split(',').map(i => i.trim()) : [];
    
    const focusMatch = prompt.match(/focus on\s+([^.]+)/);
    const focus = focusMatch ? focusMatch[1].trim() : 'Comprehensive Learning Path';
    
    return generateMockRoadmap(branch, interests, focus);
  }
};

module.exports = { generateRoadmapWithLLM };

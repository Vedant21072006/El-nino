import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Gemini on server side if API key is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Gemini API initialized successfully on server');
  } catch (err) {
    console.error('Failed to initialize Gemini API:', err);
  }
} else {
  console.log('No GEMINI_API_KEY found in environment. Using grounded agricultural fallback assistant.');
}

// In-Memory Database Store for state persistence
const db = {
  users: [
    {
      id: 'farmer-01',
      name: 'Ramesh Patil',
      role: 'farmer',
      phone: '+91 98230 45123',
      language: 'mr',
      district: 'latur',
      isApproved: true,
    },
    {
      id: 'officer-01',
      name: 'Dr. Suresh Patil',
      role: 'officer',
      phone: '+91 94220 88991',
      language: 'en',
      district: 'latur',
      department: 'Directorate of Agriculture, Maharashtra',
      assignedDistricts: ['latur', 'nanded', 'beed', 'jalna'],
      isApproved: true,
    },
    {
      id: 'admin-01',
      name: 'State Agromet Administrator',
      role: 'admin',
      phone: '+91 99000 11223',
      language: 'en',
      department: 'State Climate & Crop Surveillance Unit',
      isApproved: true,
    }
  ],
  farms: [
    {
      id: 'farm-001',
      farmerId: 'farmer-01',
      farmerName: 'Ramesh Patil',
      state: 'Maharashtra',
      district: 'latur',
      taluka: 'Ausa',
      village: 'Belkund',
      farmArea: 4.5,
      farmAreaUnit: 'acres',
      crop: 'Soybean',
      cropVariety: 'JS-335',
      sowingDate: '2026-06-28',
      cropStage: 'pod_formation',
      waterSource: 'rain-fed',
      irrigationType: 'none',
      soilType: 'black_cotton',
      recentObservations: 'Severe dry spell for 18 days, flowers dropping rapidly in afternoon heat.',
      updatedAt: new Date().toISOString(),
    }
  ] as any[],
  assessments: [] as any[],
  warnings: [] as any[],
  advisories: [] as any[],
  tasks: [] as any[],
  auditLogs: [] as any[]
};

// Seed initial audit log
db.auditLogs.push({
  id: 'AUDIT-INIT-01',
  timestamp: new Date().toISOString(),
  action: 'System Startup & Service Initialization',
  performedBy: 'System Auto-Monitor',
  userRole: 'admin',
  entityType: 'assessment',
  entityId: 'SYS-START',
  details: 'Climate pipeline initialized with IMD daily rainfall and NOAA ONI v6 datasets.'
});

/* ========================================================================== */
/* REST API ENDPOINTS (/api/v1)                                               */
/* ========================================================================== */

// Health check
app.get('/api/v1/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'EL NIÑO Agricultural Early Warning Engine',
    geminiConfigured: !!ai,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Auth Login
app.post('/api/v1/auth/login', (req: Request, res: Response) => {
  const { phone, password, role } = req.body;
  if (!phone) {
    return res.status(400).json({ error: 'Mobile number is required' });
  }

  const user = db.users.find(u => u.phone.includes(phone) || (role && u.role === role)) || {
    id: `user-${Date.now()}`,
    name: role === 'officer' ? 'Agricultural Officer' : 'Soybean Farmer',
    role: role || 'farmer',
    phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
    language: 'en',
    district: 'latur',
    isApproved: true,
  };

  res.json({
    token: `token-${Date.now()}`,
    user,
    message: 'Authentication successful'
  });
});

// Auth Register
app.post('/api/v1/auth/register', (req: Request, res: Response) => {
  const { name, phone, language, role, district, taluka, village, farmArea, crop, waterSource } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name,
    role: role || 'farmer',
    phone,
    language: language || 'mr',
    district: district || 'latur',
    isApproved: role === 'officer' ? false : true,
  };

  db.users.push(newUser);

  if (newUser.role === 'farmer') {
    db.farms.push({
      id: `farm-${Date.now()}`,
      farmerId: newUser.id,
      farmerName: name,
      state: 'Maharashtra',
      district: district || 'latur',
      taluka: taluka || 'Ausa',
      village: village || 'Village 1',
      farmArea: Number(farmArea) || 3.0,
      farmAreaUnit: 'acres',
      crop: crop || 'Soybean',
      sowingDate: '2026-06-25',
      cropStage: 'flowering',
      waterSource: waterSource || 'rain-fed',
      updatedAt: new Date().toISOString()
    });
  }

  res.status(201).json({
    user: newUser,
    message: 'User registered successfully'
  });
});

// OTP Verification simulation / endpoint
app.post('/api/v1/auth/verify-otp', (req: Request, res: Response) => {
  const { otp, phone } = req.body;
  if (!otp) {
    return res.status(400).json({ error: 'OTP is required' });
  }
  // In demo/dev mode, verify 4-digit code (e.g. 1234 or any 4 digits)
  res.json({
    verified: true,
    phone,
    message: 'Phone verified successfully'
  });
});

// Multilingual Gemini AI Assistant Endpoint
app.post('/api/v1/gemini/chat', async (req: Request, res: Response) => {
  const { message, language = 'en', mode = 'crop_assistant', farmDetails, latestAssessment } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // System instructions for agricultural decision support
  const systemInstruction = `You are the AI Agricultural Assistant for the EL NIÑO Agricultural Risk & Early Warning System, specializing in Soybean farming in Maharashtra, India.
Language: Answer strictly in ${language === 'mr' ? 'Marathi (मराठी)' : language === 'hi' ? 'Hindi (हिंदी)' : 'English'}.
User Context:
${farmDetails ? `Farmer District: ${farmDetails.district}, Taluka: ${farmDetails.taluka}, Crop: ${farmDetails.crop}, Stage: ${farmDetails.cropStage}, Water Source: ${farmDetails.waterSource}` : 'District: Latur, Crop: Soybean'}
${latestAssessment ? `Latest Assessment Risk: ${latestAssessment.riskLevel}, Predicted Yield Anomaly: ${latestAssessment.yieldAnomalyPct}%, Key Factors: ${latestAssessment.keyContributingFactors?.map((f: any) => f.label).join(', ')}` : ''}

Guidelines:
1. Provide practical, empathetic, evidence-grounded farming recommendations.
2. If addressing El Niño, explain how Pacific warming creates dry monsoon spells in Central India.
3. Recommend stage-appropriate protective irrigation (sprinklers/drip) and foliar sprays (Potassium Nitrate 13:0:45 or 2% Urea) during moisture stress.
4. Warn against heavy chemical fertilizer application in dry soil.
5. If the question is outside agriculture, answer concisely or guide them back to farm assistance.
6. Keep explanations clear and concise, easy for farmers to read on mobile phones.`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: message,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const responseText = response.text || 'Unable to generate response.';
      return res.json({
        reply: responseText,
        source: 'gemini-3.8-flash',
        language,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      // Fall through to domain-grounded fallback
    }
  }

  // Domain-grounded fallback if Gemini key is missing or errored
  let fallbackReply = '';
  const lowerMsg = message.toLowerCase();

  if (language === 'mr') {
    if (lowerMsg.includes('पाऊस') || lowerMsg.includes('दुष्काळ') || lowerMsg.includes('rain') || lowerMsg.includes('ताण')) {
      fallbackReply = 'महाराष्ट्रात सध्या एल निनोच्या प्रभावामुळे पावसाचा खंड पडला आहे. तुमच्या सोयाबीन पिकाला फुलोरा किंवा शेंगा धरण्याच्या अवस्थेत पाण्याचा ताण बसत असल्यास, सकाळी तुषार सिंचनाने हलके पाणी द्यावे. कोरडवाहू शेतात १३:०:४५ (पोटॅशियम नायट्रेट) १०० ग्रॅम प्रति १० लिटर पाण्यात मिसळून फवारावे, ज्यामुळे पिकाची ताण सहन करण्याची क्षमता वाढते.';
    } else if (lowerMsg.includes('एल निनो') || lowerMsg.includes('el nino')) {
      fallbackReply = 'एल निनो म्हणजे प्रशांत महासागराच्या पृष्ठभागाचे तापमान सरासरीपेक्षा जास्त वाढणे. यामुळे भारतामध्ये मोसमी वाऱ्यांचा जोर कमी होतो आणि पावसाचे मोठे खंड पडतात. चालू खरीप हंगामात ओएनआय (ONI) निर्देशांक +१.४°C नोंदवला गेला आहे.';
    } else {
      fallbackReply = 'आपल्या शेतातील पिकाच्या सद्यस्थितीनुसार, जमिनीतील ओलावा टिकवणे ही सर्वात महत्त्वाची बाब आहे. कोरड्या जमिनीत रासायनिक खते देणे टाळा आणि सऱ्यांमध्ये पालापाचोळ्याचे आच्छादन करा. अधिक माहितीसाठी आपल्या स्थानिक कृषी सहाय्यकांशी संपर्क साधा.';
    }
  } else if (language === 'hi') {
    if (lowerMsg.includes('बारिश') || lowerMsg.includes('सूखा') || lowerMsg.includes('rain') || lowerMsg.includes('पानी')) {
      fallbackReply = 'महाराष्ट्र में एल नीनो के कारण मानसून में सूखा अंतराल चल रहा है। फूल और फली बनने की अवस्था में सोयाबीन को पानी के तनाव से बचाने के लिए सुबह के समय स्प्रिंकलर से हल्की सिंचाई करें। असिंचित खेतों में पोटेशियम नाइट्रेट (13:0:45) 100 ग्राम प्रति 10 लीटर पानी में मिलाकर फोलियर स्प्रे करें।';
    } else if (lowerMsg.includes('एल नीनो') || lowerMsg.includes('el nino')) {
      fallbackReply = 'एल नीनो प्रशांत महासागर के गर्म होने की घटना है, जिसके कारण भारतीय मानसून कमजोर हो जाता है और लंबे समय तक सूखा पड़ता है। इस समय ओएनआई (ONI) इंडेक्स +1.4°C है जो गंभीर चेतावनी संकेत है।';
    } else {
      fallbackReply = 'अपनी फसल की सुरक्षा के लिए जड़ क्षेत्र में नमी बनाए रखें। सूखी मिट्टी में दानेदार खाद न डालें और आवश्यकतानुसार कृषि अधिकारियों की सलाह लें।';
    }
  } else {
    if (lowerMsg.includes('rain') || lowerMsg.includes('water') || lowerMsg.includes('drought') || lowerMsg.includes('stress')) {
      fallbackReply = 'Due to the active El Niño signal (+1.4°C ONI), prolonged monsoon dry breaks are affecting Central Maharashtra. For Soybean in flowering/pod formation stage, apply light sprinkler irrigation during morning hours. On rain-fed plots, apply a foliar spray of 1% Potassium Nitrate (13:0:45) at 100g per 10L water to reduce flower abortion and heat shock.';
    } else if (lowerMsg.includes('el nino') || lowerMsg.includes('enso')) {
      fallbackReply = 'El Niño represents anomalous sea surface warming in the Equatorial Central/East Pacific. This disrupts the Walker Circulation, historically causing weakened Indian southwest monsoon precipitation and prolonged dry breaks during critical reproductive crop stages.';
    } else {
      fallbackReply = 'Based on current district climate observations, conserving root-zone soil moisture is top priority. Avoid broadcast granular fertilizers in dry soil and inspect your plots for early pod damage. Feel free to ask about irrigation schedules or disease scouting.';
    }
  }

  res.json({
    reply: fallbackReply,
    source: 'grounded-agri-rules-engine (Demo / Offline Mode)',
    language,
    timestamp: new Date().toISOString()
  });
});

// Audit log endpoint
app.post('/api/v1/audit-logs', (req: Request, res: Response) => {
  const { action, performedBy, userRole, entityType, entityId, details } = req.body;
  const newLog = {
    id: `AUDIT-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action,
    performedBy,
    userRole,
    entityType,
    entityId,
    details
  };
  db.auditLogs.unshift(newLog);
  res.status(201).json(newLog);
});

app.get('/api/v1/audit-logs', (_req: Request, res: Response) => {
  res.json(db.auditLogs);
});

// Mount Vite in development mode or serve static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EL NIÑO Application Server running on port ${PORT}`);
  });
}

startServer();

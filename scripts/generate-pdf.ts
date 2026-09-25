import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function createResume() {
  const pdfDoc = await PDFDocument.create();
  
  // Embed standard fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // A4 size: 595.28 x 841.89 points
  const page1 = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page1.getSize();

  const primaryColor = rgb(0.04, 0.04, 0.04);
  const secondaryColor = rgb(0.25, 0.25, 0.25);
  const accentColor = rgb(0.0, 0.55, 0.75); // Professional teal-cyan
  const lightGray = rgb(0.5, 0.5, 0.5);

  let y = height - 45;
  const margin = 45;
  const contentWidth = width - margin * 2;

  // Header
  page1.drawText('ADITYA ROY BARDHAN', {
    x: margin,
    y: y,
    size: 22,
    font: fontBold,
    color: primaryColor,
  });
  y -= 18;

  page1.drawText('Data Science & AI Student | AI/ML · Computer Vision · Software Engineering', {
    x: margin,
    y: y,
    size: 11,
    font: fontBold,
    color: accentColor,
  });
  y -= 16;

  page1.drawText('Kolkata, India  ·  +91 9681418024  ·  adityaroybardhan@gmail.com', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: secondaryColor,
  });
  y -= 14;

  page1.drawText('GitHub: github.com/aditya2909rb  ·  LinkedIn: linkedin.com/in/aditya-roy-bardhan-a22ba22b7  ·  Portfolio: adityaroybardhan.gamer.gd', {
    x: margin,
    y: y,
    size: 9,
    font: fontRegular,
    color: secondaryColor,
  });
  y -= 16;

  // Divider line
  page1.drawLine({
    start: { x: margin, y: y },
    end: { x: width - margin, y: y },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.85),
  });
  y -= 18;

  // Section helper
  const drawSectionHeader = (page: any, title: string, currentY: number) => {
    page.drawText(title.toUpperCase(), {
      x: margin,
      y: currentY,
      size: 10,
      font: fontBold,
      color: primaryColor,
    });
    page.drawLine({
      start: { x: margin, y: currentY - 4 },
      end: { x: width - margin, y: currentY - 4 },
      thickness: 1,
      color: accentColor,
    });
    return currentY - 18;
  };

  // Profile Summary
  y = drawSectionHeader(page1, 'Summary', y);
  const summaryText =
    'Data Science & AI student at IIT Guwahati building practical AI systems, data-driven applications, and intelligent software. Experienced in computer vision, machine learning, distributed model training workflows, and authorized cybersecurity assessments. Passionate about solving real-world challenges with verified architectures and measurable impact.';
  
  // Word wrap helper
  const drawWrappedText = (page: any, text: string, x: number, startY: number, maxWidth: number, fontSize: number, font: any, color: any, lineHeight: number = 13) => {
    const words = text.split(' ');
    let line = '';
    let currentY = startY;

    for (const word of words) {
      const testLine = line + (line ? ' ' : '') + word;
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > maxWidth) {
        page.drawText(line, { x, y: currentY, size: fontSize, font, color });
        line = word;
        currentY -= lineHeight;
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, { x, y: currentY, size: fontSize, font, color });
      currentY -= lineHeight;
    }
    return currentY;
  };

  y = drawWrappedText(page1, summaryText, margin, y, contentWidth, 9.5, fontRegular, secondaryColor, 13);
  y -= 8;

  // Education
  y = drawSectionHeader(page1, 'Education', y);
  page1.drawText('Indian Institute of Technology (IIT) Guwahati', {
    x: margin,
    y: y,
    size: 10.5,
    font: fontBold,
    color: primaryColor,
  });
  page1.drawText('2025 – 2029', {
    x: width - margin - 60,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: lightGray,
  });
  y -= 14;

  page1.drawText('Bachelor of Science (Hons.) in Data Science & Artificial Intelligence', {
    x: margin,
    y: y,
    size: 9.5,
    font: fontOblique,
    color: secondaryColor,
  });
  y -= 13;

  y = drawWrappedText(
    page1,
    'Key Coursework: Machine Learning Theory, Statistical Inference, Deep Learning, Computer Vision, Natural Language Processing, Distributed Systems, Data Structures & Algorithms.',
    margin,
    y,
    contentWidth,
    8.5,
    fontRegular,
    secondaryColor,
    11.5
  );
  y -= 8;

  // Technical Skills
  y = drawSectionHeader(page1, 'Technical Skills', y);

  const skills = [
    { label: 'Core Proficiency:', val: 'Python, PyTorch, SQL, Pandas, NumPy, Computer Vision, Machine Learning, Data Structures' },
    { label: 'Working Knowledge:', val: 'JavaScript, TypeScript, C++, TensorFlow, ONNX, Docker, Git & GitHub Actions, Linux (Ubuntu)' },
    { label: 'Exploring & Specializing:', val: 'Large Language Models (LLMs), RAG, Agentic AI, Geospatial AI (NASA FIRMS), Distributed Training' },
  ];

  for (const s of skills) {
    page1.drawText(s.label, { x: margin, y: y, size: 9, font: fontBold, color: primaryColor });
    const labelWidth = fontBold.widthOfTextAtSize(s.label, 9) + 6;
    drawWrappedText(page1, s.val, margin + labelWidth, y, contentWidth - labelWidth, 9, fontRegular, secondaryColor, 12);
    y -= 14;
  }
  y -= 4;

  // Experience
  y = drawSectionHeader(page1, 'Professional Experience & Engagements', y);

  // Exp 1
  page1.drawText('Independent ML Consultant / Contributor (Contract) — Distributed Training', {
    x: margin,
    y: y,
    size: 10,
    font: fontBold,
    color: primaryColor,
  });
  page1.drawText('Dec 2025 – Feb 2026', {
    x: width - margin - 85,
    y: y,
    size: 9,
    font: fontRegular,
    color: lightGray,
  });
  y -= 13;

  const exp1Bullets = [
    'Contributed to large-scale distributed training workflows utilizing 3D parallelism (Data, Pipeline, and Tensor Parallelism via Megatron-LM and DeepSpeed ZeRO-3) across GPU cluster nodes.',
    'Curated and verified reasoning-trace datasets for knowledge distillation into compact student models, maintaining chain-of-thought coherence.',
    'Diagnosed loss spikes and gradient instabilities by conducting systematic data quality audits across preprocessing and batching pipelines.',
  ];

  for (const b of exp1Bullets) {
    page1.drawText('•', { x: margin + 4, y, size: 9, font: fontBold, color: accentColor });
    y = drawWrappedText(page1, b, margin + 14, y, contentWidth - 14, 8.5, fontRegular, secondaryColor, 11.5);
    y -= 2;
  }
  y -= 4;

  // Exp 2
  page1.drawText('Confidential Cybersecurity Engagements — Authorized Security Assessor', {
    x: margin,
    y: y,
    size: 10,
    font: fontBold,
    color: primaryColor,
  });
  page1.drawText('Jan 2023 – Aug 2025', {
    x: width - margin - 85,
    y: y,
    size: 9,
    font: fontRegular,
    color: lightGray,
  });
  y -= 13;

  const exp2Bullets = [
    'Conducted authorized security assessments for financial-sector and enterprise clients under strict NDA, focusing on REST API security, threat modeling, and authentication controls.',
    'Identified and provided remediation roadmaps for 29 high/critical security vulnerabilities across multiple authorized client engagements.',
    'Designed rule-based and anomaly-based detection mechanisms for real-time transaction integrity monitoring and automated log alerts.',
  ];

  for (const b of exp2Bullets) {
    page1.drawText('•', { x: margin + 4, y, size: 9, font: fontBold, color: accentColor });
    y = drawWrappedText(page1, b, margin + 14, y, contentWidth - 14, 8.5, fontRegular, secondaryColor, 11.5);
    y -= 2;
  }
  y -= 4;

  // Exp 3
  page1.drawText('Technical Operations Contributor — Infrastructure & Reliability', {
    x: margin,
    y: y,
    size: 10,
    font: fontBold,
    color: primaryColor,
  });
  page1.drawText('Jun 2021 – Aug 2024', {
    x: width - margin - 85,
    y: y,
    size: 9,
    font: fontRegular,
    color: lightGray,
  });
  y -= 13;

  const exp3Bullets = [
    'Maintained backend service health, low-latency synchronization monitoring, and uptime reporting for high-concurrency gaming server infrastructure.',
    'Collaborated on observability tooling, distributed telemetry log analysis, and rapid incident response.',
  ];

  for (const b of exp3Bullets) {
    page1.drawText('•', { x: margin + 4, y, size: 9, font: fontBold, color: accentColor });
    y = drawWrappedText(page1, b, margin + 14, y, contentWidth - 14, 8.5, fontRegular, secondaryColor, 11.5);
    y -= 2;
  }

  // Page 2: Projects, Achievements, References
  const page2 = pdfDoc.addPage([595.28, 841.89]);
  let y2 = height - 45;

  page2.drawText('ADITYA ROY BARDHAN — RESUME (PAGE 2)', {
    x: margin,
    y: y2,
    size: 9,
    font: fontBold,
    color: lightGray,
  });
  y2 -= 18;

  y2 = drawSectionHeader(page2, 'Key Technical Projects', y2);

  const projects = [
    {
      title: 'ASHA — Alerting Satellite Heat Analytics',
      stack: 'Python, NASA FIRMS, Geospatial Data, FastAPI, Leaflet.js',
      desc: 'Engineered real-time satellite fire detection and thermal analytics covering 7 high-risk zones across India. Ingested MODIS/VIIRS feeds, implemented false-positive filtering algorithms, and delivered an interactive alerting interface. Reduced detection latency from hours to under 15 minutes with 94% validated classification accuracy.',
      link: 'github.com/aditya2909rb/ASHA',
    },
    {
      title: 'OncoSML — Computational Cancer-Vaccine Learning Workflow',
      stack: 'Python, cBioPortal API, PyTorch, GitHub Actions, MLOps',
      desc: 'Developed a self-maintaining machine learning pipeline for cancer genomic research. Automated real-time ingestion from cBioPortal and continuous literature updates from GitHub, with integrated validation checks and live monitoring dashboard for personalized vaccine candidate modeling.',
      link: 'github.com/aditya2909rb/sml-project',
    },
    {
      title: 'Satellite Imagery for Global Change Detection',
      stack: 'PyTorch, OpenCV, GDAL, NASA Earthdata, U-Net',
      desc: 'Built a pixel-level segmentation model detecting wildfire smoke plumes and landscape anomalies from geostationary satellite feeds. Built a custom semi-automated multispectral annotation pipeline; achieved 0.82 IoU on held-out test sets.',
      link: 'github.com/aditya2909rb',
    },
    {
      title: 'Real-Time Demand Forecasting & Dynamic Pricing',
      stack: 'XGBoost, LSTM, ONNX, Feature Store, Python',
      desc: 'Engineered high-frequency demand forecasting models for ride requests with 200+ engineered spatio-temporal features. Created automated data drift detection and dynamic surge pricing algorithms achieving sub-100ms inference latency via model quantization.',
      link: 'github.com/aditya2909rb',
    },
    {
      title: 'Siddhant — Ancient Indian Yantra Reconstruction Engine',
      stack: 'Three.js, SymPy, NetworkX, TypeScript, React',
      desc: 'Grand Finalist project at Smart India Hackathon 2025. Algorithmic engine that parses archaic Sanskrit geometric descriptions, resolves structural dependencies using graph algorithms, and renders interactive 3D mathematical models of historical astronomical instruments.',
      link: 'github.com/aditya2909rb',
    },
    {
      title: 'Agentic AI Safety Evaluation',
      stack: 'Local LLM, Raspberry Pi 5, Linux Cgroups, Python',
      desc: 'Empirical safety evaluation of an autonomous LLM agent with controlled local filesystem access. Analyzed multi-step execution behaviors under strict sandboxing, permission gates, and hardware resource boundaries.',
      link: 'github.com/aditya2909rb',
    },
  ];

  for (const p of projects) {
    page2.drawText(p.title, { x: margin, y: y2, size: 9.5, font: fontBold, color: primaryColor });
    const titleW = fontBold.widthOfTextAtSize(p.title, 9.5);
    page2.drawText(` [${p.stack}]`, { x: margin + titleW, y: y2, size: 8, font: fontOblique, color: accentColor });
    y2 -= 12;

    y2 = drawWrappedText(page2, p.desc, margin, y2, contentWidth, 8.5, fontRegular, secondaryColor, 11);
    
    page2.drawText(`Code: https://${p.link}`, { x: margin, y: y2, size: 8, font: fontRegular, color: accentColor });
    y2 -= 14;
  }
  y2 -= 4;

  // Achievements & Competitions
  y2 = drawSectionHeader(page2, 'Honors & Achievements', y2);

  const honors = [
    {
      title: 'Smart India Hackathon (SIH) 2025 — Grand Finalist',
      desc: 'Nationwide competition organized by the Ministry of Education & AICTE. Selected as Grand Finalist for "Siddhant" among thousands of engineering teams across India.',
    },
    {
      title: 'GitHub Pro & Open Source Contributor',
      desc: 'Maintain active repositories in machine learning, satellite data analysis, and systems security. Profile: github.com/aditya2909rb.',
    },
    {
      title: 'Competitive Problem Solving & Algorithmic Design',
      desc: 'Active problem solver on LeetCode (leetcode.com/u/adityaroybardhan2909) and Kaggle (kaggle.com/aditya2909rb). Interest in group theory & Rubik\'s cube optimization.',
    },
  ];

  for (const h of honors) {
    page2.drawText(h.title, { x: margin, y: y2, size: 9, font: fontBold, color: primaryColor });
    y2 -= 11;
    y2 = drawWrappedText(page2, h.desc, margin, y2, contentWidth, 8.5, fontRegular, secondaryColor, 11);
    y2 -= 4;
  }

  y2 -= 8;
  y2 = drawSectionHeader(page2, 'References', y2);
  page2.drawText('Academic and professional references are available upon request.', {
    x: margin,
    y: y2,
    size: 9,
    font: fontOblique,
    color: secondaryColor,
  });

  // Footer on both pages
  page1.drawText('Aditya Roy Bardhan  ·  Page 1 of 2', {
    x: width / 2 - 50,
    y: 20,
    size: 8,
    font: fontRegular,
    color: lightGray,
  });

  page2.drawText('Aditya Roy Bardhan  ·  Page 2 of 2', {
    x: width / 2 - 50,
    y: 20,
    size: 8,
    font: fontRegular,
    color: lightGray,
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public/resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Generated resume PDF at: ${outputPath} (${pdfBytes.length} bytes)`);
}

createResume().catch(console.error);

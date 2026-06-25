import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage: 'linear-gradient(135deg, #000000 0%, #0a1628 100%)',
          fontSize: 60,
          fontWeight: 700,
          color: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px',
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              marginBottom: '20px',
              background: 'linear-gradient(90deg, #06D8FA, #F0A011, #A8C45A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Surya Narayana Siddamurthi
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: '#06D8FA',
              marginBottom: '15px',
            }}
          >
            AI & Full-Stack Engineer
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: '#9ca3af',
              maxWidth: '800px',
              lineHeight: 1.4,
            }}
          >
            Building intelligent systems at the intersection of full-stack development and machine learning
          </div>
          <div
            style={{
              marginTop: '30px',
              display: 'flex',
              gap: '20px',
              fontSize: 18,
              color: '#6b7280',
            }}
          >
            <span>Python</span>
            <span>•</span>
            <span>FastAPI</span>
            <span>•</span>
            <span>LangChain</span>
            <span>•</span>
            <span>Next.js</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
